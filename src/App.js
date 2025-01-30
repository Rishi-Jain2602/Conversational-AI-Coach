import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import Chat from './component/Chat';
import Improvements from './component/Improvements';
import Summary from './component/Summary';
import Navbar from './component/Navbar';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/Improvements" element={<Improvements/>} />
        <Route path="/Summary" element={<Summary/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
