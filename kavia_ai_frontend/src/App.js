import React, { useState, useRef } from "react";
import "./App.css";

// Asset imports (SVG or PNG—referenced from /assets via public path)
const asset = (filename) => process.env.PUBLIC_URL + "/assets/" + filename;

// Framework logos list (filenames assumed to be included in /assets)
const frameworks = [
  { name: "React", file: "react_logo.svg" },
  { name: "Angular", file: "angular_logo.svg" },
  { name: "Astro", file: "astro_logo.svg" },
  { name: "NextJS", file: "nextjs_logo.svg" },
  { name: "Qwik", file: "qwik_logo.svg" },
  { name: "Nuxt", file: "nuxt_logo.svg" },
  { name: "Remix", file: "remix_logo.svg" },
  { name: "Remotion", file: "remotion_logo.png" },
  { name: "Slidev", file: "slidev_logo.svg" },
  { name: "Svelte", file: "svelte_logo.svg" },
  { name: "Vite", file: "vite_logo.svg" },
  { name: "Vue", file: "vue_logo.svg" }
];

// Community showcase cards (assets mapped to provided PNGs, adjust as needed)
const showcaseCards = [
  {
    title: "WordGrid",
    author: "by L. A.",
    image: "wordgrid.png"
  },
  {
    title: "Vistrata AI Travel Planner",
    author: "by Sara W.",
    image: "vistrata_ai_travel_planner.png"
  },
  {
    title: "Cyber Recon Surface Intelligence",
    author: "by M. V.",
    image: "cyber_recon_surface_intelligence.png"
  },
  {
    title: "FinanceFlow",
    author: "by Kenji T.",
    image: "financeflow.png"
  },
  {
    title: "Remotion",
    author: "by Ch. De S.",
    image: "remotion_logo.png"
  },
  {
    title: "GlowSkin",
    author: "by E. Feng",
    image: "glowskin.png"
  },
  {
    title: "TradeFusion",
    author: "by L. Klein",
    image: "tradefusion.png"
  }
];

function classNames(...args) {
  // Helper for easy conditional class names
  return args.filter(Boolean).join(" ");
}

// PUBLIC_INTERFACE
function App() {
  // State for cookie modal
  const [cookieOpen, setCookieOpen] = useState(true);

  // State for swipe carousel scroll
  const frameworkRowRef = useRef(null);

  // State for Build Options active/selection (optional, for highlight)
  const [selectedBuild, setSelectedBuild] = useState(null);

  // Play video modal state (not implemented - static for placeholder)
  const [videoModal, setVideoModal] = useState(false);

  // Dismiss cookie modal
  const handleCookieAction = (action) => {
    setCookieOpen(false);
    // Track or handle action if needed ('accept' or 'deny')
  };

  // For accessibility focus on swipe cue
  function handleFrameworkScroll(direction) {
    if (frameworkRowRef.current) {
      const el = frameworkRowRef.current;
      const scrollAmount = window.innerWidth < 600 ? 130 : 180;
      el.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  }

  // Build option handler (for visual feedback)
  function handleBuildSelect(option) {
    setSelectedBuild(option);
  }

  // Focus visible outline helper class for a11y
  function focusableProps() {
    return {
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === " " || e.key === "Enter") e.target.click();
      }
    };
  }

  return (
    <div className="kavia-root">
      {/* Pattern background motif */}
      <img
        src={asset("pattern_logo_opacity.png")}
        aria-hidden="true"
        alt=""
        className="pattern-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          opacity: 0.08,
          pointerEvents: "none"
        }}
      />

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* 1. Logo + Greeting */}
        <header className="kavia-header" aria-label="Main greeting and logo">
          <img
            src={asset("kavia_logo.svg")}
            alt="Kavia AI logo"
            className="kavia-logo"
            style={{ width: 54, height: 54, marginBottom: 20 }}
          />
          <div className="greeting" aria-label="Site greeting">
            Good morning, welcome back
          </div>
        </header>

        {/* 2. Main Prompt: What do you want to build */}
        <section className="section prompt-section" aria-labelledby="build-title">
          <h1 className="main-title" id="build-title">
            What do you want to build today?
          </h1>
          <div className="build-options-row">
            {["Web", "Mobile", "Backend", "Fullstack"].map((option, idx) => (
              <button
                key={option}
                className={classNames(
                  "build-option-pill",
                  selectedBuild === option && "active"
                )}
                aria-label={`Choose ${option}`}
                onClick={() => handleBuildSelect(option)}
                {...focusableProps()}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="swipe-cue">
            Swipe to see more options
          </div>
        </section>

        {/* 3. Framework selection carousel */}
        <section className="section framework-section" aria-labelledby="framework-title">
          <h2 className="visually-hidden" id="framework-title">
            Select your preferred framework
          </h2>
          <div className="framework-carousel-container">
            {/* Left scroll button for accessibility */}
            <button
              className="framework-arrow left"
              aria-label="Scroll frameworks left"
              onClick={() => handleFrameworkScroll("left")}
              tabIndex={0}
            >
              &#8592;
            </button>
            <div className="framework-carousel" ref={frameworkRowRef} tabIndex={0} aria-label="Framework list" role="list">
              {frameworks.map(({ name, file }) => (
                <div
                  key={name}
                  className="framework-pill"
                  title={name}
                  role="listitem"
                  aria-label={name}
                >
                  <img
                    src={asset(file)}
                    alt={`${name} logo`}
                    className="framework-logo"
                  />
                  <span className="framework-name">{name}</span>
                </div>
              ))}
            </div>
            {/* Right scroll button for accessibility */}
            <button
              className="framework-arrow right"
              aria-label="Scroll frameworks right"
              onClick={() => handleFrameworkScroll("right")}
              tabIndex={0}
            >
              &#8594;
            </button>
          </div>
        </section>

        {/* 4. Brand Vision Statement */}
        <section className="section brand-vision-section" aria-labelledby="brand-vision-title">
          <h3 className="brand-subtitle" id="brand-vision-title">
            KAVIA AI is revolutionizing software product development...
          </h3>
        </section>

        {/* 5. Reimagining Software Product Development w/ Video */}
        <section className="section reimagine-section" aria-labelledby="reimagine-title">
          <h2 className="large-heading" id="reimagine-title">
            Reimagining Software Product Development
          </h2>
          <div className="video-card" role="region" aria-label="Introduction video">
            <div
              className="video-thumbnail-wrapper"
              tabIndex={0}
              aria-label="Play video"
              style={{ cursor: "pointer" }}
              onClick={() => setVideoModal(true)}
              {...focusableProps()}
            >
              <img
                src={asset("home_video_thumbnail.png")}
                alt="Kavia Introduction Video Preview"
                className="video-thumbnail"
              />
              <div className="play-button-overlay">
                <span className="play-circle">
                  <svg width="38" height="38" viewBox="0 0 38 38">
                    <circle cx="19" cy="19" r="18" fill="#3333FF" />
                    <polygon
                      points="16,13 27,19 16,25"
                      fill="#FFF"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Community Showcase Section */}
        <section className="section showcase-section" aria-labelledby="showcase-title">
          <h3 className="showcase-heading" id="showcase-title">
            Built for Enterprise. Simplified for Software Creators
          </h3>
          <div className="showcase-carousel" role="list">
            {showcaseCards.slice(0, 6).map((card, idx) => (
              <div className="showcase-card" key={idx} role="listitem">
                <img
                  src={asset(card.image)}
                  alt={`${card.title} preview`}
                  className="showcase-image"
                />
                <div className="showcase-card-content">
                  <div className="showcase-title">{card.title}</div>
                  <div className="showcase-author">{card.author}</div>
                </div>
                <button
                  className="preview-btn"
                  aria-label={`Preview ${card.title}`}
                  tabIndex={0}
                  {...focusableProps()}
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
          <div className="showcase-actions">
            <button className="btn-primary view-more-btn">
              View More
            </button>
          </div>
        </section>
      </div>

      {/* 7. Cookie settings modal */}
      {cookieOpen && (
        <div className="cookie-modal" role="dialog" aria-modal="true" aria-label="Cookie settings notification">
          <img
            src={asset("cookie_icon.png")}
            alt="Cookie consent"
            className="cookie-icon"
          />
          <div className="cookie-text">
            We use our own cookies so that we can show you this website and understand how you use them...
          </div>
          <div className="cookie-actions">
            <button className="btn-outline" onClick={() => handleCookieAction("deny")} tabIndex={0}>
              Deny
            </button>
            <button className="btn-primary" onClick={() => handleCookieAction("accept")} tabIndex={0}>
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* If video modal implemented: */}
      {/* {videoModal && <VideoModal onClose={() => setVideoModal(false)} />} */}
    </div>
  );
}

export default App;
