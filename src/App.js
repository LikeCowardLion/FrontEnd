import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Sidebar from './pages/sidebar/Sidebar';
import HomePage from './pages/homepage/Homepage';
import TotalPage from './pages/totalpage/TotalPage';


function App() {
  return (
      <Router>
          <div className="App">
              <div className="container">
                  <Sidebar />
                  <div className="others">
                      <Routes>
                          <Route path="/" element={<Navigate to="/home" />} />
                          <Route path="/home" element={<HomePage />} />
                          <Route path="/statistics/:category" element={<TotalPage />} />
                          <Route path="/ranking" element={<div>랭킹 페이지</div>} />
                      </Routes>
                  </div>
              </div>
          </div>
      </Router>
  );
}

export default App;
