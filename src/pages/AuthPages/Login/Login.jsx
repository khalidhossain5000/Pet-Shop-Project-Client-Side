import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-light-primary w-full max-w-md rounded-xl shadow-lg border p-6 font-secondary"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <h2 className="mb-4 text-2xl lg:text-3xl font-semibold font-primary text-light-text lg:font-bold">
          Welcome back
        </h2>

        <div className="flex flex-col gap-3">
          <label
            className="text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            <span className="mb-1 inline-block">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                background: "var(--color-light-secondary)",
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          </label>

          <label
            className="text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            <span className="mb-1 inline-block">Password</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Your password"
              className="w-full px-3 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                background: "var(--color-light-secondary)",
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          </label>

          <div
            className="flex items-center justify-between text-sm"
            style={{ color: "var(--color-light-text)" }}
          >
            <button
              type="button"
              className="underline opacity-80 hover:opacity-100"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-3 rounded-lg font-bold hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--color-light-accent)",
              color: "var(--color-light-text)",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
