// Animated line-art for each service on the Expertise page.
// Styling and keyframes live in globals.css under "Service art".
// Every element's resting (non-animated) state is the finished drawing, so
// with reduced motion the art simply shows complete.

const css = (vars) => vars; // readability helper for inline CSS variables

function Frame({ x = 20, y = 20, w = 360, h = 260, r = 14 }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} className="sa-frame" />;
}

/* 01 — Web design: a page layout builds itself, then a cursor clicks the CTA */
export function WebDesignArt() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      <Frame />
      <line x1="20" y1="52" x2="380" y2="52" className="sa-rule" />
      <circle cx="40" cy="36" r="4.5" className="sa-dot" />
      <circle cx="55" cy="36" r="4.5" className="sa-dot" />
      <circle cx="70" cy="36" r="4.5" className="sa-dot" />
      <rect x="140" y="29" width="120" height="14" rx="7" className="sa-soft" />

      {/* hero block */}
      <rect
        x="44"
        y="70"
        width="312"
        height="78"
        rx="10"
        className="sa-accent-soft sa-grow-x"
        style={css({ "--delay": "0.1s" })}
      />
      <rect
        x="62"
        y="88"
        width="150"
        height="12"
        rx="6"
        className="sa-accent-fill sa-grow-x"
        style={css({ "--delay": "0.5s" })}
      />
      <rect
        x="62"
        y="108"
        width="104"
        height="8"
        rx="4"
        className="sa-ink sa-grow-x"
        style={css({ "--delay": "0.7s" })}
      />
      <rect
        x="62"
        y="125"
        width="58"
        height="14"
        rx="7"
        className="sa-accent-fill sa-pop"
        style={css({ "--delay": "0.9s" })}
      />
      <rect
        x="250"
        y="82"
        width="88"
        height="54"
        rx="8"
        className="sa-ink-soft sa-pop"
        style={css({ "--delay": "1.0s" })}
      />

      {/* cards */}
      {[44, 152, 260].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="164"
            width="96"
            height="96"
            rx="9"
            pathLength="1"
            className="sa-stroke sa-draw"
            style={css({ "--delay": `${1.2 + i * 0.2}s` })}
          />
          <rect
            x={x + 10}
            y="174"
            width="76"
            height="40"
            rx="6"
            className="sa-ink-soft sa-pop"
            style={css({ "--delay": `${1.5 + i * 0.2}s` })}
          />
          <rect
            x={x + 10}
            y="224"
            width="56"
            height="7"
            rx="3.5"
            className="sa-ink sa-grow-x"
            style={css({ "--delay": `${1.7 + i * 0.2}s` })}
          />
          <rect
            x={x + 10}
            y="238"
            width="38"
            height="7"
            rx="3.5"
            className="sa-ink sa-grow-x"
            style={css({ "--delay": `${1.8 + i * 0.2}s` })}
          />
        </g>
      ))}

      {/* click ripple + cursor */}
      <circle cx="91" cy="132" r="18" className="sa-ripple" />
      <g className="sa-cursor">
        <path
          d="M0 0 L0 22 L6 16 L10 26 L14 24 L10 14 L18 14 Z"
          className="sa-cursor-shape"
        />
      </g>
    </svg>
  );
}

/* 02 — Digital product: dashboard with growing bars and a trend line */
export function DigitalProductArt() {
  const bars = [
    { x: 128, h: 50 },
    { x: 160, h: 78 },
    { x: 192, h: 62 },
    { x: 224, h: 104 },
    { x: 256, h: 88 },
    { x: 288, h: 126 },
    { x: 320, h: 112 },
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      <Frame />
      {/* sidebar */}
      <rect x="20" y="20" width="76" height="260" rx="14" className="sa-soft" />
      <rect
        x="36"
        y="40"
        width="26"
        height="26"
        rx="8"
        className="sa-accent-fill"
      />
      {[84, 104, 124, 144].map((y, i) => (
        <rect
          key={y}
          x="36"
          y={y}
          width={i === 0 ? 44 : 36}
          height="7"
          rx="3.5"
          className={i === 0 ? "sa-accent-fill" : "sa-ink"}
        />
      ))}
      {/* toggle */}
      <rect
        x="36"
        y="236"
        width="40"
        height="20"
        rx="10"
        className="sa-toggle-track"
      />
      <circle cx="46" cy="246" r="7" className="sa-toggle-knob" />

      {/* KPI cards */}
      <rect
        x="114"
        y="38"
        width="122"
        height="58"
        rx="10"
        className="sa-stroke"
      />
      <rect x="128" y="52" width="40" height="6" rx="3" className="sa-ink" />
      <rect
        x="128"
        y="66"
        width="74"
        height="16"
        rx="5"
        className="sa-accent-fill sa-grow-x"
        style={css({ "--delay": "0.2s" })}
      />
      <rect
        x="246"
        y="38"
        width="118"
        height="58"
        rx="10"
        className="sa-stroke"
      />
      <rect x="260" y="52" width="40" height="6" rx="3" className="sa-ink" />
      <rect
        x="260"
        y="66"
        width="56"
        height="16"
        rx="5"
        className="sa-ink-strong sa-grow-x"
        style={css({ "--delay": "0.35s" })}
      />

      {/* chart */}
      <line x1="114" y1="262" x2="364" y2="262" className="sa-rule" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={262 - b.h}
          width="20"
          height={b.h}
          rx="5"
          className={`${i === 5 ? "sa-accent-fill" : "sa-accent-soft"} sa-grow-y`}
          style={css({ "--delay": `${0.5 + i * 0.12}s` })}
        />
      ))}
      <path
        d="M138 214 L170 190 L202 202 L234 160 L266 172 L298 128 L330 140"
        pathLength="1"
        className="sa-accent-line sa-draw"
        style={css({ "--delay": "1.4s" })}
      />
      <circle
        cx="298"
        cy="128"
        r="6"
        className="sa-accent-fill sa-pop"
        style={css({ "--delay": "2.3s" })}
      />
      <circle cx="298" cy="128" r="14" className="sa-ripple sa-ripple-late" />
    </svg>
  );
}

/* 03 — Development: code types in, then the build succeeds */
export function DevelopmentArt() {
  const lines = [
    { x: 74, w: 70, c: "sa-accent-fill" },
    { x: 92, w: 120, c: "sa-ink-strong" },
    { x: 92, w: 84, c: "sa-accent-soft-strong" },
    { x: 110, w: 150, c: "sa-ink" },
    { x: 110, w: 96, c: "sa-ink-strong" },
    { x: 92, w: 60, c: "sa-accent-soft-strong" },
    { x: 74, w: 30, c: "sa-accent-fill" },
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      <Frame />
      {/* tabs */}
      <rect x="20" y="20" width="360" height="34" rx="14" className="sa-soft" />
      <rect
        x="36"
        y="30"
        width="70"
        height="14"
        rx="7"
        className="sa-accent-soft"
      />
      <rect
        x="114"
        y="30"
        width="56"
        height="14"
        rx="7"
        className="sa-ink-soft"
      />
      {/* gutter */}
      {lines.map((_, i) => (
        <rect
          key={`n${i}`}
          x="40"
          y={72 + i * 20}
          width="14"
          height="6"
          rx="3"
          className="sa-ink-soft"
        />
      ))}
      {lines.map((l, i) => (
        <rect
          key={`l${i}`}
          x={l.x}
          y={70 + i * 20}
          width={l.w}
          height="10"
          rx="5"
          className={`${l.c} sa-grow-x sa-type`}
          style={css({ "--delay": `${0.15 + i * 0.28}s` })}
        />
      ))}
      <rect
        x="108"
        y="190"
        width="3"
        height="14"
        rx="1.5"
        className="sa-caret"
      />

      {/* terminal */}
      <rect
        x="36"
        y="218"
        width="328"
        height="46"
        rx="10"
        className="sa-terminal"
      />
      <rect
        x="52"
        y="230"
        width="86"
        height="8"
        rx="4"
        className="sa-ink sa-grow-x"
        style={css({ "--delay": "2.3s" })}
      />
      <g className="sa-pop" style={css({ "--delay": "2.8s" })}>
        <circle cx="60" cy="251" r="7" className="sa-accent-fill" />
        <path d="M56.5 251 L59 253.5 L63.5 248.5" className="sa-check" />
      </g>
      <rect
        x="74"
        y="247"
        width="110"
        height="8"
        rx="4"
        className="sa-accent-fill sa-grow-x"
        style={css({ "--delay": "3s" })}
      />
    </svg>
  );
}

/* 04 — UI/UX: a user journey, a dot travels through connected screens */
export function UiUxArt() {
  const journey =
    "M62 150 C 100 150, 104 78, 146 78 C 196 78, 200 150, 244 150 C 288 150, 292 222, 336 222";
  const screens = [
    { x: 30, y: 116, d: "0s" },
    { x: 114, y: 44, d: "2s" },
    { x: 212, y: 116, d: "4s" },
    { x: 304, y: 188, d: "5.85s" },
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      {/* alternative (unused) branches */}
      <path d="M146 78 C 196 78, 200 30, 250 30" className="sa-dashed" />
      <path d="M62 150 C 100 150, 104 230, 146 230" className="sa-dashed" />
      <rect
        x="146"
        y="214"
        width="40"
        height="32"
        rx="7"
        className="sa-stroke"
      />

      <path d={journey} className="sa-rail" />
      <path
        d={journey}
        pathLength="1"
        className="sa-accent-line sa-draw sa-draw-slow"
      />

      {screens.map((s, i) => (
        <g key={i}>
          <rect
            x={s.x}
            y={s.y}
            width="64"
            height="68"
            rx="10"
            className="sa-screen"
            style={css({ "--delay": s.d })}
          />
          <rect
            x={s.x + 10}
            y={s.y + 12}
            width="30"
            height="6"
            rx="3"
            className="sa-ink"
          />
          <rect
            x={s.x + 10}
            y={s.y + 24}
            width="44"
            height="18"
            rx="4"
            className="sa-ink-soft"
          />
          <rect
            x={s.x + 10}
            y={s.y + 50}
            width="24"
            height="8"
            rx="4"
            className="sa-accent-fill"
          />
        </g>
      ))}

      <circle r="7" className="sa-traveller">
        <animateMotion dur="6s" repeatCount="indefinite" path={journey} />
      </circle>
    </svg>
  );
}

/* 05 — Brand identity: a mark constructed over guides, then palette + type */
export function BrandIdentityArt() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      {/* construction guides */}
      <circle
        cx="140"
        cy="150"
        r="104"
        pathLength="1"
        className="sa-guide sa-draw"
      />
      <circle
        cx="140"
        cy="150"
        r="66"
        pathLength="1"
        className="sa-guide sa-draw"
        style={css({ "--delay": "0.25s" })}
      />
      <line
        x1="36"
        y1="150"
        x2="244"
        y2="150"
        pathLength="1"
        className="sa-guide sa-draw"
        style={css({ "--delay": "0.4s" })}
      />
      <line
        x1="140"
        y1="46"
        x2="140"
        y2="254"
        pathLength="1"
        className="sa-guide sa-draw"
        style={css({ "--delay": "0.5s" })}
      />
      <line
        x1="66"
        y1="76"
        x2="214"
        y2="224"
        pathLength="1"
        className="sa-guide sa-draw"
        style={css({ "--delay": "0.6s" })}
      />
      <line
        x1="214"
        y1="76"
        x2="66"
        y2="224"
        pathLength="1"
        className="sa-guide sa-draw"
        style={css({ "--delay": "0.7s" })}
      />

      {/* the mark */}
      <path
        d="M84 112 L114 194 L140 138 L166 194 L196 112"
        pathLength="1"
        className="sa-mark sa-draw"
        style={css({ "--delay": "1s" })}
      />
      {[
        [84, 112],
        [140, 138],
        [196, 112],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 4}
          y={y - 4}
          width="8"
          height="8"
          className="sa-anchor sa-pop"
          style={css({ "--delay": `${1.6 + i * 0.1}s` })}
        />
      ))}

      {/* palette */}
      {[
        { y: 62, c: "sa-accent-fill" },
        { y: 112, c: "sa-swatch-ink" },
        { y: 162, c: "sa-swatch-card" },
      ].map((s, i) => (
        <g key={s.y}>
          <rect
            x="282"
            y={s.y}
            width="36"
            height="36"
            rx="10"
            className={`${s.c} sa-pop`}
            style={css({ "--delay": `${2 + i * 0.15}s` })}
          />
          <rect
            x="328"
            y={s.y + 10}
            width="40"
            height="6"
            rx="3"
            className="sa-ink sa-grow-x"
            style={css({ "--delay": `${2.2 + i * 0.15}s` })}
          />
          <rect
            x="328"
            y={s.y + 22}
            width="26"
            height="5"
            rx="2.5"
            className="sa-ink-soft sa-grow-x"
            style={css({ "--delay": `${2.3 + i * 0.15}s` })}
          />
        </g>
      ))}
      <text
        x="280"
        y="262"
        className="sa-type-sample sa-fade"
        style={css({ "--delay": "2.6s" })}
      >
        Aa
      </text>
    </svg>
  );
}

/* 06 — Creative content: video with moving timeline, waveform, social like */
export function CreativeContentArt() {
  const wave = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 300" fill="none" className="sa-svg">
      {/* video */}
      <rect
        x="20"
        y="24"
        width="236"
        height="152"
        rx="14"
        className="sa-frame"
      />
      <rect
        x="20"
        y="24"
        width="236"
        height="152"
        rx="14"
        className="sa-accent-soft"
      />
      <g className="sa-play">
        <circle cx="138" cy="100" r="26" className="sa-accent-fill" />
        <path d="M131 88 L151 100 L131 112 Z" className="sa-play-icon" />
      </g>
      {/* timeline */}
      <rect
        x="20"
        y="192"
        width="236"
        height="6"
        rx="3"
        className="sa-ink-soft"
      />
      <rect
        x="20"
        y="192"
        width="236"
        height="6"
        rx="3"
        className="sa-accent-fill sa-progress"
      />
      <circle cx="20" cy="195" r="8" className="sa-playhead" />
      {/* waveform */}
      {wave.map((i) => (
        <rect
          key={i}
          x={22 + i * 14.6}
          y="222"
          width="7"
          height="48"
          rx="3.5"
          className={`${i % 3 === 0 ? "sa-accent-fill" : "sa-accent-soft-strong"} sa-wave`}
          style={css({ "--delay": `${(i % 5) * 0.12}s` })}
        />
      ))}

      {/* social post */}
      <rect
        x="274"
        y="24"
        width="106"
        height="252"
        rx="14"
        className="sa-frame"
      />
      <circle cx="298" cy="50" r="11" className="sa-accent-soft-strong" />
      <rect x="315" y="44" width="46" height="6" rx="3" className="sa-ink" />
      <rect
        x="315"
        y="55"
        width="30"
        height="5"
        rx="2.5"
        className="sa-ink-soft"
      />
      <rect
        x="286"
        y="74"
        width="82"
        height="96"
        rx="9"
        className="sa-accent-soft"
      />
      <rect x="286" y="184" width="70" height="6" rx="3" className="sa-ink" />
      <rect
        x="286"
        y="196"
        width="50"
        height="6"
        rx="3"
        className="sa-ink-soft"
      />
      <g className="sa-heart-wrap">
        <path
          d="M298 238 C 298 233, 291 231, 289 236 C 287 241, 298 248, 298 248 C 298 248, 309 241, 307 236 C 305 231, 298 233, 298 238 Z"
          className="sa-heart"
        />
      </g>
      <rect
        x="316"
        y="236"
        width="44"
        height="7"
        rx="3.5"
        className="sa-ink sa-grow-x"
        style={css({ "--delay": "2.2s" })}
      />
      <text x="292" y="226" className="sa-plus-one">
        +1
      </text>
    </svg>
  );
}

export const SERVICE_ART = [
  WebDesignArt,
  DigitalProductArt,
  DevelopmentArt,
  UiUxArt,
  BrandIdentityArt,
  CreativeContentArt,
];
