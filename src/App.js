import logo from './logo.svg';
import './App.css';
import Sidebar from './pages/sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Sidebar />
        <div className="others">other pages</div>
      </div>
    </div>
  );
}

export default App;
