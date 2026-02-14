
// export const selectAllProducts  =(state)=> state.products;

// export const selectBestSellers = (state, limit= 10) =>{
// return [...selectAllProducts(state)]
// .sort((a,b)=>b.sold - a.sold)
// .slice(0,limit);
// };

// export const selectProductById = (state, productId) =>{
//     return selectAllProducts(state).find((product)=>product._id===productId)
// }

// export const selectNewArrivals = (state, limit=10) =>{
// return [...selectAllProducts(state)]
// .sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
// .slice(0,limit);
// };  

// export const selectProductsByCategory = (state, category)=>{
// return selectAllProducts(state).filter(
//     (product)=> product.category?.toLowerCase() === category?.toLowerCase()
// );
// }


import { createSelector } from "@reduxjs/toolkit";

/* Base selector */
export const selectAllProducts = (state) => state.products;

/* =======================
   BEST SELLERS
======================= */
export const selectBestSellers = createSelector(
  [selectAllProducts, (_, limit = 10) => limit],
  (products, limit) =>
    [...products]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, limit)
);

/* =======================
   PRODUCT BY ID
======================= */
export const selectProductById = createSelector(
  [selectAllProducts, (_, productId) => productId],
  (products, productId) =>
    products.find((product) => product._id === productId)
);

/* =======================
   NEW ARRIVALS
======================= */
export const selectNewArrivals = createSelector(
  [selectAllProducts, (_, limit = 10) => limit],
  (products, limit) =>
    [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, limit)
);

/* =======================
   PRODUCTS BY CATEGORY
======================= */
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_, category) => category],
  (products, category) =>
    products.filter(
      (product) =>
        product.category?.toLowerCase() === category?.toLowerCase()
    )
);
