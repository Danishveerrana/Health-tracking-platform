import { useState, useEffect, useMemo, useRef, useCallback } from "react";

// ─── SVG ICON LIBRARY ────────────────────────────────────────────────────────
const Icons = {
  Water: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z"/>
    </svg>
  ),
  Run: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="1.5"/><path d="M8 17l2-5 3 2 2-5"/><path d="M6 12l2-3 4 1 3-3"/>
      <path d="M15 21l-1-4-3-1 1-3"/>
    </svg>
  ),
  Sleep: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Meditate: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><path d="M5 20c0-4 3-7 7-7s7 3 7 7"/><path d="M3 17h4m10 0h4"/>
    </svg>
  ),
  Leaf: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13c0-7 7-11 7-11s7 4 7 11a7 7 0 0 1-7 7z"/><path d="M11 20V9"/>
    </svg>
  ),
  NoSugar: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M4.93 4.93l14.14 14.14"/>
    </svg>
  ),
  Book: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Steps: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l4-4 4 4 4-8 4 4"/><path d="M4 20h16"/>
    </svg>
  ),
  Target: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Check: () => (
    <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="#0F1117" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: () => (
    <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
      <path d="M2 2L9 9M9 2L2 9" stroke="#0F1117" strokeWidth={2.2} strokeLinecap="round"/>
    </svg>
  ),
  Plus: () => (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M7 2v10M2 7h10"/>
    </svg>
  ),
  Trash: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  Edit: () => (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Flame: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.19-.8-2.3-1.5-3.5-1 1.5-1 2.5-1.5 2.5-.5 0-.5-.5-1-1.5C9 13 8.5 13.7 8.5 14.5z"/>
      <path d="M17 8c0 5-3 9-5 9S7 13 7 8c0-2 1-4 3-5-1 3 1 5 2 5s2-3 0-6c3 1 5 4 5 6z"/>
    </svg>
  ),
  Chart: () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Calendar: () => (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Tip: () => (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  TrendDown: () => (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
};

const ICON_MAP = {
  water: Icons.Water, exercise: Icons.Run, sleep: Icons.Sleep, meditation: Icons.Meditate,
  veggies: Icons.Leaf, noSugar: Icons.NoSugar, reading: Icons.Book, steps: Icons.Steps,
};
function getHabitIcon(habit) {
  const Ic = ICON_MAP[habit.id] || Icons.Target;
  return <Ic />;
}

const ICON_PICKER_OPTIONS = [
  { key: "water", Ic: Icons.Water }, { key: "exercise", Ic: Icons.Run },
  { key: "sleep", Ic: Icons.Sleep }, { key: "meditation", Ic: Icons.Meditate },
  { key: "veggies", Ic: Icons.Leaf }, { key: "noSugar", Ic: Icons.NoSugar },
  { key: "reading", Ic: Icons.Book }, { key: "steps", Ic: Icons.Steps },
  { key: "target", Ic: Icons.Target }, { key: "flame", Ic: Icons.Flame },
  { key: "chart", Ic: Icons.Chart }, { key: "calendar", Ic: Icons.Calendar },
];

const DEFAULT_HABITS = [
  { id: "water",     label: "Drink 8 glasses of water", iconKey: "water" },
  { id: "exercise",  label: "30 min exercise",           iconKey: "exercise" },
  { id: "sleep",     label: "8 hours sleep",             iconKey: "sleep" },
  { id: "meditation",label: "10 min meditation",         iconKey: "meditation" },
  { id: "veggies",   label: "Eat vegetables",            iconKey: "veggies" },
  { id: "noSugar",   label: "Avoid sugar",               iconKey: "noSugar" },
  { id: "reading",   label: "Read 20 minutes",           iconKey: "reading" },
  { id: "steps",     label: "10,000 steps",              iconKey: "steps" },
];

const TIPS = [
  "Start your morning with a full glass of water before coffee.",
  "A 10-minute walk after meals improves digestion.",
  "Sleep and nutrition are the most underrated performance tools.",
  "Consistency beats intensity — small daily habits compound.",
  "Breathing deeply for 2 minutes lowers cortisol measurably.",
  "Eating slowly reduces caloric intake by up to 20%.",
  "Morning sunlight anchors your circadian rhythm.",
  "Cold water on your face triggers the dive reflex — instant calm.",
  "Fiber intake directly improves gut microbiome diversity.",
  "Your worst day is still data. Log it honestly.",
  "Hydration improves focus more than most productivity hacks.",
  "Movement is non-negotiable — even 5 minutes counts.",
  "Rest is not laziness. Recovery is where strength is built.",
  "Social connection is a health metric too.",
];

const STATUS = { DONE: "done", NOT_DONE: "not_done", EMPTY: "empty" };
const C = { bg: "#0B0D14", card: "#12141F", border: "#1C2033", muted: "#3A4060", text: "#E2E8F0", dim: "#64748B", accent: "#6C63FF", green: "#22D3A5", red: "#F0506E", amber: "#F59E0B", pink: "#EC4899" };

function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getDayTip() {
  const d = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TIPS[d % TIPS.length];
}
function getThisMonthDays() {
  const now = new Date(); const year = now.getFullYear(); const month = now.getMonth();
  const n = new Date(year, month + 1, 0).getDate(); const days = [];
  for (let d = 1; d <= n; d++) { const date = new Date(year, month, d); days.push({ key: date.toISOString().split("T")[0], day: d, dow: date.getDay() }); }
  return days;
}
function calcDayScore(dayData) {
  if (!dayData) return null;
  const vals = Object.values(dayData);
  if (vals.every(v => v === STATUS.EMPTY)) return null;
  const done = vals.filter(v => v === STATUS.DONE).length;
  const total = vals.filter(v => v !== STATUS.EMPTY).length;
  return total === 0 ? null : Math.round((done / total) * 100);
}
function genId() { return "h_" + Math.random().toString(36).slice(2, 9); }

// ─── SPARKLINE ───────────────────────────────────────────────────────────────
function Sparkline({ data, color, height = 36, width = 120 }) {
  const vals = data.filter(v => v !== null);
  if (vals.length < 2) return <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: C.muted }}>No data</span></div>;
  const min = 0; const max = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = v === null ? null : height - ((v - min) / (max - min)) * height;
    return { x, y };
  }).filter(p => p.y !== null);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length-1].x},${height} L${pts[0].x},${height} Z`;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg_${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg_${color.replace("#","")})`}/>
      <path d={path} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {pts[pts.length-1] && <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r={3} fill={color}/>}
    </svg>
  );
}

// ─── BAR CHART ───────────────────────────────────────────────────────────────
function BarChart({ data, labels, color, height = 60, width = "100%" }) {
  const max = 100;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height, width }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: v !== null ? `${(v / max) * 100}%` : "3px", background: v !== null ? color : C.border, borderRadius: "2px 2px 0 0", minHeight: v !== null ? 2 : 2, opacity: v !== null ? 1 : 0.4, transition: "height 0.4s" }}/>
          </div>
          {labels && <div style={{ fontSize: 8, color: C.muted, whiteSpace: "nowrap" }}>{labels[i]}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── RING ────────────────────────────────────────────────────────────────────
function Ring({ value, max, color, size = 64, stroke = 5, children }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }}/>
      {children}
    </svg>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionLabel({ children, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{children}</span>
      {right && <span style={{ fontSize: 10, color: C.muted }}>{right}</span>}
    </div>
  );
}

// ─── STAT CELL ───────────────────────────────────────────────────────────────
function StatCell({ label, value, sub, color, trend }) {
  return (
    <div style={{ flex: 1, padding: "12px 14px", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: color || C.text, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {(sub || trend !== undefined) && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {trend !== undefined && (
            <span style={{ color: trend >= 0 ? C.green : C.red, display: "flex", alignItems: "center" }}>
              {trend >= 0 ? <Icons.TrendUp /> : <Icons.TrendDown />}
            </span>
          )}
          {sub && <span style={{ fontSize: 10, color: C.muted }}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD SLIDE 1 ───────────────────────────────────────────────────────
function DashSlide1({ stats, tip }) {
  return (
    <div style={{ width: "100%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Stat row */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        <StatCell label="Today" value={`${stats.todayScore}%`} color={stats.todayScore >= 80 ? C.green : stats.todayScore >= 50 ? C.amber : C.red} sub={`${stats.done}/${stats.total} done`} trend={stats.todayScore - stats.avgScore} />
        <StatCell label="Streak" value={stats.streak} color={C.amber} sub="days" />
        <StatCell label="Avg" value={`${stats.avgScore}%`} color={C.accent} sub="this month" />
        <div style={{ width: 14 }} />
      </div>
      {/* Progress bars */}
      <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Today", val: stats.todayScore, color: C.accent },
          { label: "Month avg", val: stats.avgScore, color: C.green },
          { label: "Days logged", val: Math.round((stats.totalDaysLogged / 30) * 100), color: C.amber },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 64, fontSize: 10, color: C.muted, flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 0 }}>
              <div style={{ height: "100%", width: `${Math.min(val, 100)}%`, background: color, transition: "width 0.6s" }} />
            </div>
            <div style={{ width: 32, fontSize: 11, color, fontWeight: 700, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{val}%</div>
          </div>
        ))}
      </div>
      {/* Tip */}
      <div style={{ padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ color: C.green, flexShrink: 0, marginTop: 1 }}><Icons.Tip /></div>
        <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.55 }}><span style={{ color: C.green, fontWeight: 600 }}>Today · </span>{tip}</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD SLIDE 2 ───────────────────────────────────────────────────────
function DashSlide2({ monthDays, allData, stats }) {
  const last7 = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today); d.setDate(d.getDate() - (6 - i));
      const k = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2);
      return { score: calcDayScore(allData[k]), label };
    });
  }, [allData]);

  const monthScores = useMemo(() => monthDays.map(d => calcDayScore(allData[d.key])), [monthDays, allData]);
  const weekScores = last7.map(d => d.score);
  const weekLabels = last7.map(d => d.label);

  const bestDay = useMemo(() => {
    let best = null; let bestScore = -1;
    monthDays.forEach(d => { const s = calcDayScore(allData[d.key]); if (s !== null && s > bestScore) { bestScore = s; best = d; } });
    return best ? { score: bestScore, label: new Date(best.key + "T00:00").toLocaleDateString("en", { weekday: "short", day: "numeric" }) } : null;
  }, [allData, monthDays]);

  return (
    <div style={{ width: "100%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Top row: sparkline + best day */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ flex: 1, padding: "12px 14px", borderRight: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>Month trend</div>
          <Sparkline data={monthScores} color={C.accent} height={38} width={130} />
        </div>
        <div style={{ flex: 1, padding: "12px 14px", borderRight: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 6 }}>Best day</div>
          {bestDay ? <>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.green, lineHeight: 1 }}>{bestDay.score}%</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{bestDay.label}</div>
          </> : <div style={{ fontSize: 11, color: C.muted }}>No data</div>}
        </div>
        <div style={{ flex: 1, padding: "12px 14px" }}>
          <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 6 }}>Logged</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.amber, lineHeight: 1 }}>{stats.totalDaysLogged}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>days total</div>
        </div>
      </div>
      {/* Bar chart: last 7 days */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 10 }}>Last 7 days</div>
        <BarChart data={weekScores} labels={weekLabels} color={C.green} height={52} />
      </div>
      {/* Ring stats row */}
      <div style={{ display: "flex", padding: "12px 16px", gap: 16, alignItems: "center" }}>
        {[
          { val: stats.streak, max: 30, color: C.amber, label: "Streak", unit: "d" },
          { val: stats.avgScore, max: 100, color: C.accent, label: "Avg", unit: "%" },
          { val: stats.done, max: Math.max(stats.total, 1), color: C.pink, label: "Done", unit: "" },
        ].map(({ val, max, color, label, unit }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <Ring value={val} max={max} color={color} size={52} stroke={4}>
              <text x={26} y={31} textAnchor="middle" fill={C.text} fontSize={11} fontWeight={800} fontFamily="Inter">{val}{unit}</text>
            </Ring>
            <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOOPING CAROUSEL ────────────────────────────────────────────────────────
function DashboardCarousel({ stats, tip, monthDays, allData }) {
  const [slide, setSlide] = useState(0);
  const TOTAL = 2;
  return (
    <div style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
      {/* Slide header tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {[
          { icon: <Icons.Chart />, label: "Overview" },
          { icon: <Icons.TrendUp />, label: "Analytics" },
        ].map((tab, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px 0", background: "none", border: "none", borderBottom: `2px solid ${slide === i ? C.accent : "transparent"}`,
            color: slide === i ? C.text : C.muted, fontSize: 11, fontWeight: slide === i ? 700 : 500,
            cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s",
          }}>
            <span style={{ opacity: slide === i ? 1 : 0.5 }}>{tab.icon}</span>{tab.label}
          </button>
        ))}
        {/* Dot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 14px" }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 16 : 5, height: 5, borderRadius: 99, background: i === slide ? C.accent : C.border, transition: "all 0.2s", cursor: "pointer" }}/>
          ))}
        </div>
      </div>
      {/* Slides viewport */}
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", transform: `translateX(-${slide * 100}%)`, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
          <DashSlide1 stats={stats} tip={tip} />
          <DashSlide2 monthDays={monthDays} allData={allData} stats={stats} />
        </div>
      </div>
    </div>
  );
}

// ─── ADD HABIT MODAL ─────────────────────────────────────────────────────────
function AddHabitModal({ onAdd, onClose }) {
  const [label, setLabel] = useState("");
  const [iconKey, setIconKey] = useState("target");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const submit = () => {
    const t = label.trim();
    if (!t) return;
    onAdd({ id: genId(), label: t, iconKey });
    onClose();
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#00000099", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 600, background: C.card, borderTop: `1px solid ${C.border}`, borderRadius: "0", padding: "0 0 32px" }}>
        <style>{`@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
        <div style={{ animation: "slideUp 0.22s ease" }}>
          {/* Modal header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>New Habit</span>
            <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>✕</button>
          </div>
          {/* Icon picker */}
          <div style={{ borderBottom: `1px solid ${C.border}`, padding: "12px 16px" }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Icon</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ICON_PICKER_OPTIONS.map(({ key, Ic }) => (
                <button key={key} onClick={() => setIconKey(key)} style={{ width: 36, height: 36, background: iconKey === key ? `${C.accent}22` : C.bg, border: `1px solid ${iconKey === key ? C.accent : C.border}`, borderRadius: 0, color: iconKey === key ? C.accent : C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s" }}>
                  <Ic />
                </button>
              ))}
            </div>
          </div>
          {/* Label */}
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Label</div>
            <input ref={inputRef} value={label} onChange={e => setLabel(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="e.g. No screens after 10 PM"
              style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 0, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}
            />
          </div>
          {/* Submit */}
          <div style={{ padding: "12px 16px" }}>
            <button onClick={submit} disabled={!label.trim()} style={{ width: "100%", padding: "12px", border: "none", borderRadius: 0, background: label.trim() ? C.accent : C.border, color: label.trim() ? "#fff" : C.muted, fontSize: 13, fontWeight: 700, cursor: label.trim() ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}>
              ADD HABIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────
function DeleteModal({ habit, onConfirm, onClose }) {
  const Ic = ICON_MAP[habit.iconKey] || Icons.Target;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#00000099", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 0, maxWidth: 320, width: "100%" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Delete habit</span>
        </div>
        <div style={{ padding: "20px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, background: `${C.red}15`, border: `1px solid ${C.red}33`, display: "flex", alignItems: "center", justifyContent: "center", color: C.red }}>
              <Ic />
            </div>
            <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{habit.label}</span>
          </div>
          <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.55 }}>This habit will be removed from future tracking. Past log data is preserved.</p>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", background: "none", border: "none", borderRight: `1px solid ${C.border}`, color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "12px", background: C.red, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em" }}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

// ─── HEATMAP ─────────────────────────────────────────────────────────────────
function Heatmap({ monthDays, allData, todayKey }) {
  const firstDow = monthDays[0]?.dow || 0;
  const grid = [...Array(firstDow).fill(null), ...monthDays];
  const DOW = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const scoreColor = s => s === null ? C.border : s >= 80 ? C.green : s >= 60 ? "#16A891" : s >= 40 ? C.amber : C.red;
  const rows = [];
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7));
  }
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}` }}>
      <div style={{ padding: "10px 14px 6px", borderBottom: `1px solid ${C.border}` }}>
        <SectionLabel>{new Date().toLocaleString("default",{month:"long"})} {new Date().getFullYear()} — Activity Grid</SectionLabel>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
          {DOW.map(d => <div key={d} style={{ width: 14, fontSize: 8, color: C.muted, textAlign: "center", fontFamily: "monospace" }}>{d}</div>)}
        </div>
        {rows.map((week, ri) => (
          <div key={ri} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
            {week.map((cell, ci) => cell === null
              ? <div key={ci} style={{ width: 14, height: 14 }}/>
              : <div key={cell.key} title={`${cell.key}: ${calcDayScore(allData[cell.key]) ?? "—"}%`}
                  style={{ width: 14, height: 14, background: scoreColor(calcDayScore(allData[cell.key])), opacity: calcDayScore(allData[cell.key]) === null ? 0.25 : 1, outline: cell.key === todayKey ? `1px solid ${C.accent}` : "none", cursor: "default" }}
                />
            )}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
          <span style={{ fontSize: 9, color: C.muted }}>0%</span>
          {[C.border, C.red, C.amber, "#16A891", C.green].map((c, i) => <div key={i} style={{ width: 10, height: 10, background: c }}/>)}
          <span style={{ fontSize: 9, color: C.muted }}>100%</span>
        </div>
      </div>
    </div>
  );
}

// ─── DATA TABLE ──────────────────────────────────────────────────────────────
function DataTable({ monthDays, allData, habits, todayKey }) {
  const cols = habits.slice(0, 4);
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}` }}>
      <div style={{ padding: "10px 14px 6px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SectionLabel>Full Month Log</SectionLabel>
        <span style={{ fontSize: 9, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Read-only</span>
      </div>
      {/* Table head */}
      <div style={{ display: "grid", gridTemplateColumns: "36px 90px 1fr repeat(4,24px) 44px", gap: 0, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        {["#","Date","",...cols.map(()=>""),"Score"].map((h, i) => (
          <div key={i} style={{ padding: "7px 8px", fontSize: 9, color: C.muted, fontWeight: 700, textAlign: i > 2 ? "center" : "left", letterSpacing: "0.08em", textTransform: "uppercase", borderRight: i < 7 ? `1px solid ${C.border}` : "none" }}>
            {h}
            {i >= 3 && i <= 6 && cols[i-3] && (
              <div style={{ color: C.accent, display: "flex", justifyContent: "center" }}>
                {(() => { const Ic = ICON_MAP[cols[i-3].iconKey] || Icons.Target; return <Ic />; })()}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Rows */}
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {monthDays.map(({ key, day }, idx) => {
          const dayData = allData[key];
          const score = calcDayScore(dayData);
          const isToday = key === todayKey;
          const isFuture = new Date(key) > new Date();
          const scoreColor = score === null ? C.muted : score >= 80 ? C.green : score >= 50 ? C.amber : C.red;
          return (
            <div key={key} style={{ display: "grid", gridTemplateColumns: "36px 90px 1fr repeat(4,24px) 44px", borderBottom: `1px solid ${C.border}`, background: isToday ? `${C.accent}0A` : "transparent", alignItems: "center" }}>
              <div style={{ padding: "7px 8px", fontSize: 11, fontFamily: "monospace", color: isToday ? C.accent : C.muted, fontWeight: isToday ? 700 : 400, borderRight: `1px solid ${C.border}`, textAlign: "center" }}>{String(day).padStart(2,"0")}</div>
              <div style={{ padding: "7px 8px", fontSize: 10, color: isToday ? C.text : C.muted, fontFamily: "monospace", borderRight: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                {new Date(key+"T00:00").toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}
                {isToday && <span style={{ fontSize: 8, background: C.accent, color:"#fff", padding:"1px 4px", fontFamily:"Inter", fontWeight:700, letterSpacing:"0.05em" }}>NOW</span>}
              </div>
              <div style={{ borderRight: `1px solid ${C.border}` }}/>
              {cols.map(habit => {
                const s = dayData?.[habit.id] || STATUS.EMPTY;
                return (
                  <div key={habit.id} style={{ borderRight: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", padding: "7px 0" }}>
                    <div style={{ width: 8, height: 8, background: s === STATUS.DONE ? C.green : s === STATUS.NOT_DONE ? C.red : C.border, opacity: isFuture ? 0.2 : 1 }}/>
                  </div>
                );
              })}
              <div style={{ padding: "7px 8px", textAlign: "center" }}>
                {isFuture ? <span style={{ color: C.border, fontSize: 11 }}>—</span> : <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: scoreColor }}>{score !== null ? `${score}%` : "—"}</span>}
              </div>
            </div>
          );
        })}
      </div>
      {/* Legend row */}
      <div style={{ display: "flex", gap: 14, padding: "8px 14px", borderTop: `1px solid ${C.border}`, background: C.bg }}>
        {[{color:C.green,label:"Done"},{color:C.red,label:"Missed"},{color:C.border,label:"Empty"}].map(({color,label}) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, background: color }}/>
            <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function HealthTracker() {
  const [habits, setHabits] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ht_habits2") || "null") || DEFAULT_HABITS; }
    catch { return DEFAULT_HABITS; }
  });
  const [allData, setAllData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ht_data") || "{}"); }
    catch { return {}; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTgt, setDeleteTgt] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const todayKey = getTodayKey();
  const tip = getDayTip();
  const monthDays = getThisMonthDays();
  const now = new Date();

  const todayData = useMemo(() => {
    const base = {}; habits.forEach(h => (base[h.id] = STATUS.EMPTY));
    return { ...base, ...(allData[todayKey] || {}) };
  }, [allData, todayKey, habits]);

  useEffect(() => { localStorage.setItem("ht_data", JSON.stringify(allData)); }, [allData]);
  useEffect(() => { localStorage.setItem("ht_habits2", JSON.stringify(habits)); }, [habits]);

  const cycleStatus = useCallback((habitId) => {
    if (editMode) return;
    const cur = todayData[habitId] || STATUS.EMPTY;
    const next = cur === STATUS.EMPTY ? STATUS.DONE : cur === STATUS.DONE ? STATUS.NOT_DONE : STATUS.EMPTY;
    setAllData(prev => ({ ...prev, [todayKey]: { ...todayData, [habitId]: next } }));
  }, [editMode, todayData, todayKey]);

  const addHabit = h => setHabits(p => [...p, h]);
  const deleteHabit = h => { setHabits(p => p.filter(x => x.id !== h.id)); setDeleteTgt(null); setEditMode(false); };

  const stats = useMemo(() => {
    const scores = monthDays.map(d => calcDayScore(allData[d.key])).filter(s => s !== null);
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = d.toISOString().split("T")[0];
      const s = calcDayScore(allData[k]);
      if (s !== null && s > 0) streak++; else if (i > 0) break;
    }
    const todayScore = calcDayScore(todayData) || 0;
    const totalDaysLogged = Object.keys(allData).filter(k => calcDayScore(allData[k]) !== null).length;
    const done = Object.values(todayData).filter(v => v === STATUS.DONE).length;
    return { avgScore, streak, todayScore, totalDaysLogged, done, total: habits.length };
  }, [allData, todayData, monthDays, habits]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>

      {/* ── App header bar ── */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 48, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 22, background: C.accent }}/>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>Health</span>
          <span style={{ fontSize: 9, color: C.muted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: C.border, padding: "2px 6px" }}>Tracker</span>
        </div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>
          {now.toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}
        </div>
      </div>

      {/* ── Dashboard carousel ── */}
      <DashboardCarousel stats={stats} tip={tip} monthDays={monthDays} allData={allData} />

      <div style={{ padding: "0 0 60px" }}>

        {/* ── Habits section ── */}
        <div style={{ margin: "16px 14px 0" }}>
          {/* Section header */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderBottom: "none" }}>
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 14, background: C.accent }}/>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Today's Habits</span>
                <span style={{ fontSize: 9, background: `${C.accent}22`, color: C.accent, padding: "2px 7px", fontWeight: 700, letterSpacing: "0.05em" }}>{stats.done}/{stats.total}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setEditMode(v => !v)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: editMode ? `${C.red}18` : "none", border: `1px solid ${editMode ? C.red+"44" : C.border}`, color: editMode ? C.red : C.muted, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <Icons.Edit />{editMode ? "Done" : "Edit"}
                </button>
                <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: `${C.accent}18`, border: `1px solid ${C.accent}44`, color: C.accent, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "Inter", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <Icons.Plus />Add
                </button>
              </div>
            </div>

            {/* Column labels */}
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px", padding: "6px 14px", borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}></div>
              <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Habit</div>
              <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center" }}>Status</div>
            </div>

            {/* Habit rows */}
            {habits.length === 0 && (
              <div style={{ padding: "28px 14px", textAlign: "center", color: C.muted, fontSize: 12 }}>
                No habits. <span onClick={() => setShowAdd(true)} style={{ color: C.accent, cursor: "pointer" }}>Add one →</span>
              </div>
            )}
            {habits.map((habit, idx) => {
              const status = todayData[habit.id] || STATUS.EMPTY;
              const Ic = ICON_MAP[habit.iconKey] || Icons.Target;
              const isLast = idx === habits.length - 1;
              return (
                <div key={habit.id} style={{ display: "flex", alignItems: "stretch", borderBottom: isLast ? "none" : `1px solid ${C.border}`, background: status === STATUS.DONE ? `${C.green}07` : status === STATUS.NOT_DONE ? `${C.red}07` : "transparent" }}>
                  {/* Icon cell */}
                  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${C.border}`, color: status === STATUS.DONE ? C.green : status === STATUS.NOT_DONE ? C.red : C.muted, flexShrink: 0 }}>
                    <Ic />
                  </div>
                  {/* Main tap area */}
                  <button onClick={() => cycleStatus(habit.id)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "none", border: "none", cursor: editMode ? "default" : "pointer", textAlign: "left", minWidth: 0 }}>
                    {/* Checkbox */}
                    <div style={{ width: 20, height: 20, border: `1.5px solid ${status === STATUS.EMPTY ? C.muted : status === STATUS.DONE ? C.green : C.red}`, background: status === STATUS.DONE ? C.green : status === STATUS.NOT_DONE ? C.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {status === STATUS.DONE && <Icons.Check />}
                      {status === STATUS.NOT_DONE && <Icons.X />}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: status === STATUS.EMPTY ? C.muted : C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{habit.label}</span>
                  </button>
                  {/* Status label OR delete button */}
                  {editMode ? (
                    <button onClick={() => setDeleteTgt(habit)} style={{ width: 44, background: "none", border: "none", borderLeft: `1px solid ${C.border}`, color: C.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icons.Trash />
                    </button>
                  ) : (
                    <div style={{ width: 60, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: status === STATUS.DONE ? C.green : status === STATUS.NOT_DONE ? C.red : C.border }}>
                        {status === STATUS.DONE ? "Done" : status === STATUS.NOT_DONE ? "Skip" : "—"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            {[{color:C.green,label:"Done"},{color:C.red,label:"Not done"},{color:C.border,label:"Not filled"}].map(({color,label}) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, background: color }}/>
                <span style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div style={{ margin: "16px 14px 0" }}>
          <Heatmap monthDays={monthDays} allData={allData} todayKey={todayKey} />
        </div>

        {/* ── Data table ── */}
        <div style={{ margin: "16px 14px 0" }}>
          <DataTable monthDays={monthDays} allData={allData} habits={habits} todayKey={todayKey} />
        </div>

      </div>

      {showAdd && <AddHabitModal onAdd={addHabit} onClose={() => setShowAdd(false)} />}
      {deleteTgt && <DeleteModal habit={deleteTgt} onConfirm={() => deleteHabit(deleteTgt)} onClose={() => setDeleteTgt(null)} />}
    </div>
  );
}
