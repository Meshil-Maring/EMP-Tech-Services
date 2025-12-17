import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Signup = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});

  // Navigate
  const navigate = useNavigate();

  // password Regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const userName = form.userName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    const newErrors: Errors = {};

    // Name
    if (userName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email
    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!passwordRegex.test(password)) {
      newErrors.password = "Must include with uppercase & number (6+)";
    }

    // Confirm Password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Focus FIRST error only
    if (newErrors.name) {
      userNameRef.current?.focus();
    } else if (newErrors.email) {
      emailRef.current?.focus();
    } else if (newErrors.password) {
      passwordRef.current?.focus();
    } else if (newErrors.confirmPassword) {
      confirmPasswordRef.current?.focus();
    }

    // When form is allow to submit
    else {
      try {
        // Response from backend
        const response = await fetch("http://localhost:5000/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, email, password }),
        });

        const data = await response.json();

        if (data.status == 409) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          form.reset();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }

      // form.reset();
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={formHandler}
        className="flex flex-col p-8 bg-white w-[450px] text-black rounded-2xl gap-4 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-8">Create Account</h1>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label>User Name</label>
          <input
            ref={userNameRef}
            name="userName"
            className="border px-2 py-1"
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name}</span>
          )}
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
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            className="border px-2 py-1"
          />
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label>Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            name="confirmPassword"
            className="border px-2 py-1"
          />
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <button className="bg-blue-700 text-white p-2 rounded mt-4">
          Create account
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/log-in" className="text-blue-700 underline">
            Log in
          </Link>
        </p>
      </form>

      <Toaster position="bottom-center"></Toaster>
    </section>
  );
};

export default Signup;
