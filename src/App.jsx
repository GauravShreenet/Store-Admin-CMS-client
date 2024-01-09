
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/sign-in-up/SignUp';
import SignIn from './pages/sign-in-up/SignIn';
import VerifyEmail from './pages/sign-in-up/VerifyEmail';

function App() {
  return (
    <div>
      <Routes>

        {/* public route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* private route */}
        <Route path="/admin-sign-up" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
