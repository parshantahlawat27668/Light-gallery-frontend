import React from 'react'
import styles from "./WrongRoute.module.css"
import { useNavigate } from 'react-router-dom'
const WrongRoute = () => {
    const navigate  = useNavigate();
  return (
    <div className={styles.main}>
      <h2>Oops! This Page is not available 😒</h2>
      <button className={styles.btn}  onClick={()=>navigate("/shop")}>Try again</button>
    </div>
  )
}

export default WrongRoute
