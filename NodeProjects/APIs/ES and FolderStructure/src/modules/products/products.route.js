import express from "express";
const router = express.Router(); 
//we get the router object from express which is used to create routes in our application and handle the requests. where coming from the index.js file
//we are creating a router object and exporting it so that we can use it in the index.js file.
import productController from './product.controller.js';
//----------------------------------------All Products Route----------------------------------------
router.get('/products',productController.allProducts);
//----------------------------------------Single Product Route----------------------------------------
router.get('/products/:id',productController.singleProduct);
//----------------------------------------Add Product Route----------------------------------------
router.post('/products',productController.addProduct);
//----------------------------------------Update Product Route----------------------------------------
router.put('/products/:id',productController.updateProduct);
//----------------------------------------Delete Product Route----------------------------------------
router.delete('/products/:id',productController.deleteProduct);

export default router;





