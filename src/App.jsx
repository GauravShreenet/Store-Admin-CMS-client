
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/sign-in-up/SignUp';
import SignIn from './pages/sign-in-up/SignIn';
import VerifyEmail from './pages/sign-in-up/VerifyEmail';
import Dashboard from './pages/dashboard/Dashboard';
import Category from './pages/category/Category';
import Product from './pages/product/Product';
import PaymentOption from './pages/payment-option/PaymentOption';
import Order from './pages/Order/Order';
import Customer from './pages/Customer/Customer';
import AdminUsers from './pages/adminusers/AdminUsers';
import MyProfile from './pages/my-profile/MyProfile';
import { PrivateRout } from './component/private-router/PrivateRout';
import PasswordReset from './pages/sign-in-up/PasswordReset';
import { useDispatch } from 'react-redux';
import { getAllCats } from './pages/category/categoryAction';
import { useEffect } from 'react';
import { UpdateCategory } from './component/update/UpdateCategory';


function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAllCats())
  },[dispatch]);

  return (
    <div>
      <Routes>

        {/* public route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<PasswordReset />} />

        {/* private route */}
        <Route path="/admin-sign-up" element={
          <PrivateRout>
            <SignUp />
          </PrivateRout>
        } />
        <Route path="/dashboard" element={
          <PrivateRout>
            <Dashboard />
          </PrivateRout>
        } />

        <Route path="/category" element={
          <PrivateRout>
            <Category />
          </PrivateRout>
        } />
        <Route path='/update-category/:_id' element={
          <PrivateRout>
            <UpdateCategory />
          </PrivateRout>
        } />
        <Route path="/product" element={
          <PrivateRout>
            <Product />
          </PrivateRout>
        } />
        <Route path="/payment-option" element={
          <PrivateRout>
            <PaymentOption />
          </PrivateRout>
        } />
        <Route path="/order" element={
          <PrivateRout>
            <Order />
          </PrivateRout>
        } />
        <Route path="/customer" element={
          <PrivateRout>
            <Customer />
          </PrivateRout>
        } />
        <Route path="/admin-user" element={
          <PrivateRout>
            <AdminUsers />
          </PrivateRout>
        } />
        <Route path="/my-profile" element={
          <PrivateRout>
            <MyProfile />
          </PrivateRout>
        } />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
