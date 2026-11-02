import React, { useEffect, useRef } from 'react';

// Fixed "messy" record positions for the Bronze layer (deterministic, so it doesn't jump between renders)
const RAW_ROWS = [
  [22, 30, 46], [92, 22, 30], [150, 40, 54], [30, 70, 38], [104, 64, 58], [176, 80, 34],
  [18, 112, 54], [86, 118, 26], [128, 104, 44], [190, 120, 30], [40, 156, 30], [96, 150, 50],
  [160, 160, 46], [24, 196, 42], [82, 192, 34], [132, 200, 56], [198, 188, 24],
];

const PACKETS = [
  { x: 28, y: 34, delay: 0 },
  { x: 62, y: 70, delay: 0.9 },
  { x: 40, y: 58, delay: 1.7 },
  { x: 72, y: 30, delay: 2.4 },
  { x: 50, y: 46, delay: 3.2 },
];

function BronzeLayer() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      {RAW_ROWS.map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height="7" rx="3.5" fill="#B8643A" opacity={0.45 + (i % 3) * 0.18} transform={`rotate(${(i % 5) - 2} ${x} ${y})`} />
      ))}
    </svg>
  );
}

function SilverLayer() {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      {[0, 1, 2, 3, 4, 5, 6].map((r) => (
        <g key={r}>
          <rect x="26" y={30 + r * 27} width="40" height="8" rx="4" fill="#5E7A93" opacity="0.8" />
          <rect x="74" y={30 + r * 27} width="64" height="8" rx="4" fill="#5E7A93" opacity="0.55" />
          <rect x="146" y={30 + r * 27} width="68" height="8" rx="4" fill="#5E7A93" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

function GoldLayer() {
  const dims = [[40, 40], [200, 40], [40, 200], [200, 200]];
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      {dims.map(([x, y]) => (
        <line key={`${x}-${y}`} x1="120" y1="120" x2={x} y2={y} stroke="#A9781F" strokeWidth="2.5" strokeDasharray="5 4" />
      ))}
      {dims.map(([x, y]) => (
        <rect key={`d-${x}-${y}`} x={x - 22} y={y - 15} width="44" height="30" rx="6" fill="#F6DFA6" stroke="#A9781F" strokeWidth="2" />
      ))}
      <rect x="82" y="96" width="76" height="48" rx="8" fill="#E9B653" stroke="#8C6216" strokeWidth="2.5" />
      <text x="120" y="126" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="15" fontWeight="700" fill="#5A3E0A">FACT</text>
    </svg>
  );
}

const LAYERS = [
  { name: 'Bronze', sub: 'raw', Content: BronzeLayer, fill: 'rgba(233, 150, 100, 0.20)', border: '#C9774A' },
  { name: 'Silver', sub: 'cleaned', Content: SilverLayer, fill: 'rgba(160, 182, 202, 0.24)', border: '#7F98AE' },
  { name: 'Gold', sub: 'star schema', Content: GoldLayer, fill: 'rgba(240, 200, 110, 0.26)', border: '#C7962F' },
];

const BASE_RX = 58;
const BASE_RZ = -38;
const GAP = 78;

// CSS-3D medallion stack: sways gently, tilts toward the cursor, and drops data packets through the layers
export default function MedallionStack() {
  const sceneRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stack.style.setProperty('--rx', `${BASE_RX}deg`);
    stack.style.setProperty('--rz', `${BASE_RZ}deg`);
    if (reduced) return;

    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let raf = null;
    let inView = true;

    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = (t) => {
      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;
      const rz = BASE_RZ + Math.sin(t / 2600) * 9 + eased.x * 16;
      const rx = BASE_RX - eased.y * 8;
      stack.style.setProperty('--rz', `${rz}deg`);
      stack.style.setProperty('--rx', `${rx}deg`);
      raf = inView ? requestAnimationFrame(tick) : null;
    };

    // Only animate while the hero is on screen
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !raf) raf = requestAnimationFrame(tick);
    });
    observer.observe(sceneRef.current);

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure ref={sceneRef} className="medallion-scene relative w-full select-none" aria-label="Bronze, Silver and Gold layers of a medallion data warehouse">
      <div className="relative mx-auto" style={{ width: 240, height: 420, perspective: '1100px' }}>
        <div
          ref={stackRef}
          className="medallion-stack absolute left-0 w-[240px] h-[240px]"
          style={{ top: 120 }}
        >
          {LAYERS.map(({ name, sub, Content, fill, border }, i) => (
            <div
              key={name}
              className="medallion-plate absolute inset-0 rounded-[22px]"
              style={{
                transform: `translateZ(${i * GAP}px)`,
                background: fill,
                border: `1.5px solid ${border}`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.35) inset, 0 18px 40px -18px ${border}`,
              }}
            >
              <Content />
            </div>
          ))}

          {PACKETS.map((p, i) => (
            <span
              key={i}
              className="medallion-packet absolute w-2.5 h-2.5 rounded-full bg-[#E9784F]"
              style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s`, '--top': `${GAP * 2 + 120}px` }}
            />
          ))}
        </div>

      </div>
      {/* Flat legend, readable at any angle */}
      <figcaption className="-mt-4 flex flex-col items-center gap-1.5">
        <ul className="flex items-center gap-2.5 font-mono text-xs whitespace-nowrap">
          {LAYERS.map(({ name, sub, border }, i) => (
            <li key={name} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[#174B79]/50 mr-1" aria-hidden="true">→</span>}
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: border }} />
              <span className="font-bold uppercase tracking-[0.12em]" style={{ color: border }}>{name}</span>
              <span className="text-[#174B79]">{sub}</span>
            </li>
          ))}
        </ul>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#174B79]/80">Move your cursor to tilt</span>
      </figcaption>
    </figure>
  );
}
