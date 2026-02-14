import React, { useEffect } from 'react'
import styles from './UserLayout.module.css'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'
import { setProducts } from '../../store/products'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import api from '../../api/axiosInstance'
const UserLayout = () => {
    const dispatch = useDispatch();
    const fetchProducts = async()=>{
       await api.get("/products/user")
       .then((result)=>{
        dispatch(setProducts(result.data.data.products));
       })
       .catch(
        (err)=>{
            console.log(err);
        }
       )

    }
    useEffect(()=>{
        fetchProducts();
    },[]);

  return (
    <div className={styles.main}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout
