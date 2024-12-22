import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput"; // Assuming FormInput is in the same directory

const LogInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/home");
  }, [navigate]);

  const validateForm = () => {
    if (username !== "emilys") {
      setError("Invalid username. Only 'emilys' is allowed.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-10 bg-gray-100">
      {/* Left Section (Image) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img
          src="../assets/Login_Page_Image.png"
          alt="Login Page"
          className="w-full max-w-md object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-medium mb-6">
          Welcome to <br />
          <span className="text-4xl sm:text-5xl font-black text-primary">
            Unstop
          </span>
        </h1>

        <div className="flex flex-col space-y-4">
          <a
            href="#"
            className="flex gap-3 items-center justify-center font-medium border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50"
          >
            <img
              src="../assets/Google Icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </a>
          <a
            href="#"
            className="flex gap-3 items-center justify-center font-medium border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-50"
          >
            <img
              src="../assets/FB Vector.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            Login with Facebook
          </a>
          <div className="flex items-center gap-2 text-gray-500">
            <hr className="flex-grow border-gray-300" />
            OR
            <hr className="flex-grow border-gray-300" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <FormInput
            label="Username"
            type="text"
            placeholder="Username"
            required={true}
            value={username}
            onChange={setUsername}
            error={error && error.includes("username") ? error : null}
            resetError={() => setError("")}
            leftIcon={
              <img
                src="../assets/account_circle.png"
                alt="Username Icon"
                className="w-6 h-6"
              />
            }
          />
          <FormInput
            label="Email (Optional)"
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            error={error && error.includes("email") ? error : null}
            resetError={() => setError("")}
            leftIcon={
              <img
                src="../assets/mail.png"
                alt="Email Icon"
                className="w-6 h-6"
              />
            }
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            required={true}
            value={password}
            onChange={setPassword}
            error={error && error.includes("Password") ? error : null}
            resetError={() => setError("")}
            leftIcon={
              <img
                src="../assets/key.png"
                alt="Password Icon"
                className="w-6 h-6"
              />
            }
            rightIcon={
              <img
                src="../assets/visibility.png"
                alt="Visibility Icon"
                className="w-6 h-6"
              />
            }
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-primary font-medium text-sm">
              Forgot Password?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-dark transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?
          <a href="#" className="text-primary font-medium ml-1">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
