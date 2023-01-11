import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import JambExam from "./pages/JambExam"
import Login from './pages/Login';
import SelectSubjects from './pages/SelectSubjects';

import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Instruction from './pages/Instruction';


function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/select subjects' element={<ProtectedRoute><SelectSubjects /></ProtectedRoute>} />
            <Route path='/exam instruction' element={<ProtectedRoute><Instruction /></ProtectedRoute>} />
            <Route path='/jamb exam' element={<ProtectedRoute><JambExam /></ProtectedRoute>} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
