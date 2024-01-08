
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/sign-in-up/SignUp';
import SignIn from './pages/sign-in-up/SignIn';

function App() {
  return (
    <div>
      <Routes>

        {/* public route */}
        <Route path="/" element={<SignIn />} />

        {/* private route */}
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
