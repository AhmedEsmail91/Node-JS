//----------------------------------------Establishing the Server----------------------------------------
// node-express
// const express = require('express')
// const cors = require('cors')

import express from "express";
import cors from 'cors';
const app = express();
// app.setMaxListeners(20); 
const port = 3000;
app.use(express.json());
//Cross-Origin Resource Sharing (CORS) is a security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser.
app.use(cors());
import router from './src/modules/products/products.route.js';
app.use(router); // to use the routes for the products

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});