import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "lucide-react/dynamic";

type Errors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Navigate
  const navigate = useNavigate();

  // password Regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Fill form
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const newErrors: Errors = {};

    // Email
    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!passwordRegex.test(password)) {
      newErrors.password = "Must include with uppercase & number (6+)";
    }

    setErrors(newErrors);

    // Focus FIRST error only
    if (newErrors.email) {
      emailRef.current?.focus();
    } else if (newErrors.password) {
      passwordRef.current?.focus();
    }

    // When form is allow to submit
    else {
      try {
        // Response from backend
        const response = await fetch("http://localhost:5000/auth/log-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status == 404 || response.status == 401) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          form.reset();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={formHandler}
        className="flex flex-col p-8 bg-white w-[450px] text-black rounded-2xl gap-4 shadow-2xl"
      >
        <Link className="bg-blue-500/20 w-fit p-2 rounded-full" to={"/"}>
          <DynamicIcon name="arrow-left" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-center">Log In</h1>
          <label className="text-center w-full text-black/80 inline-block">
            Log in to continue to your account
          </label>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input ref={emailRef} name="email" className="border px-2 py-1" />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <label>Password</label>

        <div className="relative">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            className="border px-2 py-1 w-full"
          />
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}

          {/* Hide and show the password */}
          <button
            type="button"
            onClick={() => {
              if (passwordRef.current) {
                setShowPassword((prev) => !prev);
              }
            }}
            className="absolute right-2 top-2"
          >
            {!showPassword ? (
              <DynamicIcon name="eye" size={20} />
            ) : (
              <DynamicIcon name="eye-closed" size={20} />
            )}
          </button>
        </div>

        <button className="bg-blue-700 text-white p-2 rounded mt-4">
          Log in
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/sign-up" className="text-blue-700 underline">
            Sign up
          </Link>
        </p>
      </form>

      <Toaster position="bottom-center"></Toaster>
    </section>
  );
};

export default Login;
