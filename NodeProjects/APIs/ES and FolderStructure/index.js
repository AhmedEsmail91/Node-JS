//----------------------------------------Establishing the Server----------------------------------------
// node-express
// const express = require('express')
// const cors = require('cors')

import express from "express";
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
//Cross-Origin Resource Sharing (CORS) is a security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser.
app.use(cors());
import {productRouter} from './src/modules/products/allProducts.js';
import {addProductRouter} from './src/modules/products/addProduct.js';
import {deleteProductRouter} from './src/modules/products/deleteProduct.js';
import {updateProductRouter} from './src/modules/products/updateProduct.js';
import {showProductRouter} from './src/modules/products/showProduct.js';
//All Product Routes
app.use(productRouter);
app.use(addProductRouter);
app.use(deleteProductRouter);
app.use(updateProductRouter);
app.use(showProductRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});