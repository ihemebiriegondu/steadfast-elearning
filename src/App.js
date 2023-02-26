import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import JambExam from "./pages/JambExam"
import Login from './pages/Login';
import SelectSubjects from './pages/SelectSubjects';

import ProtectedRoute from './components/ProtectedRoute'
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Instruction from './pages/Instruction';
import PreviewAnswer from './pages/PreviewAnswer';
import SelectStudySubject from './pages/SelectStudySubject';
import StudyInstruction from './pages/StudyInstruction';
import Pastquestions from './pages/Pastquestions';
import PreviewPractiveAnswers from './pages/PreviewPractiveAnswers';
import SignUp from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';


function App() {
  return (
    <div className="App">
      <Router>
        <UserAuthContextProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/create account' element={<SignUp />} />
            <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />

            <Route path='/select subjects' element={<ProtectedRoute><SelectSubjects /></ProtectedRoute>} />
            <Route path='/exam instruction' element={<ProtectedRoute><Instruction /></ProtectedRoute>} />
            <Route path='/jamb exam' element={<ProtectedRoute><JambExam /></ProtectedRoute>} />
            <Route path='/preview answers' element={<ProtectedRoute><PreviewAnswer /></ProtectedRoute>} />

            <Route path='/select subject' element={<ProtectedRoute><SelectStudySubject /></ProtectedRoute>} />
            <Route path='/instructions' element={<ProtectedRoute><StudyInstruction /></ProtectedRoute>} />
            <Route path='/practice questions' element={<ProtectedRoute><Pastquestions /></ProtectedRoute>} />
            <Route path='/preview' element={<ProtectedRoute><PreviewPractiveAnswers /></ProtectedRoute>} />

            <Route path='/forget password' element={<ForgetPassword />} />
            <Route path='/newpassword' element={<NewPassword />} />
          </Routes>
        </UserAuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
