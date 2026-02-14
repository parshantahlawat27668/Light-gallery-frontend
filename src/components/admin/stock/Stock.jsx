import React, { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setAdminProducts } from '../../../store/adminProducts';
import { useEffect } from 'react';
import styles from "./Stock.module.css"
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { TbDatabaseEdit } from "react-icons/tb";
import { BsSortDown } from "react-icons/bs";

import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import api from '../../../api/axiosInstance';

const Stock = () => {
  const formRefs = useRef({});
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState("");
  const products = useSelector((state) => state.adminProducts);
  useEffect(() => {
    if (products.length === 0) {
      api.get("/products/admin")
        .then((response) => {
          dispatch(setAdminProducts(response.data.data));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);

  const toggleUpdateForm = (e, _id) => {
    // e.stopPropagation();
      setShowUpdateForm(_id.toString());
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      const openFormEl = formRefs.current[showUpdateForm];
      if (openFormEl && !openFormEl.contains(event.target)) {
        setShowUpdateForm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUpdateForm]);



  const handleCross=()=>{
    setShowUpdateForm("");
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <input type='text' placeholder='Search Product' className={styles.search}></input>
        <div style={{ display: "flex", gap: "20px", marginRight: "20px" }}>
          <p className={styles.filter}><PiSlidersHorizontalDuotone size={18}/> Filter</p>
          <p className={styles.sort}> <BsSortDown size={17}/>Sort</p>
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.titleRow}>
          <div className={styles.product}>Product</div>
          <div className={styles.category}>Category / Sub category</div>
          <div className={styles.brand}>Brand</div>
          <div className={styles.stock}>Stock</div>
          <div className={styles.status}>Status</div>
          <div className={styles.actions}>Actions</div>
        </div>
        {
          products.map((product) => {
            return <div className={styles.productRow} key={product._id}>
              <div className={styles.product}><img src={product.images.front.url} className={styles.productImage} />{product.title}</div>
              <div className={styles.category}>{product.category} / {product.subCategory}</div>
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.stock} style={{ background: product.stock <= 80 ? "#ff9999" : "#6eb36e", color: "white", fontWeight: "600" }}>{product.stock}</div>
              <div className={styles.status}>{product.isPublish ? "Publish" : "unPublish"}</div>
              <div className={styles.actions} >

                <div style={{ display: "flex", alignItems: "center", gap: "5px", padding:"4px 8px" }} onClick={(e) => toggleUpdateForm(e, product._id)}>
                  <TbDatabaseEdit /> Update
                </div>

                {
                  showUpdateForm === product._id.toString() ?
                    <form className={styles.updateForm} lassName={styles.updateForm} ref={(el) => {
                      if (el) formRefs.current[product._id] = el;
                    }}>
                      <RxCross2 size={16} className={styles.crossBtn} onClick={handleCross}/>
                      <p>{product.title}</p>
                      <label htmlFor='stock'>Stock</label>
                      <input type="number" id='stock' required placeholder='How many products?' ></input>

                      <label>Status</label>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <label style={{ display: "flex", gap: "2px" }} htmlFor='publish'>
                          <input
                            style={{ margin: "0px" }}
                            type='radio'
                            id='publish'
                            name='status'
                            value="publish"
                          /> Publish
                        </label>

                        <label htmlFor='unPublish' style={{ display: "flex", gap: "2px" }}>
                          <input
                            style={{ margin: "0px" }}
                            type='radio'
                            id='unPublish'
                            name='status'
                            value="unPublish"
                          />Publish
                        </label>
                      </div>
                      <button type='submit' className={styles.saveBtn}>Save</button>
                    </form> :
                    ""
                }



              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Stock
