import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import styles from "./User.module.css"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from '../store/user';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
const User = () => {
  const  dispatch = useDispatch();
  const user = useSelector((state) => state.user.activeUser);
  const logoutHandler = ()=>{
   api.post("/user/logout", {})
   .then((res)=>{
    console.log(res);
    toast.success(res.data.message);
    dispatch(removeUser());
   })
   .catch((error)=>{
    console.log(error);
   })
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <FaUserCircle size={50} className={styles.userIcon} />
          <p>{user?.name}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.group}>
            <FaPencilAlt size={13} className={styles.editOpt} />
            <h6>Name: </h6>
            <p>{user?.name}</p>
          </div>
          <div className={styles.group}>
            <FaPencilAlt size={13} className={styles.editOpt} />
            <h6>Email: </h6>
            <p>{user?.email?.id ?? "Not set"}</p>
          </div>
          <div className={styles.group}>
            <FaPencilAlt size={13} className={styles.editOpt} />
            <h6>Address: </h6>
            <p>
              {user?.address
                ? `${user.address.address}, ${user.address.city}, ${user.address.state} - ${user.address.pinCode}`
                : "Not set"}
            </p>
          </div>
        </div>

      </div>
      <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default User
