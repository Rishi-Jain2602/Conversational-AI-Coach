import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import TalkAI from './component/TalkAI';
import Improvements from './component/Improvements';
import Summary from './component/Summary';
import Navbar from './component/Navbar';
import WithAI from './component/WithAI';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/talkAI" element={<TalkAI/>} />
        <Route path="/withAI" element={<WithAI/>} />
        <Route path="/Improvements" element={<Improvements/>} />
        <Route path="/Summary" element={<Summary/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
