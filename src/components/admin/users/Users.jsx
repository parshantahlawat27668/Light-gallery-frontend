
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../store/adminUsers';
import styles from "./Users.module.css"
import { PiSlidersHorizontalDuotone } from 'react-icons/pi';
import { BsSortDown } from 'react-icons/bs';
import api from '../../../api/axiosInstance';
const Users = () => {
  const users = useSelector((state) => state.adminUsers || []);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(users?.length ===0){
      api.get("/user")
        .then((response) => {
          console.log(response.data.data.users);
          dispatch(setUsers(response.data.data.users));
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
      <div className={styles.users}>
        <div className={styles.titleRow}>
          <div className={styles.name}>Name</div>
          <div className={styles.phone}>Phone no.</div>
          <div className={styles.email}>Email</div>
          <div className={styles.blocked}>Blocked</div>
        </div>

        {
          users.length>0 &&  users.map((user)=>{
            return <div className={styles.userRow}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.phone}>{user.phone.number}</div>
          <div className={styles.email}>{user.email.id ? user.email.id : "Not verified"}</div>
          <div className={styles.blocked}>false</div>
        </div>
          })
        }
        

      </div>
    </div>
  )
}

export default Users;
