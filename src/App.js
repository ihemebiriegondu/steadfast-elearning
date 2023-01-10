import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import JambExam from "./pages/JambExam"
import SelectSubjects from './pages/SelectSubjects';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jamb exam' element={<JambExam />} />
          <Route path='select subjects' element={<SelectSubjects />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
