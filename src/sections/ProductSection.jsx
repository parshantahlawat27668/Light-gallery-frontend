import React, { useState } from 'react'
import styles from "./ProductSection.module.css"
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from '../store/selectors/productsSelectors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import { setUser } from '../store/user';
import api from '../api/axiosInstance';
const ProductSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const product = useSelector((state)=>selectProductById(state,productId));
  const [selectedImage, setSelectedImage] = useState(product.images.front.url);
  const selectImage = (imagePath)=>{
    setSelectedImage(imagePath);
  }
  const handleQuantityChange=(e)=>{
    setQuantity(e.target.value);
  }
  const handleIncrement=()=>{
    setQuantity((prev)=>prev+1);
  }
  const handleDecrement = ()=>{ 
    if(quantity>1){
      setQuantity((prev)=>prev-1);
    }
  }

  const handleAddToCart = async(productId, quantity)=>{
    const response  = await api.patch("/user/add-to-cart",{productId, quantity});
    toast.success(response.data.message);
    const user = response.data.data.user;
    dispatch(setUser(user));
  }

  const handleBuyNow = () =>{
    const productWithQuantity = {
      _id:product._id,
      title:product.title,
      quantity:quantity,
      images:product.images,
      price:product.price,
      specifications:product.specifications,
      stock:product.stock,
      category:product.category,
      subCategory:product.subCategory,
      brand:product.brand,
      description:product.description,
    };

    navigate("/shop/orders",{state:{productsArray: [productWithQuantity]}});
  }
  return (
    <div className={styles.main}>
      <div className={styles.product}>
      <div className={styles.imageGallery}>
        <div className={styles.selector}>
        <img src={product.images.front.url} className={styles.selectorImage} onClick={()=>selectImage(product.images.front.url)}></img>
        <img src={product.images.back.url} className={styles.selectorImage} onClick={()=>selectImage(product.images.back.url)}></img>
        </div>

      <div className={styles.imageDisplay}>
        <img src={selectedImage} className={styles.displayImage}></img>
      </div>
      </div>
      <div className={styles.productDetails}>
        <p className={styles.title}>{product.title}</p>
        {/* <p>{product.description}</p> */}
        <p className={styles.price}>Rs. {product.price}</p>
        <label htmlFor="quantity" className={styles.quantity}>Quantity </label>
        <div style={{display:"flex", gap:"6px",marginBottom:"20px"}}>
        <div className={styles.decrement} onClick={handleDecrement}><LuMinus size={18} /></div>
        <input id='quantity' type='number' name='quantity' className={styles.quantityInput}min={1} value={quantity} onChange={(e)=>handleQuantityChange(e)}></input>
        <div className={styles.increment} onClick={handleIncrement}><LuPlus size={18} /></div>
        </div>
        <button className={styles.cartBtn} onClick={()=>handleAddToCart(product._id, quantity)}>ADD TO CART</button>
        <button className={styles.buyBtn} onClick={handleBuyNow}>BUY IT NOW</button> 
      </div>  
      </div>
    </div>
  )
}

export default ProductSection
