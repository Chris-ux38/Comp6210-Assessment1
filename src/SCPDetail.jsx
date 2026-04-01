import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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
        fontSize: '1rem',
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

function GlitchText({ text }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}

function DetailImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="doc-img-redacted">
        <span>[VISUAL DOCUMENTATION CLASSIFIED]</span>
      </div>
    );
  }

  return (
    <>
      <img src={src} alt={alt} onError={() => setErrored(true)} />
      <div className="img-scan" />
    </>
  );
}

function SCPDetail() {
  const { id } = useParams();
  const scp = SCP_DATA.find((s) => s.id === id);

  if (!scp) return <Navigate to="/404" replace />;

  const cfg = CLASS_CONFIG[scp.objectClass];

  return (
    <div
      className="detail-view fade-in"
      style={{
        '--accent':        cfg.color,
        '--accent-bg':     cfg.bg,
        '--accent-border': cfg.border,
      }}
    >
      <Link to="/" className="back-btn">
        ← RETURN TO CATALOGUE
      </Link>
      <div className="doc-header">
        <div className="doc-watermark">FOUNDATION</div>
        <div className="doc-top">
          <div>
            <div className="doc-id">
              <GlitchText text={scp.id} />
            </div>
            <div className="doc-nickname">"{scp.nickname}"</div>
          </div>
          <div className="doc-meta">
            <div className="meta-row">
              <span className="meta-label">OBJECT CLASS</span>
              <ClassBadge cls={scp.objectClass} />
            </div>
            <div className="meta-row">
              <span className="meta-label">RATING</span>
              <span className="meta-value">↑ {scp.rating}</span>
            </div>
          </div>
        </div>
        <div className="doc-divider" style={{ background: cfg.color }} />
      </div>

      <div className="doc-img-section">
        <div className="doc-img-frame  glass-box">
          <DetailImage src={scp.image} alt={scp.id} />
        </div>
        <p className="img-caption">
          <em>Fig. 1: {scp.imageCaption}</em>
        </p>
      </div>

      <div className="doc-section glass-box">
        <h2 className="section-title">
          <span className="section-icon">⬛</span> SPECIAL CONTAINMENT PROCEDURES
        </h2>
        <ul className="procedure-list">
          {scp.containmentProcedures.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="doc-section  glass-box">
        <h2 className="section-title">
          <span className="section-icon">⬛</span> DESCRIPTION
        </h2>
        {scp.description.map((d, i) => (
          <p key={i} className="doc-para">{d}</p>
        ))}
      </div>

      {scp.addendum && (
        <div className="doc-section addendum glass-box">
          <h2 className="section-title">
            <span className="section-icon">⬛</span> ADDENDUM
          </h2>
          <p className="doc-para">{scp.addendum}</p>
        </div>
      )}

      <div className="doc-section  glass-box">
        <h2 className="section-title" style={{ fontSize: '0.75rem' }}>
          CLASSIFICATION TAGS
        </h2>
        <div className="detail-tags">
          {scp.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="doc-footer">
        <span>SCP FOUNDATION — SECURE. CONTAIN. PROTECT.</span>
        <span>DOCUMENT: {scp.id}-FILE-001</span>
      </div>
    </div>
  );
}

export default SCPDetail;
