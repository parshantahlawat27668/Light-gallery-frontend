import React, { useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
const Cart = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    const getCartProducts = async () => {
      const response = await api.get("/user/get-cart-products");
      setCartProducts(response.data.data);
    }
    getCartProducts();
  }, [])


  
  const handleCheckout = () => {
    navigate("/shop/orders",{state:{productsArray:cartProducts}}); 
  }
  
  
  // const allProducts = useSelector((state) => selectAllProducts(state));

  const getTotalPrice = () => {
    let total = 0;
    cartProducts.map((product) => {
      total = total + product.price;
    });
    return total;
  }

  const removeFromCart = (productId)=>{
    api.patch(`/user/remove-from-cart/${productId}`,{})
    .then((response)=>{
      toast.success(response.data.message);
      api.get("/user/get-cart-products")
      .then((response)=>{
        setCartProducts(response.data.data);
      })
      .catch((error)=>{
        console.log(error)
      })
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  return (
    <div className={styles.main}>
      <p className={styles.heading}>Cart</p>
      <div className={styles.cartProductsContainer}>
        <div className={styles.titlesRow}>
          <div className={`${styles.product} ${styles.cel}`}>Product</div>
          <div className={`${styles.quantity} ${styles.cel}`}>Quantity</div>
          <div className={`${styles.total} ${styles.cel}`}>Total</div>
          <hr style={{ position: 'absolute', bottom: "-10px", height: "0.5px", backgroundColor: "black", width: "100%" }} />
        </div>


        {
          cartProducts?.map((product) => {
            return <div className={styles.productRow}>

              <div className={`${styles.product} ${styles.cel}`}>
                <img src={product?.images.front.url} className={styles.productImage}>
                </img>
                {product?.title}
              </div>
              <div className={`${styles.quantity} ${styles.cel}`}>
                {product?.quantity}
              </div>
              <div className={`${styles.total} ${styles.cel}`}>
                {product?.price}
              </div>
              <RxCross2  className={styles.remove} onClick={()=>removeFromCart(product._id)}/>
            </div>
          })
        }


      </div>
      <div className={styles.checkOutContainer}>
        <p>Subtotal: Rs. {getTotalPrice()}</p>
        <p>Tax included. Shipping calculated at checkout.</p>
        <button className={styles.checkOutBtn} onClick={handleCheckout}>Check Out</button>
      </div>
    </div>
  )
}

export default Cart
