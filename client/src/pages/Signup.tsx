import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { DynamicIcon } from "lucide-react/dynamic";
import { server_url } from "../utils/url";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Spinner = () => (
  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
);

const Signup = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const userName = form.userName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    const newErrors: Errors = {};

    if (userName.length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address";

    if (!passwordRegex.test(password))
      newErrors.password = "6+ chars, 1 uppercase & 1 number";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (newErrors.name) return userNameRef.current?.focus();
    if (newErrors.email) return emailRef.current?.focus();
    if (newErrors.password) return passwordRef.current?.focus();
    if (newErrors.confirmPassword) return confirmPasswordRef.current?.focus();

    try {
      setLoading(true);

      const response = await fetch(`${server_url}/auth/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Signup failed");
        return;
      }

      toast.success("Account created successfully");
      form.reset();
      navigate("/");
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={formHandler}
        className="flex flex-col p-8 bg-white w-[450px] text-black rounded-2xl gap-4 shadow-2xl"
      >
        <Link className="bg-blue-500/20 w-fit p-2 rounded-full" to="/">
          <DynamicIcon name="arrow-left" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-center">Create Account</h1>
          <p className="text-center text-black/70 text-sm">
            Sign up to access all features
          </p>
        </div>

        {/* User Name */}
        <div>
          <label>User Name</label>
          <input
            ref={userNameRef}
            name="userName"
            disabled={loading}
            className="border px-2 py-1 w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="email"
            disabled={loading}
            className="border px-2 py-1 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              disabled={loading}
              className="border px-2 py-1 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-2 top-2"
            >
              <DynamicIcon
                name={showPassword ? "eye-closed" : "eye"}
                size={20}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            disabled={loading}
            className="border px-2 py-1 w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white p-2 rounded mt-4 flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner />
              Creating...
            </>
          ) : (
            "Create account"
          )}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/log-in" className="text-blue-700 underline">
            Log in
          </Link>
        </p>
      </form>

      <Toaster position="bottom-center" />
    </section>
  );
};

export default Signup;
