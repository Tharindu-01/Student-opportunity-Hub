
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  IdCard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  UsersRound,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import "../styles/Auth.css";

const initialForm = {
  fullName: "",
  email: "",
  registrationNumber: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const passwordChecks = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[a-z]/.test(form.password),
    /\d/.test(form.password),
  ];

  const passwordScore = passwordChecks.filter(Boolean).length;

  const passwordLabel =
    passwordScore <= 1
      ? "Weak"
      : passwordScore <= 3
      ? "Getting stronger"
      : "Strong";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.registrationNumber.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(true);
      setMessage("Please complete all fields.");
      return;
    }

    if (!passwordChecks.every(Boolean)) {
      setError(true);
      setMessage(
        "Use at least 8 characters, including uppercase, lowercase and a number."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setError(false);
    setMessage(
      "Registration is not active yet. Student number verification and secure account creation will be enabled in Stage 03."
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-background-grid" />
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <div className="auth-layout auth-register-layout">
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
              JOIN THE WAYALINK COMMUNITY
            </div>

            <h1>
              Your journey.
              <br />
              <span>More possibilities.</span>
            </h1>

            <p>
              Create your student profile and get ready
              to discover new opportunities across
              university life.
            </p>

            <div className="auth-feature-list">
              <div>
                <GraduationCap size={19} />
                <span>Discover scholarships and internships</span>
              </div>

              <div>
                <UsersRound size={19} />
                <span>Connect with student clubs</span>
              </div>

              <div>
                <CalendarDays size={19} />
                <span>Explore university events</span>
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
              <UserRound size={24} />
            </div>

            <div className="auth-card-heading">
              <span className="auth-card-label">
                STUDENT REGISTRATION
              </span>

              <h2>Create your account</h2>

              <p>
                Join WayaLink and unlock your student
                opportunity journey.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="register-name">
                  Full Name
                </label>

                <div className="auth-input-wrap">
                  <UserRound size={18} />

                  <input
                    id="register-name"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">
                  Email Address
                </label>

                <div className="auth-input-wrap">
                  <Mail size={18} />

                  <input
                    id="register-email"
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
                <label htmlFor="register-number">
                  University Registration Number
                </label>

                <div className="auth-input-wrap">
                  <IdCard size={18} />

                  <input
                    id="register-number"
                    name="registrationNumber"
                    type="text"
                    placeholder="Enter your registration number"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <small className="auth-field-hint">
                  This number will be verified by WayaLink
                  before account creation.
                </small>
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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

                {form.password && (
                  <div className="auth-strength">
                    <div className="auth-strength-bars">
                      {[1, 2, 3, 4].map((number) => (
                        <span
                          key={number}
                          className={
                            number <= passwordScore
                              ? `filled strength-${passwordScore}`
                              : ""
                          }
                        />
                      ))}
                    </div>

                    <small>
                      Password strength: {passwordLabel}
                    </small>
                  </div>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="register-confirm">
                  Confirm Password
                </label>

                <div className="auth-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-confirm"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowConfirm((value) => !value)
                    }
                    aria-label={
                      showConfirm
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {form.confirmPassword &&
                  form.password === form.confirmPassword && (
                    <small className="auth-valid-hint">
                      <CheckCircle2 size={14} />
                      Passwords match
                    </small>
                  )}
              </div>

              <div className="auth-security-note">
                <ShieldCheck size={18} />
                <span>
                  Only verified students will be able
                  to create accounts when registration
                  is enabled.
                </span>
              </div>

              {message && (
                <div
                  className={`auth-message ${
                    error ? "auth-message-error" : ""
                  }`}
                  role="status"
                >
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
                Create Account
                <ArrowRight size={18} />
              </motion.button>
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <Link to="/login" className="auth-switch-btn">
              Sign In Instead
              <ArrowRight size={16} />
            </Link>

            <p className="auth-card-footer">
              Designed for university students.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
