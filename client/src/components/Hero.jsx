
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  CalendarDays,
  Users,
  CheckCircle2,
  Zap,
  Orbit,
} from "lucide-react";

const opportunities = [
  {
    title: "Scholarships",
    subtitle: "Support your future",
    icon: GraduationCap,
    className: "hero-float-scholarship",
  },
  {
    title: "Internships",
    subtitle: "Build real experience",
    icon: BriefcaseBusiness,
    className: "hero-float-internship",
  },
  {
    title: "Campus Events",
    subtitle: "Discover & connect",
    icon: CalendarDays,
    className: "hero-float-events",
  },
  {
    title: "Student Clubs",
    subtitle: "Grow together",
    icon: Users,
    className: "hero-float-clubs",
  },
];

export default function Hero({ search, setSearch }) {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  function handlePointerMove(event) {
    if (reduceMotion || !heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();

    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section
      className="hero hero-v6"
      id="home"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      style={{
        "--pointer-x": `${pointer.x}%`,
        "--pointer-y": `${pointer.y}%`,
      }}
    >
      <div className="hero-v6-grid" />
      <div className="hero-v6-pointer-glow" />
      <div className="hero-v6-orb hero-v6-orb-one" />
      <div className="hero-v6-orb hero-v6-orb-two" />

      <div className="hero-v6-container">
        <div className="hero-v6-content">
          <motion.div
            className="hero-v6-badge"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="hero-v6-badge-dot" />
            THE STUDENT OPPORTUNITY HUB
            <Sparkles size={15} />
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Discover.
            <br />
            Connect.
            <br />
            <span>Grow Beyond Limits.</span>
          </motion.h1>

          <motion.p
            className="hero-v6-description"
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            Your next opportunity is closer than you think.
            Explore scholarships, internships, clubs and
            events — all in one place, built for students.
          </motion.p>

          <motion.div
            className="hero-v6-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="#opportunities"
              className="hero-v6-primary"
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Opportunities
              <ArrowUpRight size={18} />
              <span className="hero-v6-button-shine" />
            </motion.a>

            <motion.a
              href="#categories"
              className="hero-v6-secondary"
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse Categories
              <ArrowRight size={17} />
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-v6-search"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Search size={19} />

            <input
              type="search"
              placeholder="Search your next opportunity..."
              aria-label="Search opportunities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document
                    .getElementById("opportunities")
                    ?.scrollIntoView({
                      behavior: reduceMotion ? "auto" : "smooth",
                    });
                }
              }}
            />

            <a href="#opportunities">
              Search
              <ArrowRight size={15} />
            </a>
          </motion.div>

          <div className="hero-v6-trust">
            <CheckCircle2 size={16} />
            One platform. More possibilities.
          </div>
        </div>

        <motion.div
          className="hero-v6-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="hero-v6-visual-glow" />

          <div className="hero-v6-ring hero-v6-ring-one" />
          <div className="hero-v6-ring hero-v6-ring-two" />

          
<motion.div
  className="hero-v6-core hero-v6-logo-core"
  animate={
    reduceMotion
      ? undefined
      : {
          y: [0, -13, 0],
          rotate: [-4, 4, -4],
          scale: [1, 1.04, 1],
        }
  }
  whileHover={
    reduceMotion
      ? undefined
      : {
          scale: 1.12,
          rotate: 0,
          transition: { duration: 0.3 },
        }
  }
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <div className="hero-v6-logo-glow" />

  <img
    src="/wayalink-logo.png"
    alt="WayaLink Logo"
    className="hero-v6-logo-image"
  />
</motion.div>

{/* Animated WayaLink Brand Name */}
<motion.div
  className="hero-v6-brand-title"
  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  <motion.h2
    animate={
      reduceMotion
        ? undefined
        : { y: [0, -5, 0] }
    }
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    Waya<span>Link</span>
  </motion.h2>

  <div className="hero-v6-brand-underline" />

  <p>CONNECT · DISCOVER · GROW</p>
</motion.div>



          {opportunities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className={`hero-v6-floating-card ${item.className}`}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, index % 2 ? 12 : -12, 0] }
                }
                transition={{
                  duration: 5 + index * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              >
                <div className="hero-v6-floating-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </div>

                <ArrowUpRight size={15} className="hero-v6-card-arrow" />
              </motion.div>
            );
          })}

          <motion.div
            className="hero-v6-mini-label"
            animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Orbit size={16} />
            Your future starts here
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-v6-bottom-line" />
    </section>
  );
}
