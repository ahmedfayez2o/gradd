import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ⬅️ استيراد التنقل
import './AuthPage.css';

import bookSignin from '../Images/book-signin.png';
import bookSignup from '../Images/photo_2024-12-22_00-50-44.jpg';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ⬅️ تهيئة التنقل

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email (e.g. name@example.com).");
      return;
    }

    if (!strongPassword.test(password)) {
      alert("Password must be at least 8 characters and include uppercase, lowercase, number and special character.");
      return;
    }

    if (!isSignIn && name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }
 // Submit logic here
    // ✅ التنقل بعد النجاح
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Form Section */}
        <div className="auth-form">
          <h2>{isSignIn ? "WELCOME BACK!" : "HELLO, FRIEND!"}</h2>
          <p>
            {isSignIn
              ? "PLEASE ENTER YOUR DETAILS"
              : "Enter Your Personal Details And Start Journey With Us"}
          </p>

          <button className="google-button">
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google logo"
            />
            {isSignIn ? "SIGN IN WITH GOOGLE" : "SIGN UP WITH GOOGLE"}
          </button>

          <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <form onSubmit={handleSubmit}>
            {!isSignIn && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {isSignIn && (
              <div className="remember-forgot">
                <label className="remember-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password</a>
              </div>
            )}

            <button type="submit" className="submit">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="toggle-auth">
            {isSignIn ? (
              <>
                Don’t have an account?{" "}
                <button onClick={() => setIsSignIn(false)}>sign up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setIsSignIn(true)}>sign in</button>
              </>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="auth-image">
          <img
            src={isSignIn ? bookSignin : bookSignup}
            alt="Auth illustration"
          />
        </div>
      </div>
    </div>
  );
}
