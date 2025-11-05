import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../firebase.init";

const Login = () => {
  // useState for error message
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    // reset error message
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        // If login is successful, reset the error message
        setError("");
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSuccess(false);
      });
  };

  // Handle forget password
  const handleForgetPassword = () => {
    console.log("Forget password clicked");
    console.log(emailRef.current.value);
    const email = emailRef.current.value;
    // reset error message
    setError("");
    // sent password reset email logic implemented here.
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="">
      <div className="text-center lg:text-left"></div>
      <div className="card bg-base-100 w-full max-w-sm mx-auto mt-20 shrink-0 shadow-2xl">
        <div className="card-body ">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleLogin} className="form">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              ref={emailRef}
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <a onClick={handleForgetPassword} className="link link-hover">
                Forgot password?
              </a>
            </div>

            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p>
            Not registered?{" "}
            <a
              href="/register"
              className="link text-blue-600 underline font-bold"
            >
              Create an account
            </a>
          </p>
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {success && <p className="text-green-600 mt-4">Login successful!</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
