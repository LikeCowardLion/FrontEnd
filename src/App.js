import logo from './logo.svg';
import './App.css';
import Sidebar from './pages/sidebar/Sidebar'
import HomeCalendar from './pages/homepage/Calendar/HomeCalendar'
import ProfileCard from './pages/homepage/MyProfile/ProfileCard'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="others">
            <ProfileCard />
        </div>
      </div>
    </div>
  );
}

export default App;
