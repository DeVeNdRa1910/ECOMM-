import express from "express";

// middleware
import { getToken } from "../middleware/getToken.js";

// user
import { userSignupController } from "../controllers/user/userSignup.js";
import { userSigninController } from "../controllers/user/userSignin.js";
import { userDetailsController } from "../controllers/user/userDetails.js";
import { userLogoutController } from "../controllers/user/userLogout.js";
import { updateProfileController } from "../controllers/user/updateProfile.js";
import { allUsersController } from "../controllers/user/allUsers.js";
import { updateUserController } from "../controllers/user/updateUser.js";

// Product
import { uploadProductController } from "../controllers/product/uploadProduct.js";
import { getProductsController } from "../controllers/product/getProducts.js";
import { updateProductController } from "../controllers/product/updateProduct.js";
import { getCategoryProduct } from "../controllers/product/getCategoryProduct.js";
import { getCategoryWiseProduct } from "../controllers/product/getCategoryWiseProduct.js";
import { getProduct } from "../controllers/product/getProduct.js";
import addToCartController from "../controllers/user/addToCartController.js";
import removeFromCartController from "../controllers/user/deleteFromCartController.js";
import calculateBillController from "../controllers/user/calculateBill.js";
import fetchCartProductsController from "../controllers/user/fetchCartProducts.js";
import { deleteProductFromCartController } from "../controllers/user/deleteProductFromCart.js";
import { searchProductController } from "../controllers/product/searchProduct.js";


const router  = express.Router();

//users auth
router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get('/user-details', getToken, userDetailsController);
router.post('/update-profile',getToken, updateProfileController);
router.get('/logout', userLogoutController);


//admin pannel
router.get('/allusers', getToken, allUsersController);
// router.post('/update-user', getToken, updateUserController)
router.patch('/update-user', getToken, updateUserController);


//Products
router.post('/upload-product', getToken, uploadProductController);
router.get('/get-products', getProductsController);
router.post('/update-product', getToken , updateProductController );
router.get('/get-category-product', getCategoryProduct);
router.post('/category-product', getCategoryWiseProduct);
router.get('/product-details', getProduct);
router.get('/search', searchProductController);


//user add to cart
router.post('/addToCart', getToken, addToCartController);
router.post('/removeFromCart', getToken, removeFromCartController);
router.post('/calculate-bill', getToken, calculateBillController);
router.get('/get-cart-products', getToken, fetchCartProductsController);
router.post('/delete-product', getToken, deleteProductFromCartController);


export default router;