import { NavLink, Link } from 'react-router-dom';

function Nav({ isOpen, setIsOpen, search, setSearch, filter, setFilter }) {
  const classes = ['All', 'Safe', 'Euclid', 'Keter'];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="sidebar-logo" onClick={() => setIsOpen(false)}>
          <div className="logo-mark">SCP</div>
          <div className="logo-sub">FOUNDATION</div>
          <div className="logo-tagline">SECURE · CONTAIN · PROTECT</div>
        </Link>
        <div className="sidebar-section">
          <div className="sidebar-label">SEARCH SUBJECTS</div>
          <input
            className="sidebar-search"
            placeholder="Search designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="sidebar-section">
          <div className="sidebar-label">OBJECT CLASS</div>
          {classes.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''} ${
                c !== 'All' ? `class-${c.toLowerCase()}` : ''
              }`}
              onClick={() => {
                setFilter(c);
                setIsOpen(false);
              }}
            >
              {c !== 'All' && <span className="filter-dot" />}
              {c === 'All' ? 'ALL SUBJECTS' : c.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="clearance-badge">
            <div className="clearance-label">CLEARANCE LEVEL</div>
            <div className="clearance-value">04 — TOP SECRET</div>
          </div>
          <div className="access-log">
            {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC
          </div>
        </div>
      </aside>
    </>
  );
}

export default Nav;
