import React, { useEffect, useMemo, useRef } from 'react';

const CELL = 36;
const GAP = 4;
const SPREAD = 30; // extra space between slices when the cube is cut open
const RAMP = ['#FBE3D8', '#F5B89E', '#E9784F', '#24699A', '#174B79'];
const FACES = [
  'rotateY(0deg)', 'rotateY(180deg)', 'rotateY(90deg)',
  'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)',
];

// 4×4×4 CSS-3D cube: one small cube per year × category × country, coloured by sales.
// Spins on its own while on screen; drag (or swipe sideways) to turn it.
export default function SalesCube({ sales, axis, slice, onPick, onHover }) {
  const stageRef = useRef(null);
  const cubeRef = useRef(null);

  const cells = useMemo(() => {
    const flat = sales.flat(2);
    const sorted = [...flat].sort((a, b) => a - b);
    const bucket = (v) => Math.min(4, Math.floor((sorted.indexOf(v) / flat.length) * 5));
    const out = [];
    sales.forEach((cats, y) => cats.forEach((countries, c) => countries.forEach((v, k) => {
      out.push({ p: [y, c, k], v, color: RAMP[bucket(v)] });
    })));
    return out;
  }, [sales]);

  // Rotation lives outside React state so it can run every frame
  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rot = { x: -22, y: 36 };
    let drag = null;
    let idleUntil = 0;
    let inView = false;
    let frame;

    const draw = () => { cube.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`; };
    const tick = () => {
      if (!drag && !reduced && performance.now() > idleUntil) rot.y += 0.15;
      draw();
      frame = inView ? requestAnimationFrame(tick) : null;
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(stage);

    const down = (e) => { drag = { x: e.clientX, y: e.clientY, moved: false }; };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 4) return;
      if (!drag.moved) stage.setPointerCapture(e.pointerId);
      drag.moved = true;
      rot.y += dx * 0.5;
      rot.x = Math.max(-80, Math.min(80, rot.x - dy * 0.5));
      drag.x = e.clientX;
      drag.y = e.clientY;
      draw();
    };
    const up = () => { if (drag?.moved) idleUntil = performance.now() + 2500; drag = null; };

    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    draw();
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  const offset = (i, c) => {
    const centred = c - 1.5;
    return centred * (CELL + GAP) + (i === axis ? centred * SPREAD : 0);
  };

  return (
    <div
      ref={stageRef}
      className="relative h-[300px] sm:h-[340px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '1000px', touchAction: 'pan-y' }}
      onPointerLeave={() => onHover(null)}
      role="img"
      aria-label="3D cube of sales by year, product category and country"
    >
      <div ref={cubeRef} className="relative w-0 h-0" style={{ transformStyle: 'preserve-3d' }}>
        {cells.map(({ p, v, color }) => {
          const dimmed = axis >= 0 && slice !== null && p[axis] !== slice;
          return (
            <div
              key={p.join()}
              className="absolute"
              onPointerEnter={() => onHover({ p, v })}
              onClick={() => axis >= 0 && onPick(p[axis])}
              style={{
                width: CELL, height: CELL,
                transformStyle: 'preserve-3d',
                transform: `translate3d(${offset(0, p[0]) - CELL / 2}px, ${offset(1, p[1]) - CELL / 2}px, ${offset(2, p[2])}px)`,
                opacity: dimmed ? 0.15 : 1,
                transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.4s',
              }}
            >
              {FACES.map((f) => (
                <i
                  key={f}
                  className="absolute inset-0 border border-[#174B79]/30"
                  style={{ background: color, transform: `${f} translateZ(${CELL / 2}px)`, backfaceVisibility: 'hidden' }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
