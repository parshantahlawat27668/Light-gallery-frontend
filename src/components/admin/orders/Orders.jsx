import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../../../store/adminOrders';
import styles from "./Orders.module.css"
import { BsSortDown } from 'react-icons/bs';
import { PiSlidersHorizontalDuotone } from 'react-icons/pi';
import api from '../../../api/axiosInstance';

const Orders = () => {
 const dispatch =  useDispatch();
 useEffect(()=>{
  api.get("/orders/admin")
  .then((response)=>{
    dispatch(setOrders(response.data.data));
  })
  .catch((err)=>{
    console.log(err)
  })
 },[]);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
       <input type='text' placeholder='Search user' className={styles.search}></input>
        <div style={{ display: "flex", gap: "20px", marginRight: "20px" }}>
          <p className={styles.filter}><PiSlidersHorizontalDuotone size={18} /> Filter</p>
          <p className={styles.sort}> <BsSortDown size={17} />Sort</p>
        </div>
      </div>
      <div className={styles.body}></div>
    </div>
  )
}

export default Orders
