import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Nav       from './Nav.jsx';
import Home      from './Home.jsx';
import SCPDetail from './SCPDetail.jsx';


import './App.css';

import { SCP_DATA } from './data.js';


function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>[ DOCUMENT NOT FOUND — ACCESS DENIED OR FILE DOES NOT EXIST ]</p>
      <a href="/" className="back-btn">← RETURN TO CATALOGUE</a>
    </div>
  );
}


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter]           = useState('All');
  const [search, setSearch]           = useState('');

  return (
    <Router>
      <div className="app-layout">
        <Nav
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        <main className="main-content">
          <div className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <div className="topbar-title">SCP CATALOGUE SYSTEM </div>
            <div className="topbar-count">
              {SCP_DATA.length} SUBJECTS ON FILE
            </div>
          </div>

          <Routes>
            <Route
              path="/"
              element={<Home filter={filter} search={search} />}
            />
            <Route
              path="/scp/:id"
              element={<SCPDetail />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
