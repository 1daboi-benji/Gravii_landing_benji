import { useState, useEffect, useRef } from "react";

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  ::selection {
    background: rgba(240,237,230,0.2);
    color: #F0EDE6;
  }

  @keyframes scanlines {
    0% { background-position: 0 0; }
    100% { background-position: 0 4px; }
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #000; color: #F0EDE6; -webkit-font-smoothing: antialiased; }
`;

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const gambarino = "'Gambarino', Georgia, serif";
const spaceMono = "'Space Mono', monospace";

const LABELS = [
  "Pro Trader", "DeFi Native", "NFT Collector", "Whale", "Builder",
  "Explorer", "HODLer", "Yield Farmer", "DAO Voter", "Airdrop Hunter",
  "Bridge Hopper", "Staker", "Liquidity Provider", "Minter", "Flipper",
  "Dormant Whale", "Gas Optimizer", "Multi-chain Native", "Early Adopter", "Degen"
];

export default function GraviiLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [hoveredLabel, setHoveredLabel] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "#000", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{FONTS_CSS}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gambarino&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 40px",
        background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.18)" : "1px solid transparent",
      }}>
        <span style={{ fontFamily: gambarino, fontSize: "22px", color: "#F0EDE6", letterSpacing: "-0.5px" }}>Gravii</span>
        <button style={{
          fontFamily: spaceMono, fontSize: "15px", letterSpacing: "2px", textTransform: "uppercase",
          color: "#000", background: "#F0EDE6", border: "none", padding: "10px 24px",
          borderRadius: "6px", cursor: "pointer", transition: "all 0.3s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,237,230,0.85)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#F0EDE6"; }}
        >Launch App</button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "120px 40px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Background radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Main title with metallic gradient */}
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <h1 style={{
            fontFamily: gambarino, fontSize: "clamp(56px, 9vw, 120px)", fontWeight: 400,
            margin: 0, letterSpacing: "-2px", lineHeight: 1.05,
            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.15) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Connect once,<br />Live differently.
          </h1>

          {/* Scanline overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)",
            animation: "scanlines 0.3s linear infinite",
          }} />
        </div>

        {/* Reflection */}
        <div style={{
          position: "relative", overflow: "hidden", height: "80px", marginBottom: "40px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)",
        }}>
          <div style={{
            fontFamily: gambarino, fontSize: "clamp(56px, 9vw, 120px)", fontWeight: 400,
            letterSpacing: "-2px", lineHeight: 1.05,
            background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 80%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: "scaleY(-1)", transformOrigin: "top",
          }}>
            Connect once,<br />Live differently.
          </div>
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.4)",
          letterSpacing: "2px", margin: "0 0 48px", textTransform: "uppercase",
        }}>
          "We've burnt the old playbook"
        </p>

        <div style={{
          display: "inline-block", padding: "1px", borderRadius: "8px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.08), rgba(255,255,255,0.25))",
          transition: "all 0.4s ease", cursor: "pointer",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15), rgba(255,255,255,0.45))"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.08), rgba(255,255,255,0.25))"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <button style={{
            fontFamily: spaceMono, fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase",
            background: "#000", border: "none", borderRadius: "7px",
            padding: "16px 40px", cursor: "pointer", transition: "all 0.4s ease",
            color: "transparent",
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text", backgroundClip: "text",
          }}>Join Waitlist</button>
        </div>

        <div style={{
          position: "absolute", bottom: "40px", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.2,
        }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)" }} />
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "18px", color: "rgba(240,237,230,0.6)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>The problem</p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 48px", lineHeight: 1.15 }}>
            Tired of starting from zero?
          </h2>
        </RevealSection>
        <RevealSection delay={0.2}>
          <div style={{ display: "flex", gap: "0", marginBottom: "48px", alignItems: "stretch" }}>
            {["Sign up\nagain", "Verify\nagain", "Prove\nagain"].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                <div style={{
                  flex: 1, background: "#050505", border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "16px", padding: "36px 28px", textAlign: "center",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: spaceMono, fontSize: "16px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase" }}>
                    Service {String.fromCharCode(65 + i)}
                  </span>
                  <p style={{ fontFamily: spaceMono, fontSize: "16px", color: "rgba(255,255,255,0.6)", margin: "12px 0 0", whiteSpace: "pre-line", lineHeight: 1.5 }}>{text}</p>
                </div>
                {i < 2 && <div style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
                  <span style={{ fontFamily: spaceMono, fontSize: "18px", color: "rgba(255,255,255,0.45)" }}>→</span>
                </div>}
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection delay={0.3}>
          <p style={{ fontFamily: spaceMono, fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>
            Every new platform asks you to prove yourself all over again.<br />Your value. Your history. Your worth. Over and over.
          </p>
        </RevealSection>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "120px" }}>
            <RevealSection>
              <p style={{ fontFamily: spaceMono, fontSize: "18px", color: "rgba(240,237,230,0.6)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>The solution</p>
            </RevealSection>
            <RevealSection delay={0.1}>
              <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0", lineHeight: 1.15 }}>
                One connection.<br />Every door opens.
              </h2>
            </RevealSection>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { num: "01", title: "Connect", desc: "Link your account once. We read your digital footprint." },
              { num: "02", title: "Verify", desc: "Your scattered activity becomes one universal digital status." },
              { num: "03", title: "Enjoy", desc: "Benefits and privileges — waiting before you even look." },
            ].map((step, i) => (
              <RevealSection key={i} delay={0.15 * (i + 1)}>
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "24px",
                  padding: "36px 0", borderTop: "1px solid rgba(255,255,255,0.12)",
                }}>
                  <span style={{ fontFamily: spaceMono, fontSize: "15px", color: "rgba(240,237,230,0.6)", letterSpacing: "2px", minWidth: "32px", paddingTop: "6px" }}>{step.num}</span>
                  <div>
                    <h3 style={{ fontFamily: gambarino, fontSize: "28px", fontWeight: 400, color: "#F0EDE6", margin: "0 0 12px" }}>{step.title}</h3>
                    <p style={{ fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* WITHOUT GRAVII card */}
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>Without Gravii</p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div style={{
            background: "transparent", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: "2rem",
            padding: "40px 44px", marginBottom: "20px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {[
                "Googling 'best yields' every morning",
                "Juggling platforms for scattered perks",
                "Browsing feeds hoping to find what fits",
              ].map((text, i) => (
                <p key={i} style={{
                  fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7, fontStyle: "italic", margin: 0,
                }}>{text}</p>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* WITH GRAVII card */}
        <RevealSection delay={0.2}>
          <p style={{ fontFamily: spaceMono, fontSize: "15px", color: "#F0EDE6", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px", marginTop: "40px" }}>With Gravii</p>
        </RevealSection>
        <RevealSection delay={0.3}>
          <div style={{
            background: "#050505", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "2rem",
            padding: "48px 44px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              {[
                { title: "Digital Status", desc: "Your profile attracts the right deals — opportunities come to you." },
                { title: "Borderless Benefits", desc: "Finance to lifestyle, all optimized in one place." },
                { title: "Personal Concierge", desc: "Our engine curates what matters — before you even search." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 style={{ fontFamily: gambarino, fontSize: "26px", fontWeight: 400, color: "#F0EDE6", margin: "0 0 12px" }}>{item.title}</h3>
                  <p style={{
                    fontFamily: spaceMono, fontSize: "15px", color: "rgba(240,237,230,0.7)",
                    margin: 0, lineHeight: 1.7,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* LABELS SHOWCASE */}
      <section style={{ padding: "100px 0", overflow: "hidden" }}>

        {/* Marquee row 1 */}
        <RevealSection delay={0.1}>
          <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "fit-content", marginBottom: "40px" }}>
            {[...LABELS, ...LABELS].map((label, i) => (
              <div key={i} style={{
                fontFamily: spaceMono, fontSize: "16px",
                color: hoveredLabel === label ? "#F0EDE6" : "rgba(255,255,255,0.45)",
                letterSpacing: "1px", padding: "14px 28px",
                border: `1px solid ${hoveredLabel === label ? "rgba(240,237,230,0.2)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: "100px", whiteSpace: "nowrap", marginRight: "10px",
                transition: "all 0.3s ease", cursor: "default",
                background: hoveredLabel === label ? "rgba(240,237,230,0.05)" : "transparent",
              }}
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >{label}</div>
            ))}
          </div>
        </RevealSection>

        {/* Center title + label below */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <RevealSection delay={0.2}>
            <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 12px", lineHeight: 1.15, padding: "20px 0 0" }}>
              Which type are you?
            </h2>
            <p style={{ fontFamily: spaceMono, fontSize: "15px", color: "#F0EDE6", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 20px", opacity: 0.6 }}>20 behavioral types</p>
          </RevealSection>
        </div>

        {/* Marquee row 2 */}
        <RevealSection delay={0.3}>
          <div style={{ display: "flex", animation: "marquee 35s linear infinite reverse", width: "fit-content", marginTop: "40px" }}>
            {[...LABELS.slice().reverse(), ...LABELS.slice().reverse()].map((label, i) => (
              <div key={i} style={{
                fontFamily: spaceMono, fontSize: "16px",
                color: hoveredLabel === label ? "#F0EDE6" : "rgba(255,255,255,0.45)",
                letterSpacing: "1px", padding: "14px 28px",
                border: `1px solid ${hoveredLabel === label ? "rgba(240,237,230,0.2)" : "rgba(255,255,255,0.12)"}`,
                borderRadius: "100px", whiteSpace: "nowrap", marginRight: "10px",
                transition: "all 0.3s ease", cursor: "default",
                background: hoveredLabel === label ? "rgba(240,237,230,0.05)" : "transparent",
              }}
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >{label}</div>
            ))}
          </div>
        </RevealSection>

      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "18px", color: "rgba(240,237,230,0.6)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "48px", textAlign: "center" }}>
            All your activity, every chain — one profile.
          </p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap" }}>
            {[
              { num: "7+", label: "Chains unified" },
              { num: "1M+", label: "Transactions analyzed" },
              { num: "20", label: "Behavioral types" },
            ].map((stat, i) => (
              <RevealSection key={i} delay={0.1 * (i + 1)}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: gambarino, fontSize: "48px", color: "#F0EDE6", marginBottom: "8px" }}>{stat.num}</div>
                  <div style={{ fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.45)", letterSpacing: "2px", textTransform: "uppercase" }}>{stat.label}</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* WAITLIST */}
      <section style={{ padding: "100px 40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <RevealSection>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 48px", lineHeight: 1.2 }}>
            Live different. Start here.
          </h2>
        </RevealSection>
        <RevealSection delay={0.15}>
          <div style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email..."
              style={{
                flex: 1, fontFamily: spaceMono, fontSize: "15px", color: "#F0EDE6",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "8px", padding: "14px 20px", outline: "none", transition: "border-color 0.3s ease",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(240,237,230,0.2)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            <button style={{
              fontFamily: spaceMono, fontSize: "15px", letterSpacing: "2px", textTransform: "uppercase",
              color: "#000", background: "#F0EDE6", border: "none", padding: "14px 28px",
              borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,237,230,0.85)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F0EDE6"; }}
            >Join</button>
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "48px 40px", borderTop: "1px solid rgba(255,255,255,0.18)",
        maxWidth: "1200px", margin: "0 auto", display: "flex",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
      }}>
        <span style={{ fontFamily: gambarino, fontSize: "18px", color: "rgba(255,255,255,0.45)" }}>Gravii</span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["X", "Docs", "Contact"].map(link => (
            <span key={link} style={{
              fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.4)",
              letterSpacing: "1px", cursor: "pointer", transition: "color 0.3s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(240,237,230,0.6)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >{link}</span>
          ))}
        </div>
        <span style={{ fontFamily: spaceMono, fontSize: "15px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.5px" }}>
          © 2025 Gravii. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
