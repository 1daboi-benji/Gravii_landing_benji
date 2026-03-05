import { useState, useEffect, useRef } from "react";

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 rgba(127,155,170,0); }
    50% { box-shadow: 0 0 40px rgba(127,155,170,0.08); }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  ::selection {
    background: rgba(127,155,170,0.3);
    color: #F0EDE6;
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
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}>
        <span style={{ fontFamily: gambarino, fontSize: "22px", color: "#F0EDE6", letterSpacing: "-0.5px" }}>Gravii</span>
        <button style={{
          fontFamily: spaceMono, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          color: "#000", background: "#F0EDE6", border: "none", padding: "10px 24px",
          borderRadius: "6px", cursor: "pointer", transition: "all 0.3s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#7F9BAA"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#F0EDE6"; }}
        >Launch App</button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "120px 40px 80px", position: "relative",
      }}>
        <div style={{
          width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(127,155,170,0.08) 0%, transparent 70%)",
          marginBottom: "48px", animation: "float 6s ease-in-out infinite",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: "120px", height: "120px", borderRadius: "50%",
            border: "1px solid rgba(127,155,170,0.15)", animation: "pulseGlow 4s ease-in-out infinite",
          }} />
        </div>

        <h1 style={{
          fontFamily: gambarino, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400,
          color: "#F0EDE6", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1,
        }}>
          Connect once,<br />live differently.
        </h1>

        <p style={{
          fontFamily: spaceMono, fontSize: "14px", color: "rgba(255,255,255,0.35)",
          letterSpacing: "1px", margin: "0 0 48px",
        }}>
          We've burnt the old playbook.
        </p>

        <button style={{
          fontFamily: spaceMono, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
          color: "#000", background: "#F0EDE6", border: "none", padding: "14px 36px",
          borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(240,237,230,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >Join Waitlist</button>

        <div style={{
          position: "absolute", bottom: "40px", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.2,
        }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "10px", color: "#7F9BAA", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>The problem</p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 48px", lineHeight: 1.15, maxWidth: "700px" }}>
            Tired of starting from zero?
          </h2>
        </RevealSection>
        <RevealSection delay={0.2}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "48px", flexWrap: "wrap" }}>
            {["Sign up\nagain", "Verify\nagain", "Prove\nagain"].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  background: "#111111", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px", padding: "28px 36px", minWidth: "160px", textAlign: "center",
                }}>
                  <span style={{ fontFamily: spaceMono, fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "2px", textTransform: "uppercase" }}>
                    Service {String.fromCharCode(65 + i)}
                  </span>
                  <p style={{ fontFamily: spaceMono, fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "12px 0 0", whiteSpace: "pre-line", lineHeight: 1.5 }}>{text}</p>
                </div>
                {i < 2 && <span style={{ fontFamily: spaceMono, fontSize: "18px", color: "rgba(255,255,255,0.15)" }}>→</span>}
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection delay={0.3}>
          <p style={{ fontFamily: spaceMono, fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 2, maxWidth: "520px" }}>
            Every new platform asks you to prove yourself all over again. Your value. Your history. Your worth.<br />Over and over.
          </p>
        </RevealSection>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "10px", color: "#7F9BAA", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>The solution</p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 64px", lineHeight: 1.15, maxWidth: "700px" }}>
            One connection.<br />Every door opens.
          </h2>
        </RevealSection>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { num: "01", title: "Connect", desc: "Link your account once. We read your digital footprint." },
            { num: "02", title: "Verify", desc: "Your scattered activity becomes one universal digital status." },
            { num: "03", title: "Enjoy", desc: "Benefits and privileges — waiting before you even look." },
          ].map((step, i) => (
            <RevealSection key={i} delay={0.15 * (i + 1)}>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "32px",
                padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontFamily: spaceMono, fontSize: "11px", color: "#7F9BAA", letterSpacing: "2px", minWidth: "32px", paddingTop: "4px" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontFamily: gambarino, fontSize: "28px", fontWeight: 400, color: "#F0EDE6", margin: "0 0 10px" }}>{step.title}</h3>
                  <p style={{ fontFamily: spaceMono, fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, margin: 0, maxWidth: "440px" }}>{step.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", minWidth: "900px" }}>
          {[
            { title: "Digital Status", sub: "Your profile attracts the right deals.", desc: "No more searching. Your digital footprint does the work — opportunities come to you." },
            { title: "Borderless Benefits", sub: "Finance to lifestyle, all in one place.", desc: "From exclusive investments to premium perks — everything optimized for your profile." },
            { title: "Personal Concierge", sub: "It finds you before you search.", desc: "Our engine curates what matters most and places it in your space. Just log in and enjoy." },
          ].map((item, i) => (
            <RevealSection key={i} delay={0.1 * (i + 1)}>
              <div style={{
                background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2rem",
                padding: "40px 36px", transition: "all 0.4s ease", cursor: "default",
                height: "100%", display: "flex", flexDirection: "column", gap: "16px",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(127,155,170,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontFamily: spaceMono, fontSize: "9px", color: "#7F9BAA", letterSpacing: "2px" }}>0{i + 1}</span>
                <h3 style={{ fontFamily: gambarino, fontSize: "26px", fontWeight: 400, color: "#F0EDE6", margin: 0 }}>{item.title}</h3>
                <p style={{ fontFamily: spaceMono, fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{item.sub}</p>
                <p style={{ fontFamily: spaceMono, fontSize: "11px", color: "rgba(255,255,255,0.25)", margin: 0, lineHeight: 1.8, marginTop: "auto" }}>{item.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* LABELS SHOWCASE */}
      <section style={{ padding: "100px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <RevealSection>
            <p style={{ fontFamily: spaceMono, fontSize: "10px", color: "#7F9BAA", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "24px" }}>20 behavioral types</p>
          </RevealSection>
          <RevealSection delay={0.1}>
            <h2 style={{ fontFamily: gambarino, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 64px", lineHeight: 1.15 }}>
              Which type are you?
            </h2>
          </RevealSection>
        </div>

        <RevealSection delay={0.2}>
          <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "fit-content", marginBottom: "12px" }}>
            {[...LABELS, ...LABELS].map((label, i) => (
              <div key={i} style={{
                fontFamily: spaceMono, fontSize: "12px",
                color: hoveredLabel === label ? "#F0EDE6" : "rgba(255,255,255,0.3)",
                letterSpacing: "1px", padding: "14px 28px",
                border: `1px solid ${hoveredLabel === label ? "rgba(127,155,170,0.3)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "100px", whiteSpace: "nowrap", marginRight: "10px",
                transition: "all 0.3s ease", cursor: "default",
                background: hoveredLabel === label ? "rgba(127,155,170,0.08)" : "transparent",
              }}
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >{label}</div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={0.3}>
          <div style={{ display: "flex", animation: "marquee 35s linear infinite reverse", width: "fit-content" }}>
            {[...LABELS.slice().reverse(), ...LABELS.slice().reverse()].map((label, i) => (
              <div key={i} style={{
                fontFamily: spaceMono, fontSize: "12px",
                color: hoveredLabel === label ? "#F0EDE6" : "rgba(255,255,255,0.3)",
                letterSpacing: "1px", padding: "14px 28px",
                border: `1px solid ${hoveredLabel === label ? "rgba(127,155,170,0.3)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "100px", whiteSpace: "nowrap", marginRight: "10px",
                transition: "all 0.3s ease", cursor: "default",
                background: hoveredLabel === label ? "rgba(127,155,170,0.08)" : "transparent",
              }}
                onMouseEnter={() => setHoveredLabel(label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >{label}</div>
            ))}
          </div>
        </RevealSection>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 40px 0" }}>
          <RevealSection delay={0.4}>
            <button style={{
              fontFamily: spaceMono, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
              color: "#F0EDE6", background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              padding: "14px 32px", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#7F9BAA"; e.currentTarget.style.color = "#7F9BAA"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#F0EDE6"; }}
            >Connect to find yours</button>
          </RevealSection>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealSection>
          <p style={{ fontFamily: spaceMono, fontSize: "10px", color: "#7F9BAA", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "48px", textAlign: "center" }}>
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
                  <div style={{ fontFamily: spaceMono, fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase" }}>{stat.label}</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* VISION TEASER */}
      <section style={{
        padding: "140px 40px", textAlign: "center",
        background: "linear-gradient(180deg, #000 0%, #0A0A0A 50%, #000 100%)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(127,155,170,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <RevealSection>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "#F0EDE6", margin: "0 0 16px", lineHeight: 1.3, position: "relative" }}>
            We begin as a hub.
          </h2>
        </RevealSection>
        <RevealSection delay={0.2}>
          <h2 style={{ fontFamily: gambarino, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "rgba(127,155,170,0.6)", margin: 0, lineHeight: 1.3, position: "relative" }}>
            We become your lifestyle.
          </h2>
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
                flex: 1, fontFamily: spaceMono, fontSize: "13px", color: "#F0EDE6",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "14px 20px", outline: "none", transition: "border-color 0.3s ease",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(127,155,170,0.3)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            <button style={{
              fontFamily: spaceMono, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
              color: "#000", background: "#F0EDE6", border: "none", padding: "14px 28px",
              borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#7F9BAA"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F0EDE6"; }}
            >Join</button>
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "48px 40px", borderTop: "1px solid rgba(255,255,255,0.05)",
        maxWidth: "1200px", margin: "0 auto", display: "flex",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
      }}>
        <span style={{ fontFamily: gambarino, fontSize: "18px", color: "rgba(255,255,255,0.3)" }}>Gravii</span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["X", "Docs", "Contact"].map(link => (
            <span key={link} style={{
              fontFamily: spaceMono, fontSize: "11px", color: "rgba(255,255,255,0.25)",
              letterSpacing: "1px", cursor: "pointer", transition: "color 0.3s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#7F9BAA"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
            >{link}</span>
          ))}
        </div>
        <span style={{ fontFamily: spaceMono, fontSize: "10px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.5px" }}>
          © 2025 Gravii. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
