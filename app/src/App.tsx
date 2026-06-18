import { HashRouter, Routes, Route, NavLink, Link, useParams } from 'react-router-dom'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { VIDEOS, RUBRIC_CATEGORIES } from './data'
import './index.css'

function scoreColor(pct: number) {
  if (pct >= 0.80) return '#15803d'
  if (pct >= 0.60) return '#b45309'
  return '#dc2626'
}

function ScoreBadge({ score, max }: { score: number; max: number }) {
  return <span style={{ color: scoreColor(score / max), fontWeight: 700 }}>{score}/{max}</span>
}

function Bar({ score, max }: { score: number; max: number }) {
  return (
    <div style={{ height: 6, background: '#f3f4f6', borderRadius: 9999, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${(score / max) * 100}%`, background: scoreColor(score / max), borderRadius: 9999 }} />
    </div>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const navItems: [string, string][] = [['/', 'Scoreboard'], ['/rubric', 'Rubric']]
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, Helvetica Neue, Arial, sans-serif', background: '#f9fafb', color: '#111827' }}>
      <div style={{ height: 3, background: '#FF3621' }} />
      <header style={{ background: '#0f1629', color: '#fff', position: 'sticky', top: 0, zIndex: 30, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none' }}>
            <div style={{ height: 28, width: 28, borderRadius: 4, background: '#FF3621', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 20 20" style={{ height: 14, width: 14, fill: '#fff' }}><path d="M3 4h14v2H3zm0 5h10v2H3zm0 5h14v2H3z"/></svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Fivetran Demo Scorer</span>
          </Link>
          <nav style={{ display: 'flex', gap: 4, fontSize: 12, fontWeight: 500 }}>
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({ padding: '5px 10px', borderRadius: 4, color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent', textDecoration: 'none' })}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main style={{ flex: 1, maxWidth: 940, margin: '0 auto', width: '100%', padding: '32px 24px' }}>{children}</main>
      <footer style={{ borderTop: '1px solid #e5e7eb', background: '#fff' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '12px 24px', fontSize: 11, color: '#9ca3af' }}>
          Fivetran Demo Scorer &nbsp;·&nbsp; Each video scored against its own topic &nbsp;·&nbsp; June 2026
        </div>
      </footer>
    </div>
  )
}

function Scoreboard() {
  const sorted = [...VIDEOS].sort((a, b) => b.total - a.total)
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FF3621', marginBottom: 4 }}>June 2026</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Demo Scores</h1>
        <p style={{ fontSize: 14, color: '#6b7280' }}>Each video scored against its own topic. Click any video for the full category breakdown and rationale.</p>
      </div>

      <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
        {sorted.map((v, i) => (
          <Link key={v.id} to={`/video/${v.id}`} style={{ display: 'block', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '18px 20px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF3621')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#e5e7eb', width: 26, flexShrink: 0, lineHeight: 1, paddingTop: 2 }}>#{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{v.presenter}</span>
                  <span style={{ color: '#d1d5db' }}>·</span>
                  <span style={{ color: '#374151', fontSize: 14 }}>{v.title}</span>
                  <span style={{ color: '#d1d5db' }}>·</span>
                  <span style={{ color: '#9ca3af', fontSize: 12 }}>{v.duration}</span>
                </div>
                <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 10, fontStyle: 'italic' }}>{v.topic}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 7, background: '#f3f4f6', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${v.total}%`, background: scoreColor(v.total / 100), borderRadius: 9999 }} />
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: scoreColor(v.total / 100), flexShrink: 0 }}>{v.total}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af', flexShrink: 0 }}>/100</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background: '#0f1629', borderRadius: 10, padding: '18px 22px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Rubric — 100 points, 8 categories</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {RUBRIC_CATEGORIES.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>{c.max} pts</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          See the <Link to="/rubric" style={{ color: '#FF3621', textDecoration: 'none' }}>Rubric page</Link> for full criteria — including Great / Good / Weak definitions for each category.
        </p>
      </div>
    </div>
  )
}

function VideoDetail() {
  const { id } = useParams<{ id: string }>()
  const v = VIDEOS.find(x => x.id === id)
  if (!v) return <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>Video not found</div>

  const radarData = RUBRIC_CATEGORIES.map((c, i) => ({
    subject: c.name.split(' ').slice(0, 2).join(' '),
    pct: Math.round((v.categories[i].score / c.max) * 100),
  }))

  return (
    <div>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6b7280', textDecoration: 'none', marginBottom: 20 }}>← All videos</Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>{v.presenter}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280', flexWrap: 'wrap', marginBottom: 4 }}>
            <span>{v.title}</span><span>·</span><span>{v.duration}</span><span>·</span>
            <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: '#FF3621', textDecoration: 'none' }}>Watch on Loom ↗</a>
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>{v.topic}</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, color: scoreColor(v.total / 100) }}>{v.total}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>out of 100</div>
        </div>
      </div>

      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#374151', fontStyle: 'italic', marginBottom: 8, lineHeight: 1.55 }}>"{v.verdict}"</div>
      <div style={{ background: '#fff8ec', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#92400e', marginBottom: 22 }}>
        <b>Top improvement:</b> {v.score_to_improve}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 16 }}>Score breakdown</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {RUBRIC_CATEGORIES.map((c, i) => (
              <div key={c.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 12 }}>
                  <span style={{ color: '#374151' }}>{c.name}</span>
                  <ScoreBadge score={v.categories[i].score} max={c.max} />
                </div>
                <Bar score={v.categories[i].score} max={c.max} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 8 }}>Radar</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Radar dataKey="pct" stroke={scoreColor(v.total / 100)} fill={scoreColor(v.total / 100)} fillOpacity={0.15} strokeWidth={2} />
              <Tooltip formatter={(val) => [`${Number(val)}%`, 'Score']} />
            </RadarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>% of category max</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#15803d', marginBottom: 12 }}>What works</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {v.strengths.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.45 }}>
                <span style={{ color: '#15803d', fontWeight: 700, flexShrink: 0 }}>+</span><span style={{ color: '#374151' }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#dc2626', marginBottom: 12 }}>What to fix</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {v.gaps.map((g, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.45 }}>
                <span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0 }}>−</span><span style={{ color: '#374151' }}>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 }}>
        <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Category detail &amp; rationale</h2>
        <div>
          {RUBRIC_CATEGORIES.map((c, i) => (
            <div key={c.id} style={{ borderBottom: i < RUBRIC_CATEGORIES.length - 1 ? '1px solid #f3f4f6' : 'none', padding: '14px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</span>
                <ScoreBadge score={v.categories[i].score} max={c.max} />
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.55, marginBottom: 4 }}>{v.categories[i].rationale}</p>
              <Link to="/rubric" style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'none' }}>View rubric criteria →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Rubric() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FF3621', marginBottom: 4 }}>Scoring criteria</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Rubric</h1>
        <p style={{ fontSize: 14, color: '#6b7280', maxWidth: 560 }}>Each category defines what Great, Good, and Weak looks like. Scores are applied per-video based on the video's own topic — not against any external framework.</p>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {RUBRIC_CATEGORIES.map(c => (
          <div key={c.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{c.description}</p>
              </div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#FF3621', flexShrink: 0, marginLeft: 16 }}>{c.max} pts</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
              {[
                { label: 'Great', score: `${Math.round(c.max * 0.87)}–${c.max}`, text: c.great, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
                { label: 'Good', score: `${Math.round(c.max * 0.6)}–${Math.round(c.max * 0.86)}`, text: c.good, color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
                { label: 'Weak', score: `0–${Math.round(c.max * 0.59)}`, text: c.weak, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
              ].map(tier => (
                <div key={tier.label} style={{ padding: '12px 16px', background: tier.bg, borderTop: `2px solid ${tier.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: tier.color }}>{tier.label}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{tier.score} pts</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{tier.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '14px 18px', fontSize: 13, color: '#6b7280' }}>
        To adjust criteria or point allocations, edit <code style={{ background: '#e5e7eb', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>app/src/data.ts</code> → <code style={{ background: '#e5e7eb', padding: '1px 5px', borderRadius: 3, fontSize: 12 }}>RUBRIC_CATEGORIES</code>. Rebuild and push to update the site.
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
