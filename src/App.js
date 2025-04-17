import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
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

import { useLocation } from "react-router-dom";
import Sidebar from './pages/sidebar/Sidebar';
import HomePage from './pages/homepage/Homepage';
import RankingPage from "./pages/rankingpage/RankingPage";
import StatRouter from "./pages/StatRouter";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function Layout({ children }) {
    const location = useLocation();
    const hideSidebar = ["/login", "/signup"].includes(location.pathname);
  
    return (
      <div className="App">
        <div className="container">
          {!hideSidebar && <Sidebar />}
          <div className="others">{children}</div>
        </div>
      </div>
    );
  }
  
  function App() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/statistics/:category" element={<StatRouter />} />
          </Routes>
        </Layout>
      </Router>
    );
  }

export default App;

