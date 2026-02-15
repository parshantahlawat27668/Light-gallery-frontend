import React from 'react'
import styles from "./CategorySection.module.css"
import CategoryCard from '../components/user/CategoryCard'
import { RiArrowLeftWideLine, RiArrowRightWideFill } from 'react-icons/ri'
const CategorySection = () => {
  const categories = [
  { id: 1, category: "Indoor lights" },
  { id: 2, category: "Outdoor lights" },
  { id: 3, category: "Decorative lights" },
  { id: 4, category: "Smart lights" },
  { id: 5, category: "Lamps" },
  { id: 6, category: "Basic lights" },
];

  return (
    <div className={styles.main}>
      <div className={styles.sectionHeader}>
          <RiArrowLeftWideLine size={22} className={styles.nextBtn}/>
          <p>Shop By Category</p>
          <RiArrowRightWideFill size={22} className={styles.nextBtn}  />
      </div>


      <div className={styles.categoryCardContainer}>
        {categories.map((category)=>{
          return <CategoryCard  category={category.category}/>
        })}
        
      </div>
    </div>
  )
}

export default CategorySection
