function _I({
  d,
  size = 20,
  viewBox = "0 0 24 24",
  stroke,
  fill = "currentColor",
  strokeWidth = 2,
  ...p
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={stroke ? "none" : fill}
      stroke={stroke || "none"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      {Array.isArray(d) ? d.map((dd, i) => <path key={i} d={dd} />) : <path d={d} />}
    </svg>
  );
}

export const I = {
  zap: (p) => <_I d="M13 2 4 14h6l-1 8 10-12h-7l1-8z" {...p} />,
  slash: (p) => <_I d={["M4 6h4l3 12H7zM14 6h4l3 12h-4z"]} {...p} />,
  nodes: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M7 11l10-4M7 13l10 4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  gear: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2l1.5 3 3.3-.6.6 3.3 3 1.5-1.5 3 1.5 3-3 1.5-.6 3.3-3.3-.6L12 22l-1.5-3-3.3.6-.6-3.3-3-1.5L5.1 11.7 3.6 8.7l3-1.5.6-3.3 3.3.6L12 2zM12 9a3 3 0 100 6 3 3 0 000-6z"
      />
    </svg>
  ),
  agents: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="5" r="2.2" />
      <circle cx="20" cy="5" r="2.2" />
      <circle cx="4" cy="19" r="2.2" />
      <circle cx="20" cy="19" r="2.2" />
      <path
        d="M6 6l4 4m8-4l-4 4m-8 8l4-4m8 4l-4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  ),
  play: (p) => <_I d="M6 4l14 8-14 8V4z" {...p} />,
  pause: (p) => <_I d={["M6 4h4v16H6z", "M14 4h4v16h-4z"]} {...p} />,
  check: (p) => <_I stroke="currentColor" d="M5 12l4.5 4.5L20 6" fill="none" {...p} />,
  lock: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6 11h12v10H6z" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  star: (p) => (
    <_I d="M12 2l2.9 6.4 7 .6-5.3 4.6 1.6 6.8L12 17l-6.2 3.4 1.6-6.8L2.1 9l7-.6L12 2z" {...p} />
  ),
  heart: (p) => (
    <_I d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" {...p} />
  ),
  flame: (p) => (
    <_I d="M12 2c1 4 5 5 5 10a5 5 0 11-10 0c0-2 1-3 1-5 0-1-1-2-1-2s2 1 3 0c1-1 2-3 2-3z" {...p} />
  ),
  trophy: ({ size = 20, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6 4h12v6a6 6 0 11-12 0V4z" />
      <path d="M4 6h2v4H4zM18 6h2v4h-2z" />
      <path d="M9 16h6l1 4H8z" />
    </svg>
  ),
  sword: (p) => (
    <_I
      stroke="currentColor"
      fill="none"
      d="M14 4l6 0 0 6-9 9-4-4 9-9 0 0M10 14l-5 5M7 17l-2 2-2-2 2-2"
      strokeWidth="1.8"
      {...p}
    />
  ),
  shield: (p) => <_I d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" {...p} />,
  send: (p) => <_I d="M3 11l18-8-6 18-3-7-9-3z" {...p} />,
  arrowR: (p) => (
    <_I stroke="currentColor" fill="none" d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" {...p} />
  ),
  arrowL: (p) => (
    <_I stroke="currentColor" fill="none" d="M19 12H5M11 18l-6-6 6-6" strokeWidth="2" {...p} />
  ),
  sparkle: (p) => (
    <_I
      d="M12 2l1.5 6 6 1.5-6 1.5L12 17l-1.5-6-6-1.5 6-1.5L12 2zM19 16l.7 2.3 2.3.7-2.3.7L19 22l-.7-2.3-2.3-.7 2.3-.7L19 16z"
      {...p}
    />
  ),
  clock: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  bolt: (p) => <_I d="M11 2L4 13h6l-2 9 10-13h-6l2-7z" {...p} />,
  terminal: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M12 15h5" />
    </svg>
  ),
  close: (p) => (
    <_I stroke="currentColor" fill="none" d="M6 6l12 12M18 6L6 18" strokeWidth="2" {...p} />
  ),
  plus: (p) => (
    <_I stroke="currentColor" fill="none" d="M12 5v14M5 12h14" strokeWidth="2" {...p} />
  ),
  eye: (p) => (
    <_I
      stroke="currentColor"
      fill="none"
      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 100 6 3 3 0 000-6z"
      strokeWidth="1.8"
      {...p}
    />
  ),
  sun: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </svg>
  ),
  moon: (p) => <_I d="M21 13a9 9 0 11-10-10 7 7 0 0010 10z" {...p} />,
  cog: (p) => (
    <_I
      d="M12 2l1.5 3 3.3-.6.6 3.3 3 1.5-1.5 3 1.5 3-3 1.5-.6 3.3-3.3-.6L12 22l-1.5-3-3.3.6-.6-3.3-3-1.5L5.1 11.7 3.6 8.7l3-1.5.6-3.3 3.3.6L12 2z"
      {...p}
    />
  ),
  chevron: (p) => (
    <_I stroke="currentColor" fill="none" d="M9 6l6 6-6 6" strokeWidth="2" {...p} />
  ),
  doc: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </svg>
  ),
  monitor: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  branch: ({ size = 20, ...p }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 7v10M6 12c0-3 4-5 9-5h1" />
    </svg>
  ),
};

export const moduleIcons = {
  m1: "monitor",
  m2: "terminal",
  m3: "branch",
  m4: "sparkle",
  m5: "play",
  m6: "slash",
  m7: "bolt",
  m8: "doc",
  m9: "eye",
  m10: "gear",
  m11: "agents",
  m12: "trophy",
};

export function PixelChar({ grid, palette, size = 64 }) {
  const w = grid[0].length;
  const h = grid.length;
  const rects = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ch = grid[y][x];
      if (palette[ch]) {
        rects.push(
          <rect key={`${x},${y}`} x={x} y={y} width="1" height="1" fill={palette[ch]} />
        );
      }
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
      {rects}
    </svg>
  );
}
