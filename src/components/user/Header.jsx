import React, { useState } from 'react'
import styles from './Header.module.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { CgMenuRightAlt } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const [openMenuList, setOpenMenuList] = useState(false);
  const toggleMenuList = ()=>{
    setOpenMenuList(prev=>!prev);
  }

  const handleWishlist = ()=>{
    navigate("/shop/wishlist");
  }
  return (
    <div className={styles.main}>
      <div className={styles.nav1}>
        <Link className={styles.link} to="/shop">
          <h1 className={styles.logo}>
            <span className={styles.light}>Light</span>
            <span className={styles.gallery}>Gallery</span>
            </h1>
        </Link>
        <div className={styles.search}>
          <input type='text' placeholder='Search Products'></input>
          <BsSearch className={styles.searchIcon} size={15} />
        </div>
        <div className={styles.rightOpt}>
          <Link className={styles.link} to="/shop/cart">
            <MdOutlineShoppingCart size={20} />
          </Link>
          <div  className={styles.link} onClick={handleWishlist}>
            <GoHeart size={20} />
          </div>
          <Link to="/shop/user" className={styles.link}>
            <FaRegUser size={20} />
          </Link>
        </div>
        <CgMenuRightAlt size={24} className={styles.menu}  onClick={toggleMenuList}/>
        {
          openMenuList?
          <div className={styles.menuList} onClick={toggleMenuList}>
          <Link to="/shop/cart" className={styles.link}>
          <MdOutlineShoppingCart size={18} /> Cart
          </Link>
          <Link to="/shop/wishlist" className={styles.link}>
          <GoHeart size={18} /> Wishlist
          </Link>
          <Link to="/shop/user" className={styles.link} >
          <FaRegUser size={16} /> User
          </Link>
        </div>
        :
        ""
        }
        
      </div>
      <div className={styles.nav2}>
        <Link to="/shop/filter?category=Indoor lights" className={styles.link}>Indoor Lights</Link>
        <Link to="/shop/filter?category=Outdoor lights" className={styles.link}>Outdoor Lights</Link>
        <Link to="/shop/filter?category=Decorative lights" className={styles.link}>Decorative Lights</Link>
        <Link to="/shop/filter?category=Smart lights" className={styles.link}>Smart Lights</Link>
        <Link to="/shop/filter?category=lamps" className={styles.link}>Lamps Lights</Link>
        <Link to="/shop/filter?category=Basic lights" className={styles.link}>Basic Lights</Link>
      </div>



    </div>
  )
}

export default Header
