import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import JambExam from "./pages/JambExam"
import Login from './pages/Login';
import SelectSubjects from './pages/SelectSubjects';

import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/jamb exam' element={<ProtectedRoute><JambExam /></ProtectedRoute>} />
            <Route path='/select subjects' element={<ProtectedRoute><SelectSubjects /></ProtectedRoute>} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
