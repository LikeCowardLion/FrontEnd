import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

