import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import auth from "../../firebase.init";
import { useState } from "react";

const Register = () => {
  // use useState to check success and error message
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // declare useSate for eye icon toggle
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    // Prevent page reload
    e.preventDefault();
    console.log("Register form submitted");

    // Use FormData to reliably read values from the submitted form
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const terms = formData.get("terms");

    console.log(email, password);
    // reset success and error messages.
    setSuccess(false);
    // Clear previous error message
    setError("");
    // set terms and conditions validation
    if (!terms) {
      setError("You must accept the terms and conditions to register.");
      return;
    }

    // password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one number, one lowercase letter, and one uppercase letter."
      );
      // Stop further execution if validation fails
      return;
    }

    // create user with email and password logic will go here..
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        // Set error message to state
        setError(error.message);
      });
    // If user is created successfully, set the success message
    setSuccess(true);
    // Reset the form after submission
    form.reset();
  };

  return (
    <div className="max-w-sm p-4 mx-auto mt-20">
      {/* Register form  */}
      <div className="mt-2">
        <h3 className="text-2xl font-bold">Register Here</h3>
      </div>
      <form className="space-y-5" onSubmit={handleRegister}>
        {/* Email field */}

        <label className="input validator join-item">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            name="email"
            type="email"
            placeholder="hello@gmail.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>

        <br />

        {/* Password field */}
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </div>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
        <br />
        <label className="label">
          <input type="checkbox" name="terms" className="checkbox" />
          Accepts terms and conditions
        </label>
        <br />
        {/* Submit button */}
        <button type="submit"  className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Render success or error message */}
      {success && (
        <p className="mt-4 text-green-600">User created successfully!</p>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Register;
