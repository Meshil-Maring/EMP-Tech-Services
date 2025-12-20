import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { DynamicIcon } from "lucide-react/dynamic";

type Errors = {
  email?: string;
  password?: string;
};

// ✅ Spinner component
const Spinner = () => (
  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const newErrors: Errors = {};

    // Validation
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Must include 1 uppercase & 1 number (6+)";
    }

    setErrors(newErrors);

    // Focus first error
    if (newErrors.email) {
      emailRef.current?.focus();
      return;
    }
    if (newErrors.password) {
      passwordRef.current?.focus();
      return;
    }

    // Submit
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Login failed");
        return;
      }

      toast.success(data.message || "Logged in successfully");
      form.reset();
      navigate("/");
    } catch (error) {
      toast.error("Server error. Please try again.");
      console.error(error);
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
          <h1 className="text-2xl font-bold text-center">Log In</h1>
          <p className="text-center text-black/80">
            Log in to continue to your account
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            required
            className="border px-2 py-1"
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label>Password</label>

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength={6}
              className="border px-2 py-1 w-full"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2"
              aria-label="Toggle password visibility"
            >
              <DynamicIcon
                name={showPassword ? "eye-closed" : "eye"}
                size={20}
              />
            </button>
          </div>

          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className={`mt-4 flex items-center justify-center gap-2 rounded p-2 text-white transition
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }
          `}
        >
          {loading ? (
            <>
              <Spinner />
              <span>Logging in...</span>
            </>
          ) : (
            "Log in"
          )}
        </button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up" className="text-blue-700 underline">
            Sign up
          </Link>
        </p>
      </form>

      <Toaster position="bottom-center" />
    </section>
  );
};

export default Login;
