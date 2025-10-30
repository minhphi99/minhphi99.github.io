import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import League from './pages/League';
import Team from './pages/Team';
import Player from './pages/Player';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<League />} />
          <Route path="/team/:id" element={<Team />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
