import React, { useState } from 'react'
import styles from "./Wishlist.module.css"
import Product from '../components/user/Product'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/user'
import { toast } from 'react-toastify'
import api from '../api/axiosInstance'

const Wishlist = () => {
   const dispatch = useDispatch();
  const userWishlist = useSelector((state) => state.user.activeUser?.wishList) || [];
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const getWishlist = async () => {
      await api.get("/user/wishlist")
        .then((result) => {
          // console.log(result);
          setWishList(result.data.data.wishListProducts);
          console.log(result.data.data.wishListProducts);
        })
        .catch((error) => {
          console.log("wishlist backend error ",error);
        })
    }
    getWishlist();
  }, [],);
  


  // is WishListed logic

  const wishlist = userWishlist?.map((id) => id.toString());
  const wishlistSet = new Set(wishlist);
  const isWishListed = (productId) => wishlistSet.has(productId.toString());
 


  const handleAddToCart = async (productId) => {
    api.patch("/user/add-to-cart", { productId, quantity: 1 })
    .then((response)=>{
      toast.success(response.data.message);
       api.patch("/user/toggle-wishlist-products", { productId })
       .then((response)=>{
         dispatch(setUser(response.data.data.user));
       })
       .catch((error)=>console.log(error));

    })
    .catch((error)=>{
      console.log(error);
    });
  }

  return (
    <div className={styles.main}>
      <p className={styles.heading}>My Wishlist</p>
      <div className={styles.productContainer}>
        {
          wishList?.length < 1 ? <h3>No products available</h3> :
            wishList?.map((product, index) => {
              return <div style={{ display: "flex", flexDirection: "column", paddingBottom: "15px" }} key={index}>
                <Product product={product} wishListed={isWishListed(product._id)} />
                <button className={styles.moveCartBtn} onClick={()=>handleAddToCart(product._id)}>Move to Cart</button>
              </div>
            })
        }
      </div>

    </div>
  )
}

export default Wishlist
