import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { goldCube } from '../../data/resumeData';
import SalesCube from './SalesCube';

// Values are in $K: show millions once they get large
const fmt = (v) => (v >= 1000 ? `$${(v / 1000).toFixed(2)}M` : `$${Math.round(v)}K`);

// Sum of every cell that matches a {axis: index} filter
const total = (sales, filter = {}) => {
  let sum = 0;
  sales.forEach((cats, y) => cats.forEach((countries, c) => countries.forEach((v, k) => {
    const p = [y, c, k];
    if (Object.entries(filter).every(([a, i]) => p[a] === i)) sum += v;
  })));
  return sum;
};

// Eases a number to its new value so KPI cards roll instead of jumping
function useTween(target, ms = 600) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let frame;
    const step = (now) => {
      const t = Math.min((now - start) / ms, 1);
      const v = a + (target - a) * (1 - Math.pow(1 - t, 3));
      from.current = v;
      setValue(v);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);
  return value;
}

function Kpi({ label, value, format = fmt, accent }) {
  const shown = useTween(value);
  return (
    <div className="rounded-lg bg-white border border-[#D9C9B7] px-3 py-2.5">
      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#174B79]/80">{label}</span>
      <span className={`block font-headline font-bold text-[15px] sm:text-xl tabular-nums ${accent ? 'text-[#E9784F]' : 'text-[#174B79]'}`}>
        {format(shown)}
      </span>
    </div>
  );
}

function Bars({ title, rows, max }) {
  return (
    <div className="rounded-lg bg-white border border-[#D9C9B7] p-3">
      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#174B79]/80 mb-2">{title}</span>
      <ul className="space-y-1.5">
        {rows.map(({ name, v }) => (
          <li key={name} className="grid grid-cols-[84px_1fr_64px] items-center gap-2 font-mono text-[11px] text-[#174B79]">
            <span className="truncate">{name}</span>
            <span className="h-3 rounded-sm bg-[#F5F0E8] overflow-hidden">
              <span
                className="block h-full rounded-sm bg-[#24699A]"
                style={{ width: `${(v / max) * 100}%`, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }}
              />
            </span>
            <span className="text-right tabular-nums">{fmt(v)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Columns({ title, rows, max }) {
  return (
    <div className="rounded-lg bg-white border border-[#D9C9B7] p-3 flex flex-col">
      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#174B79]/80 mb-2">{title}</span>
      <div className="flex-1 min-h-[96px] flex items-end gap-2">
        {rows.map(({ name, v }) => (
          <div key={name} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
            <span
              className="w-full max-w-[34px] rounded-t-sm bg-[#E9784F]"
              style={{ height: `${Math.max(3, (v / max) * 100)}%`, transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)' }}
              title={fmt(v)}
            />
            <span className="font-mono text-[10px] text-[#174B79]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// "What the Gold layer feeds": the cube and a report page share one filter.
// Pick a slicer value (or click a slice of the cube) and both update together.
export default function GoldExplorer() {
  const { axes, sales, sample, source, query } = goldCube;
  const [axis, setAxis] = useState(-1);
  const [slice, setSlice] = useState(null);
  const [hover, setHover] = useState(null);
  const [view, setView] = useState('cube'); // phones show one panel at a time

  const filter = axis >= 0 && slice !== null ? { [axis]: slice } : {};
  const grand = useMemo(() => total(sales), [sales]);
  const current = total(sales, filter);

  // Bars break down by category (or country when category is the filter);
  // columns trend by year (or country when year is the filter)
  const barAxis = axis === 1 ? 2 : 1;
  const colAxis = axis === 0 ? 2 : 0;
  const breakdown = (a) => axes[a].values.map((name, i) => ({ name, v: total(sales, { ...filter, [a]: i }) }));
  const bars = breakdown(barAxis);
  const cols = breakdown(colAxis);
  const top = [...bars].sort((x, y) => y.v - x.v)[0];

  const choose = (a, i) => {
    if (axis === a && slice === i) { setSlice(null); return; }
    setAxis(a);
    setSlice(i);
  };
  const cutBy = (a) => { setAxis(a); setSlice(null); };

  const hoverText = hover
    ? `${hover.p.map((i, a) => axes[a].values[i]).join(' · ')}: ${hover.v > 0 ? fmt(hover.v) : 'no sales'}`
    : axis < 0
      ? 'Drag to turn the cube. Cut it open by an axis below.'
      : `Cut by ${axes[axis].name.toLowerCase()}. Click a slice, or pick it on the right.`;

  return (
    <div id="gold-explorer" className="mb-6 scroll-mt-28">
      <span className="font-mono text-[11px] uppercase tracking-wider font-bold block mb-1.5 text-[#174B79]/80">
        The sales data, explored
      </span>

      <div className="rounded-2xl border border-[#D9C9B7] bg-[#F5F0E8]/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Phone tabs: 3D cube or the report page */}
        <div className="lg:hidden flex border-b border-[#D9C9B7]" role="tablist">
          {[['cube', '3D cube'], ['report', 'Dashboard']].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={view === key}
              onClick={() => setView(key)}
              className={`flex-1 py-2.5 font-mono text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E9784F] ${
                view === key ? 'bg-[#174B79] text-[#F5F0E8]' : 'text-[#174B79]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cube */}
        <div className={`${view === 'cube' ? 'flex' : 'hidden'} lg:flex lg:col-span-5 lg:border-r border-[#D9C9B7] flex-col`}>
          <SalesCube
            sales={sales}
            axis={axis}
            slice={slice}
            onPick={(i) => setSlice(slice === i ? null : i)}
            onHover={setHover}
          />
          <p className="px-4 font-mono text-[11px] text-[#174B79] min-h-[2.5em]" aria-live="polite">{hoverText}</p>
          <div className="px-4 pb-4 pt-1 flex flex-wrap gap-1.5">
            {[-1, 0, 1, 2].map((a) => (
              <button
                key={a}
                onClick={() => cutBy(a)}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] ${
                  axis === a ? 'bg-[#174B79] border-[#174B79] text-[#F5F0E8]' : 'bg-white border-[#D9C9B7] text-[#174B79] hover:border-[#174B79]'
                }`}
              >
                {a < 0 ? 'Whole cube' : `By ${axes[a].name.toLowerCase()}`}
              </button>
            ))}
          </div>
        </div>

        {/* Report page */}
        <div className={`${view === 'report' ? 'flex' : 'hidden'} lg:flex lg:col-span-7 p-4 flex-col gap-3`}>
          <div className="flex items-center justify-between gap-2">
            <span className="font-headline font-bold text-[#174B79]">Sales overview</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${
              sample ? 'bg-[#FFE6DB] text-[#9A3A17]' : 'bg-[#E3F0E6] text-[#1F5E33]'
            }`}>
              <Info className="w-3 h-3" aria-hidden="true" />
              {sample ? 'Sample data' : 'Real project data'}
            </span>
          </div>

          {/* Slicers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {axes.map((ax, a) => (
              <div key={ax.name}>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#174B79]/80 mb-1">{ax.name}</span>
                <div className="flex flex-wrap gap-1">
                  {ax.values.map((val, i) => {
                    const on = axis === a && slice === i;
                    return (
                      <button
                        key={val}
                        onClick={() => choose(a, i)}
                        aria-pressed={on}
                        className={`px-2 py-0.5 rounded font-mono text-[11px] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] ${
                          on ? 'bg-[#E9784F] border-[#E9784F] text-white' : 'bg-white border-[#D9C9B7] text-[#174B79] hover:border-[#174B79]'
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Kpi label="Sales" value={current} />
            <Kpi label="Share of total" value={(current / grand) * 100} format={(v) => `${v.toFixed(1)}%`} accent />
            <div className="rounded-lg bg-white border border-[#D9C9B7] px-3 py-2.5">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#174B79]/80">Top {axes[barAxis].name.toLowerCase()}</span>
              <span className="block font-headline font-bold text-[15px] sm:text-xl text-[#174B79] truncate">{top.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
            <Bars title={`Sales by ${axes[barAxis].name.toLowerCase()}`} rows={bars} max={Math.max(...bars.map((r) => r.v))} />
            <Columns title={`Sales by ${axes[colAxis].name.toLowerCase()}`} rows={cols} max={Math.max(...cols.map((r) => r.v))} />
          </div>

          {source && <p className="font-body text-xs text-[#174B79]/80 leading-relaxed">{source}</p>}

          <details className="group rounded-lg border border-[#D9C9B7] bg-white">
            <summary className="flex items-center justify-between cursor-pointer list-none px-3 py-2 font-mono text-[11px] uppercase tracking-wider font-bold text-[#174B79] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] rounded-lg">
              The SQL behind it
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <pre className="px-3 pb-3 font-mono text-[11px] leading-relaxed text-[#174B79] overflow-x-auto"><code>{query}</code></pre>
          </details>
        </div>
      </div>
    </div>
  );
}
