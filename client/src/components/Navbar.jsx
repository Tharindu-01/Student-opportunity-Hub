
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Opportunities", href: "#opportunities" },
    { label: "Clubs", href: "#clubs" },
    { label: "Events", href: "#events" },
    { label: "Community", href: "#community" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const goToPage = (path) => {
    closeMenu();
    navigate(path);
  };

  const goToSection = (section) => {
    closeMenu();

    if (!isHome) {
      navigate(`/${section}`);
      return;
    }

    const element = document.querySelector(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.hash = section;
    }
  };

  return (
    <motion.header
      className="wl-navbar-wrapper"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
      }}
    >
      <nav className="wl-navbar">
        {/* LOGO */}
        <Link
          to="/"
          className="wl-brand"
          onClick={closeMenu}
        >
          <motion.div
            className="wl-logo-container"
            whileHover={{
              rotate: -8,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            <img
              src="/wayalink-logo.png"
              alt="WayaLink Logo"
              className="wl-logo"
            />
          </motion.div>

          <div className="wl-brand-text">
            <strong className="wl-brand-name">
              Waya<span>Link</span>
            </strong>

            <small className="wl-tagline">
              CONNECT · DISCOVER · GROW
            </small>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="wl-nav">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              className="wl-nav-link"
              onClick={() => goToSection(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* LOGIN AND REGISTER */}
        <div className="wl-auth">
          <button
            type="button"
            className="wl-login"
            onClick={() => goToPage("/login")}
          >
            Login
          </button>

          <motion.button
            type="button"
            className="wl-register"
            onClick={() => goToPage("/register")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles size={15} />
            Get Started
            <ArrowRight size={15} />
          </motion.button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="wl-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="wl-mobile-menu"
            initial={{
              opacity: 0,
              y: -12,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -12,
              height: 0,
            }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                className="wl-mobile-nav-link"
                onClick={() => goToSection(item.href)}
              >
                {item.label}
              </button>
            ))}

            <div className="wl-mobile-auth">
              <button
                type="button"
                className="wl-mobile-login"
                onClick={() => goToPage("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="wl-mobile-register"
                onClick={() => goToPage("/register")}
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
