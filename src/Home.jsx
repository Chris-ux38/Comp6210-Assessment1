import { Link } from 'react-router-dom';
import { SCP_DATA, CLASS_CONFIG } from './data.js';

function ClassBadge({ cls }) {
  const cfg = CLASS_CONFIG[cls] || CLASS_CONFIG.Safe;
  return (
    <span
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        padding: '2px 10px',
        borderRadius: '2px',
        fontSize: '0.7rem',
        fontFamily: "'Share Tech Mono', monospace",
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontWeight: 700,
      }}
    >
      ▸ {cls}
    </span>
  );
}

function CardImage({ src, alt }) {
  if (!src) {
    return (
      <div className="card-img-redacted">
        <span>[IMAGE REDACTED]</span>
      </div>
    );
  }
  return (
    <>
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div
        className="card-img-redacted"
        style={{ display: 'none', position: 'absolute', inset: 0 }}
      >
        <span>[IMAGE REDACTED]</span>
      </div>
      <div className="card-img-overlay" />
    </>
  );
}

function SCPCard({ scp, index }) {
  const cfg = CLASS_CONFIG[scp.objectClass];
  return (
    <Link
      to={`/scp/${scp.id}`}
      className="scp-card glass-box"
      style={{
        '--accent':        cfg.color,
        '--accent-bg':     cfg.bg,
        '--accent-border': cfg.border,
        animationDelay:    `${index * 0.07}s`,
      }}
    >
      <div className="card-scan-line" />

      <div className="card-header">
        <div>
          <div className="card-id">{scp.id}</div>
          <div className="card-nickname">"{scp.nickname}"</div>
        </div>
        <ClassBadge cls={scp.objectClass} />
      </div>

      <div className="card-img-wrap">
        <CardImage src={scp.image} alt={scp.id} />
      </div>

      <div className="card-tags">
        {scp.tags.slice(0, 4).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="card-footer">
        <span className="card-rating">↑ {scp.rating}</span>
        <span className="card-view">VIEW FILE →</span>
      </div>
    </Link>
  );
}

function Home({ filter, search }) {
  const filtered = SCP_DATA.filter((s) => {
    const matchClass  = filter === 'All' || s.objectClass === filter;
    const q           = search.toLowerCase();
    const matchSearch =
      !q ||
      s.id.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q));
    return matchClass && matchSearch;
  });

  return (
    <div className="catalogue-page">
      <div className="catalogue-hero glass-box">
        <h1>SUBJECT CATALOGUE</h1>
        <p>
          FOUNDATION DATABASE — EYES ONLY — UNAUTHORISED ACCESS IS PUNISHABLE
          UNDER DOCUMENT O5-001
        </p>
      </div>

      <div className="scp-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            [ NO SUBJECTS MATCH QUERY — CLASSIFICATION SEARCH RETURNED NULL ]
          </div>
        ) : (
          filtered.map((s, i) => (
            <SCPCard key={s.id} scp={s} index={i} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
