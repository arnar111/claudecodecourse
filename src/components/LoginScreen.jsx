import { I } from "./Icons";

export default function LoginScreen({ palette, onLogin, onSignup }) {
  const C = palette;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: `
          radial-gradient(circle at 20% 0%, ${C.rose}22 0%, transparent 50%),
          radial-gradient(circle at 80% 100%, ${C.sun}26 0%, transparent 55%),
          ${C.bg}`,
        color: C.ink,
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${C.line}55 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          background: C.panel,
          border: `1px solid ${C.line}`,
          borderRadius: 22,
          padding: 32,
          boxShadow: `0 8px 32px ${C.line}66`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            fontFamily: "'VT323', monospace",
            fontSize: 24,
            letterSpacing: "0.04em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 22,
              height: 22,
              flexShrink: 0,
              background: `
                linear-gradient(${C.rose},${C.rose}) 0 0/7px 7px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 7px 0/7px 7px no-repeat,
                linear-gradient(${C.lavender},${C.lavender}) 14px 0/7px 7px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 0 7px/7px 7px no-repeat,
                linear-gradient(${C.mint},${C.mint}) 7px 7px/7px 7px no-repeat,
                linear-gradient(${C.rose},${C.rose}) 14px 7px/7px 7px no-repeat,
                linear-gradient(${C.lavender},${C.lavender}) 0 14px/7px 7px no-repeat,
                linear-gradient(${C.mint},${C.mint}) 7px 14px/7px 7px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 14px 14px/7px 7px no-repeat
              `,
            }}
          />
          CC<span style={{ color: C.rose }}>/</span>arcade
        </div>

        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 15,
            letterSpacing: "0.1em",
            color: C.rose,
            marginBottom: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: C.rose,
              display: "inline-block",
            }}
          />
          ▸ INNSKRÁNING
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: "0 0 10px",
          }}
        >
          Velkomin/n í{" "}
          <span style={{ color: C.rose }}>Claude Code námskeiðið</span>.
        </h1>
        <p
          style={{
            fontSize: 14,
            color: C.inkDim,
            lineHeight: 1.55,
            margin: "0 0 22px",
          }}
        >
          Skráðu þig inn til að vista framvindu, XP og streak á milli tækja.
          Notaðu sama reikning hvar sem þú ert.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={onSignup}
            style={{
              padding: "13px 20px",
              borderRadius: 12,
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: 14,
              border: `1px solid ${C.rose}`,
              background: C.rose,
              color: "#fff",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 3px 0 ${C.rose}aa`,
            }}
          >
            <I.sparkle size={14} />
            Búa til nýjan reikning
          </button>
          <button
            onClick={onLogin}
            style={{
              padding: "13px 20px",
              borderRadius: 12,
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: 14,
              border: `1px solid ${C.line}`,
              background: C.panel,
              color: C.ink,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 3px 0 ${C.line}`,
            }}
          >
            Ég á nú þegar reikning
          </button>
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: `1px dashed ${C.line}`,
            fontSize: 12,
            color: C.inkSoft,
            lineHeight: 1.55,
          }}
        >
          Innskráning notar Netlify Identity. Framvindan er geymd á server svo
          þú getur haldið áfram hvar sem er.
        </div>
      </div>
    </div>
  );
}
