import { useMemo } from 'react'
import { HashRouter, Routes, Route, NavLink, Link, useParams } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar as RBar, XAxis, YAxis, CartesianGrid,
  Cell,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import { VIDEOS, RUBRIC_CATEGORIES } from './data'
import './index.css'

function scoreColor(pct: number) {
  if (pct >= 0.80) return 'var(--high)'
  if (pct >= 0.60) return 'var(--mid)'
  return 'var(--low)'
}
function scoreClass(pct: number) {
  if (pct >= 0.80) return 'c-high'
  if (pct >= 0.60) return 'c-mid'
  return 'c-low'
}

function ScoreBadge({ score, max }: { score: number; max: number }) {
  return (
    <span className={`font-mono ${scoreClass(score / max)}`} style={{ fontWeight: 500, fontSize: 13 }}>
      {score}<span style={{ opacity: 0.4, margin: '0 1px' }}>/</span>{max}
    </span>
  )
}

function Bar({ score, max, delay = 0 }: { score: number; max: number; delay?: number }) {
  return (
    <div className="bar-track">
      <div
        className="bar-fill"
        style={{ width: `${(score / max) * 100}%`, background: scoreColor(score / max), animationDelay: `${delay}ms` }}
      />
    </div>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 3, background: 'var(--ft)' }} />
      <header style={{ background: 'var(--navy)', color: '#fff', position: 'sticky', top: 0, zIndex: 30, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#fff', textDecoration: 'none' }}>
            <div style={{ height: 26, width: 26, borderRadius: 4, background: 'var(--ft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 20 20" style={{ height: 13, width: 13, fill: '#fff' }}><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
            </div>
            <div>
              <span className="font-display" style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>Demo Scorer</span>
              <span style={{ fontSize: 11, opacity: 0.35, marginLeft: 8, fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>FIVETRAN</span>
            </div>
          </Link>
          <nav style={{ display: 'flex', gap: 2 }}>
            {[['/', 'Scoreboard'], ['/rubric', 'Rubric']].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main style={{ flex: 1, maxWidth: 960, margin: '0 auto', width: '100%', padding: '36px 20px' }}>{children}</main>
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>FIVETRAN DEMO SCORER · JUNE 2026</span>
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Each video scored against its own topic</span>
        </div>
      </footer>
    </div>
  )
}

// Precomputed from VIDEOS so the tooltip formatter never does a linear scan per hover event
const PRESENTER_FIRST: Record<string, string> = Object.fromEntries(
  VIDEOS.map(v => [v.id, v.presenter.split(' ')[0]])
)
// Sorted once at module level — never recomputed on re-render
const VIDEOS_BY_SCORE = [...VIDEOS].sort((a, b) => b.total - a.total)

function CategoryComparisonChart() {
  // Memoized: depends only on module-level constants that never change at runtime
  const data = useMemo(() =>
    RUBRIC_CATEGORIES.map((c, i) => {
      const row: Record<string, number | string> = { cat: c.short }
      VIDEOS.forEach(v => {
        // Safe access: TypeScript enforces categories.length via the Video interface
        row[v.id] = Math.round(((v.categories[i]?.score ?? 0) / c.max) * 100)
      })
      return row
    }),
    [] // empty deps — RUBRIC_CATEGORIES and VIDEOS are module-level constants
  )

  return (
    <div className="card" style={{ padding: '20px 22px', marginBottom: 14 }}>
      <p className="eyebrow" style={{ marginBottom: 4 }}>Category comparison — all three presenters</p>
      <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 16, lineHeight: 1.5 }}>
        Score per category as % of that category's maximum. Bars below 60% identify consistent coaching opportunities.
      </p>
      {/* Legend — color comes from the video object, not a parallel lookup */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
        {VIDEOS_BY_SCORE.map(v => (
          <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: v.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 500 }}>{PRESENTER_FIRST[v.id]}</span>
            <span className="font-mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{v.total}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -16 }} barCategoryGap="28%" barGap={2}>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
          <XAxis dataKey="cat" tick={{ fontSize: 10.5, fill: 'var(--ink-3)', fontFamily: 'DM Mono, monospace' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--ink-3)', fontFamily: 'DM Mono, monospace' }}
            tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} ticks={[0, 25, 50, 60, 75, 100]} />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            formatter={(val, name) => [`${val}%`, PRESENTER_FIRST[name as string] ?? name]}
            contentStyle={{ fontFamily: 'DM Mono, monospace', fontSize: 11, border: '1px solid var(--border)', borderRadius: 5, background: 'var(--bg-card)' }}
            labelStyle={{ fontWeight: 600, fontSize: 12, fontFamily: 'IBM Plex Sans, sans-serif' }}
          />
          {VIDEOS_BY_SCORE.map(v => (
            <RBar key={v.id} dataKey={v.id} name={v.id} radius={[3, 3, 0, 0]} maxBarSize={28}>
              {data.map((entry, idx) => (
                // fill comes from v.color; only opacity changes for weak bars
                <Cell key={idx} fill={v.color} fillOpacity={(entry[v.id] as number) < 60 ? 0.45 : 0.9} />
              ))}
            </RBar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      <p style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, textAlign: 'right' }}>
        Faded bars = below 60% threshold
      </p>
    </div>
  )
}

function Scoreboard() {
  const sorted = VIDEOS_BY_SCORE
  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <p className="eyebrow">Demo Review · June 2026</p>
        <h1 className="font-display" style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 10 }}>
          Scoring Report
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', maxWidth: 480, lineHeight: 1.65 }}>
          Three Fivetran demo videos, each scored against its own topic on a 100-point rubric. Click any video for the full category breakdown and rationale.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
        {sorted.map((v, i) => (
          <Link key={v.id} to={`/video/${v.id}`} className="card stagger-item" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              {/* Rank */}
              <div className="font-display hide-sm" style={{ fontSize: 13, fontWeight: 700, color: 'var(--border)', letterSpacing: '-0.01em', width: 20, flexShrink: 0, textAlign: 'right' }}>
                {i + 1}
              </div>
              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{v.presenter}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{v.title}</span>
                  <span className="font-mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>{v.duration}</span>
                </div>
                <p className="font-mono" style={{ fontSize: 11, color: 'var(--ft)', letterSpacing: '0.05em', marginBottom: 10, textTransform: 'uppercase' }}>
                  {v.topic.length > 72 ? v.topic.slice(0, 72) + '…' : v.topic}
                </p>
                <Bar score={v.total} max={100} delay={i * 80} />
              </div>
              {/* Score */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className={`score-numeral ${scoreClass(v.total / 100)}`} style={{ fontSize: 44 }}>{v.total}</div>
                <div className="font-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>/100</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <CategoryComparisonChart />

      {/* Rubric summary */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '20px 22px' }}>
        <p className="font-mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
          Rubric — 100 pts across 8 categories
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {RUBRIC_CATEGORIES.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '9px 11px', borderLeft: '2px solid var(--ft)' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 2, lineHeight: 1.3 }}>{c.name}</div>
              <div className="font-display" style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>{c.max}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          <Link to="/rubric" style={{ color: 'var(--ft)', textDecoration: 'none' }}>View full rubric →</Link>
          {' '}Great / Good / Weak criteria for each category.
        </p>
      </div>
    </div>
  )
}

function VideoDetail() {
  const { id } = useParams<{ id: string }>()
  const v = VIDEOS.find(x => x.id === id)
  if (!v) return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-3)' }}>Video not found</div>

  const radarData = RUBRIC_CATEGORIES.map((c, i) => ({
    subject: c.name.split(' ').slice(0, 2).join(' '),
    pct: Math.round((v.categories[i].score / c.max) * 100),
  }))
  const pct = v.total / 100

  return (
    <div>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--ink-2)', textDecoration: 'none', marginBottom: 24, fontWeight: 500 }}>
        ← All videos
      </Link>

      {/* Hero */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '24px 26px', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
            {v.title} · {v.duration}
          </p>
          <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6, lineHeight: 1.15 }}>
            {v.presenter}
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12, lineHeight: 1.5 }}>{v.topic}</p>
          <a href={v.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ft)', textDecoration: 'none', fontWeight: 600 }}>
            Watch on Loom ↗
          </a>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className={`score-numeral`} style={{ fontSize: 72, color: scoreColor(pct) }}>{v.total}</div>
          <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>/100</div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            {pct >= 0.80 ? 'Strong' : pct >= 0.60 ? 'Solid' : 'Needs work'}
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div style={{ borderLeft: '3px solid var(--border)', paddingLeft: 16, marginBottom: 12, fontStyle: 'italic', color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.65 }}>
        "{v.verdict}"
      </div>
      <div style={{ background: 'var(--mid-bg)', border: '1px solid #fde68a', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: 'var(--mid)', marginBottom: 28, lineHeight: 1.55 }}>
        <strong>Top improvement:</strong> {v.score_to_improve}
      </div>

      {/* Score grid + radar */}
      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div className="card" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Score breakdown</p>
          <div style={{ display: 'grid', gap: 11 }}>
            {RUBRIC_CATEGORIES.map((c, i) => (
              <div key={c.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, color: 'var(--ink)' }}>{c.name}</span>
                  <ScoreBadge score={v.categories[i].score} max={c.max} />
                </div>
                <Bar score={v.categories[i].score} max={c.max} delay={i * 40} />
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ marginBottom: 4 }}>Radar</p>
          <ResponsiveContainer width="100%" height={248}>
            <RadarChart data={radarData} margin={{ top: 8, right: 18, bottom: 8, left: 18 }}>
              <PolarGrid stroke="#e2dbd0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#9d9188', fontFamily: 'DM Mono, monospace' }} />
              <Radar dataKey="pct" stroke={scoreColor(pct)} fill={scoreColor(pct)} fillOpacity={0.12} strokeWidth={2} dot={{ fill: scoreColor(pct), r: 2 }} />
              <Tooltip
                formatter={(val) => [`${Number(val)}%`, 'Score']}
                contentStyle={{ fontFamily: 'DM Mono, monospace', fontSize: 11, border: '1px solid var(--border)', borderRadius: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="font-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textAlign: 'center', letterSpacing: '0.06em' }}>PCT OF CATEGORY MAX</p>
        </div>
      </div>

      {/* Strengths + gaps */}
      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div className="card" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ color: 'var(--high)', marginBottom: 12 }}>What works</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {v.strengths.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 9, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: 'var(--high)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>+</span>
                <span style={{ color: 'var(--ink-2)' }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="eyebrow" style={{ color: 'var(--low)', marginBottom: 12 }}>What to fix</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {v.gaps.map((g, i) => (
              <li key={i} style={{ display: 'flex', gap: 9, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: 'var(--low)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>−</span>
                <span style={{ color: 'var(--ink-2)' }}>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Category detail */}
      <div className="card" style={{ padding: 22, marginBottom: 14 }}>
        <p className="eyebrow" style={{ marginBottom: 18 }}>Category detail &amp; rationale</p>
        <div>
          {RUBRIC_CATEGORIES.map((c, i) => (
            <div key={c.id} style={{ borderBottom: i < RUBRIC_CATEGORIES.length - 1 ? '1px solid var(--border)' : 'none', padding: '15px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{c.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ width: 60 }}>
                    <Bar score={v.categories[i].score} max={c.max} delay={i * 30} />
                  </div>
                  <ScoreBadge score={v.categories[i].score} max={c.max} />
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65 }}>{v.categories[i].rationale}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
        <strong>Topic:</strong> {v.topic} &nbsp;·&nbsp;
        <Link to="/rubric" style={{ color: 'var(--ft)', textDecoration: 'none' }}>View scoring rubric →</Link>
      </div>
    </div>
  )
}

function Rubric() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <p className="eyebrow">Scoring criteria</p>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 10 }}>Rubric</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', maxWidth: 520, lineHeight: 1.65 }}>
          What Great, Good, and Weak looks like for each of the 8 categories. Scores are applied per-video against its own topic. To adjust criteria, edit <code className="font-mono" style={{ fontSize: 12, background: '#ede9e1', padding: '1px 5px', borderRadius: 3 }}>app/src/data.ts → RUBRIC_CATEGORIES</code>.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {RUBRIC_CATEGORIES.map(c => (
          <div key={c.id} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid var(--border)', gap: 12 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{c.name}</span>
                <p style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.45 }}>{c.description}</p>
              </div>
              <div className="font-display" style={{ fontWeight: 900, fontSize: 26, color: 'var(--ft)', flexShrink: 0 }}>{c.max}</div>
            </div>
            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
              {[
                { key: 'great', label: 'Great', range: `${Math.round(c.max * 0.87)}–${c.max} pts`, text: c.great, cls: 'tier-great', color: 'var(--high)' },
                { key: 'good',  label: 'Good',  range: `${Math.round(c.max * 0.60)}–${Math.round(c.max * 0.86)} pts`, text: c.good, cls: 'tier-good', color: 'var(--mid)' },
                { key: 'weak',  label: 'Weak',  range: `0–${Math.round(c.max * 0.59)} pts`, text: c.weak, cls: 'tier-weak', color: 'var(--low)' },
              ].map(t => (
                <div key={t.key} className={t.cls} style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: t.color }}>{t.label}</span>
                    <span className="font-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{t.range}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.55 }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route index element={<Scoreboard />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/rubric" element={<Rubric />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
