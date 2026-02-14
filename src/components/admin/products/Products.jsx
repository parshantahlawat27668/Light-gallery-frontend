import React, { useEffect } from 'react'
import styles from "./Products.module.css"
import { BsSortDown } from 'react-icons/bs'
import { PiSlidersHorizontalDuotone } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminProducts } from '../../../store/adminProducts'
import api from '../../../api/axiosInstance'

const Products = () => {
  const products = useSelector((state) => state.adminProducts || []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      api.get("/products/admin")
        .then((response) => {
          dispatch(setAdminProducts(response.data.data));
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <input type='text' placeholder='Search user' className={styles.search}></input>
        <div style={{ display: "flex", gap: "20px", marginRight: "20px" }}>
          <p className={styles.filter}><PiSlidersHorizontalDuotone size={18} /> Filter</p>
          <p className={styles.sort}> <BsSortDown size={17} />Sort</p>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.titleRow}>
          <div className={styles.title}>Title</div>
          <div className={styles.brand}>Brand</div>
          <div className={styles.category}>Category / Subcategory</div>
          <div className={styles.price}>Price</div>
          <div className={styles.discount}>Discount Price</div>
          <div className={styles.publish}>Publish</div>
          <div className={styles.stock}>Stock</div>
          <div className={styles.Sold}>Sold</div>
        </div>

        {
          products.map((product)=>{
            return <div className={styles.productRow}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.brand}>{product.brand}</div>
          <div className={styles.category}>{product.category} / {product.subCategory}</div>
          <div className={styles.price}>{product.price}</div>
          <div className={styles.discount}>{product.discountPrice}</div>
          <div className={styles.publish}>{product.isPublish}</div>
          <div className={styles.stock}>{product.stock}</div>
          <div className={styles.Sold}>{product.sold}</div>
        </div>
          })
        }
        


      </div>
    </div>
  )
}

export default Products
