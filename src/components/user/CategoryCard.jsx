import React from 'react'
import styles from "./CategoryCard.module.css"
import image from "../../assets/tableLamp.avif"
import { SiEthiopianairlines } from "react-icons/si";
import { Link } from 'react-router-dom';
const CategoryCard = ({category}) => {

  return (
    <Link className={styles.categoryCard} to={`/shop/filter?category=${category }`}>
      <img src={image} className={styles.categoryImg}></img>
      <div className={styles.categoryName}>
        <SiEthiopianairlines className={styles.leftWing} color='white'/>
        <p>{category}</p>
        <SiEthiopianairlines className={styles.rightWing} color='white'/>
        </div>
    </Link>
  )
}

export default CategoryCard;
