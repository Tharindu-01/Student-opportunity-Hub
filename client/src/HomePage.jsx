import Navbar from "./components/Navbar";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  SearchX,
  Sparkles,
  Users,
  Building2,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./App.css";

const categories = [
  {
    name: "Scholarship",
    title: "Scholarships",
    description:
      "Discover funding and financial support for your academic journey.",
    icon: GraduationCap,
    className: "bento-scholarships",
    tag: "FUND YOUR FUTURE",
  },
  {
    name: "Internship",
    title: "Internships",
    description:
      "Gain real-world experience and take your first career step.",
    icon: BriefcaseBusiness,
    className: "bento-internships",
    tag: "BUILD YOUR CAREER",
  },
  {
    name: "Club",
    title: "Clubs & Societies",
    description:
      "Find your people, develop skills and grow together.",
    icon: Users,
    className: "bento-clubs",
    tag: "FIND YOUR COMMUNITY",
  },
  {
    name: "Event",
    title: "Events & Workshops",
    description:
      "Learn, connect and make every campus moment count.",
    icon: CalendarDays,
    className: "bento-events",
    tag: "EXPLORE EXPERIENCES",
  },
];

const filterOptions = [
  { label: "All Opportunities", value: "All" },
  ...categories.map((item) => ({
    label: item.title,
    value: item.name,
  })),
];

function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOpportunities() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/opportunities",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load opportunities (${response.status})`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid opportunity data");
        }

        if (!controller.signal.aborted) {
          setOpportunities(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchOpportunities();

    return () => controller.abort();
  }, []);

  const filteredOpportunities = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return opportunities.filter((item) => {
      const searchableText = [
        item.title,
        item.category,
        item.organization,
        item.location,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(keyword);

      const matchesCategory =
        category === "All" ||
        String(item.category || "").toLowerCase() ===
          category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [opportunities, search, category]);

  function selectCategory(value) {
    setCategory(value);

    document
      .getElementById("opportunities")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <>
      <Navbar />

      <main>
        <Hero search={search} setSearch={setSearch} />

        {/* CATEGORY SECTION */}
        <section className="categories-section" id="categories">
          <div className="section-container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">
                  <Sparkles size={15} />
                  THE POSSIBILITIES
                </span>

                <h2>
                  Your journey,{" "}
                  <span className="gradient-heading">
                    your opportunities.
                  </span>
                </h2>

                <p>
                  One place to discover what matters most
                  to your future.
                </p>
              </div>

              <a
                className="section-header-link"
                href="#opportunities"
              >
                Browse all opportunities
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="bento-grid">
              {categories.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`bento-card ${item.className}`}
                    onClick={() => selectCategory(item.name)}
                  >
                    <div className="bento-card-top">
                      <span className="bento-icon">
                        <Icon size={24} />
                      </span>

                      <span className="bento-arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>

                    <div className="bento-card-bottom">
                      <span className="bento-tag">
                        {item.tag}
                      </span>

                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* OPPORTUNITIES SECTION */}
        <section
          className="opportunities-section"
          id="opportunities"
        >
          <div className="section-container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">
                  <Compass size={15} />
                  EXPLORE & DISCOVER
                </span>

                <h2>
                  Opportunities worth{" "}
                  <span className="gradient-heading">
                    exploring.
                  </span>
                </h2>

                <p>
                  Search and filter opportunities that
                  match your interests.
                </p>
              </div>

              <div className="opportunity-count">
                <span className="count-dot" />
                {loading
                  ? "Loading..."
                  : `${filteredOpportunities.length} results`}
              </div>
            </div>

            <div className="filter-bar">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    category === option.value
                      ? "filter-btn selected"
                      : "filter-btn"
                  }
                  onClick={() => setCategory(option.value)}
                  aria-pressed={category === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {loading && (
              <div className="status-panel" role="status">
                <div className="loading-spinner" />
                <p>Finding opportunities for you...</p>
              </div>
            )}

            {error && (
              <div className="status-panel error-panel" role="alert">
                <h3>Unable to load opportunities</h3>
                <p>{error}</p>
                <p>
                  Check whether your Express backend is
                  running at localhost:5000.
                </p>
              </div>
            )}

            {!loading && !error && (
              <div className="opportunity-grid">
                {filteredOpportunities.map((item, index) => (
                  <article
                    className="opportunity-card"
                    key={item.id ?? `${item.title}-${index}`}
                  >
                    <div className="opportunity-card-top">
                      <div className="opportunity-logo">
                        {item.category === "Scholarship" ? (
                          <GraduationCap size={23} />
                        ) : item.category === "Internship" ? (
                          <BriefcaseBusiness size={23} />
                        ) : item.category === "Club" ? (
                          <Users size={23} />
                        ) : (
                          <CalendarDays size={23} />
                        )}
                      </div>

                      <span className="opportunity-badge">
                        {item.category || "Opportunity"}
                      </span>
                    </div>

                    <h3>{item.title}</h3>

                    <p className="opportunity-organization">
                      <Building2 size={16} />
                      {item.organization || "Organization not specified"}
                    </p>

                    <p className="opportunity-location">
                      <MapPin size={16} />
                      {item.location || "Location not specified"}
                    </p>

                    <div className="opportunity-card-footer">
                      <span>
                        <CheckCircle2 size={14} />
                        Opportunity listing
                      </span>

                      <span className="card-arrow-icon">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading &&
              !error &&
              filteredOpportunities.length === 0 && (
                <div className="empty-state">
                  <SearchX size={38} />
                  <h3>No matching opportunities</h3>
                  <p>
                    Try a different search or choose
                    another category.
                  </p>

                  <button type="button" onClick={clearFilters}>
                    Clear filters
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

            <div className="opportunity-note">
              <Sparkles size={16} />
              Opportunities shown here currently come from
              your backend API. Additional listings and
              detail pages will be added later.
            </div>
          </div>
        </section>

        {/* COMMUNITY PREVIEW */}
        <section className="experience-section" id="clubs">
          <div className="section-container">
            <div className="experience-panel">
              <div className="experience-content">
                <span className="experience-eyebrow">
                  MORE THAN OPPORTUNITIES
                </span>

                <h2>
                  Your campus journey,
                  <br />
                  beautifully connected.
                </h2>

                <p>
                  WayaLink is growing into a place where
                  students can discover communities, share
                  experiences and build meaningful connections.
                </p>

                <a href="#community">
                  Explore the vision
                  <ArrowRight size={17} />
                </a>
              </div>

              <div className="experience-visual" aria-hidden="true">
                <div className="experience-orb">
                  <Users size={60} />
                </div>
                <div className="experience-mini-card mini-card-a">
                  <Users size={19} />
                  Student communities
                </div>
                <div className="experience-mini-card mini-card-b">
                  <Bookmark size={19} />
                  Your next chapter
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mini-section" id="events">
          <div className="section-container mini-section-inner">
            <CalendarDays size={24} />
            <div>
              <h2>Events & Workshops</h2>
              <p>
                A dedicated event calendar is coming in
                a future WayaLink update.
              </p>
            </div>
          </div>
        </section>

        <section className="mini-section" id="community">
          <div className="section-container mini-section-inner">
            <Users size={24} />
            <div>
              <h2>WayaLink Community</h2>
              <p>
                Student experiences and community features
                are planned for the next development stages.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="wl-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img
              src="/wayalink-logo.png"
              alt="WayaLink"
            />

            <div>
              <strong>
                Waya<span>Link</span>
              </strong>
              <p>Connect. Discover. Grow.</p>
            </div>
          </div>

          <p className="footer-description">
            A student opportunity and experience hub
            built for discovering what comes next.
          </p>
        </div>

        <div className="footer-bottom">
          <span>WayaLink — Student Opportunity Hub</span>
          <span>Designed for student growth</span>
        </div>
      </footer>
    </>
  );
}

export default App;
