import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import HomePage from './pages/homepage/Homepage';
import RankingPage from "./pages/rankingpage/RankingPage";
import StatRouter from "./pages/StatRouter";
import Layout from "./pages/Layout";

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
