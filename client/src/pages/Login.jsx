
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

import "../styles/Auth.css";

export default function Login() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage(
      "Login is not active yet. Secure authentication will be connected in Stage 03."
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-background-grid" />
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-layout">
        <motion.section
          className="auth-showcase"
          initial={reduceMotion ? false : { opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <Link to="/" className="auth-back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="auth-showcase-content">
            <div className="auth-eyebrow">
              <Sparkles size={15} />
              YOUR FUTURE STARTS HERE
            </div>

            <h1>
              Welcome back to
              <br />
              <span>WayaLink.</span>
            </h1>

            <p>
              Your campus journey deserves more opportunities.
              Discover scholarships, internships, student
              communities and events in one connected space.
            </p>

            <div className="auth-feature-list">
              <div>
                <GraduationCap size={19} />
                <span>Explore student opportunities</span>
              </div>

              <div>
                <ShieldCheck size={19} />
                <span>Secure student-focused platform</span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Stay connected with campus life</span>
              </div>
            </div>
          </div>

          <motion.div
            className="auth-showcase-brand"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -7, 0] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/wayalink-logo.png"
              alt="WayaLink"
            />

            <div>
              <strong>
                Waya<span>Link</span>
              </strong>
              <small>CONNECT · DISCOVER · GROW</small>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="auth-form-side"
          initial={reduceMotion ? false : { opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="auth-card">
            <div className="auth-card-icon">
              <LockKeyhole size={24} />
            </div>

            <div className="auth-card-heading">
              <span className="auth-card-label">
                STUDENT PORTAL
              </span>

              <h2>Welcome back</h2>

              <p>
                Sign in to continue your WayaLink journey.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div className="auth-input-wrap">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="student@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <div className="auth-field-heading">
                  <label htmlFor="login-password">
                    Password
                  </label>
                </div>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="login-password"
                    name="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-form-options">
                <span>
                  <ShieldCheck size={15} />
                  Student access
                </span>
              </div>

              {message && (
                <div className="auth-message" role="status">
                  {message}
                </div>
              )}

              <motion.button
                type="submit"
                className="auth-submit-btn"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, scale: 1.01 }
                }
                whileTap={{ scale: 0.98 }}
              >
                Sign In
                <ArrowRight size={18} />
              </motion.button>
            </form>

            <div className="auth-divider">
              <span>New to WayaLink?</span>
            </div>

            <Link
              to="/register"
              className="auth-switch-btn"
            >
              Create Student Account
              <ArrowRight size={16} />
            </Link>

            <p className="auth-card-footer">
              Built for the student community.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
