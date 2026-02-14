import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './pages/auth/Layout';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/toast.css";
import VerifyOtp from './components/auth/VerifyOtp.jsx';
import UserLayout from './pages/user/UserLayout.jsx';
import ThemesSection from './sections/ThemesSection.jsx';
import BestSellersSection from './sections/BestSellersSection.jsx';
import NewArrivalSection from './sections/NewArrivalSection.jsx';
import TopRatedSection from './sections/TopRatedSection.jsx';
import CategorySection from './sections/CategorySection.jsx';
import Wishlist from './sections/Wishlist.jsx';
import Cart from './sections/Cart.jsx';
import User from './sections/User.jsx';
import FilterSection from './sections/FilterSection.jsx';
import ProductSection from './sections/ProductSection.jsx';
import OrderSection from './sections/OrderSection.jsx';
import Products from './components/admin/products/Products.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import WrongRoute from './sections/WrongRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import RedirectIfLogged from './routes/RedirectIfLogged.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/user.js';
import api from './api/axiosInstance.js';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const getUser = async ()=>{
     const res =  await api.get(`/user/my-profile`);
     if(!res.data.data.user){
      return <Navigate to="/auth/login"/>
     }
     dispatch(setUser(res.data.data.user));
    }
    getUser();
  },[]);
  return (
    <div className='appContainer'>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light" // or "dark"
        limit={3}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />

      <Routes>
        <Route path='/' element={<RedirectIfLogged/>}/>

        <Route path='/auth' element={
          <PublicRoute>
            <Layout />
          </PublicRoute>
        }>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='verify-phone' element={<VerifyOtp />} />
        </Route>

        {/* Admin Routes */}
        {/* <Route path='/admin' element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path='products' element={<Products />}>
          </Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="stock" element={<Stock />}></Route>
        </Route> */}

        {/* User Routes */}
        <Route path='/shop' element={<ProtectedRoute> <UserLayout /> </ProtectedRoute>}>
          <Route index element={<>
            <ThemesSection />
            <BestSellersSection />
            <NewArrivalSection />
            {/* <CategorySection /> */}
          </>}></Route>
          <Route path='wishlist' element={<Wishlist />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='category'></Route>
          <Route path='product' element={<ProductSection />}></Route>
          <Route path='user' element={<User />}></Route>
          <Route path='filter' element={<FilterSection />}></Route>
          <Route path='orders' element={<OrderSection />}></Route>


        </Route>

        <Route path='*' element={<WrongRoute/>}/>
      </Routes>
    </div>
  )
}

export default App
