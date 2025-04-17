import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Sidebar from './pages/sidebar/Sidebar';
import HomePage from './pages/homepage/Homepage';
import StatPage from './pages/statpage/StatPage';
import RankingPage from './pages/rankingpage/RankingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/main" element={
          <div className="App">
            <div className="container">
              <Sidebar />
              <div className="others">
                <HomePage />
              </div>
            </div>
          </div>
        } />
        <Route path="/stats/:section" element={<StatPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

