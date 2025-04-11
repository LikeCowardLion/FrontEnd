import logo from './logo.svg';
import './App.css';
import Sidebar from './pages/sidebar/Sidebar'
import HomePage from './pages/homepage/Homepage';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="others">
            <HomePage />
        </div>
      </div>
    </div>
  );
}

export default App;
