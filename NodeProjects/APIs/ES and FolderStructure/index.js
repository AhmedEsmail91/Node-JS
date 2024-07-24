//----------------------------------------Establishing the Server----------------------------------------
// node-express
// const express = require('express')
// const cors = require('cors')

import express from "express";
import cors from 'cors';
const app = express()
const port = 3000
app.use(express.json());
//Cross-Origin Resource Sharing (CORS) is a security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser.
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
//All Veiws

//----------------------------------------DB----------------------------------------
import {Query} from './databases/dbConnection.js';
import * as Products from './src/modules/products/products.route.js';
//----------------------------------------All Products Route----------------------------------------
//allProducts View EndPoint

Products.allProducts(app);
//----------------------------------------Show Product Route----------------------------------------
Products.showProduct(app);
//----------------------------------------Add Product Route----------------------------------------
//addProduct EndPoint
Products.addProduct(app);

//----------------------------------------Delete Product Route----------------------------------------
Products.deleteProduct(app);
//----------------------------------------Update Product Route----------------------------------------
Products.updateProduct(app);
// */

//----------------------------------------Try Require for ES5----------------------------------------
/* 
//const data=require('./demo') //calling the local module
// let {myX,myY}=data; //destructuring the object
// console.log(data.myY) 
// console.log(myX) 
// console.log(myY) 
// data.DemoFun() //calling the function
const demoModule=require('./demo');
const {main,x,y}=demoModule;
console.log(main().demo1());
console.log(main().demo2());
console.log(main().ROUTER());
console.log(x);
console.log(y);
*/
app.listen(port,() => console.log(`App listening on port ${port}!`))

//----------------------------------------Try Import for ES6----------------------------------------
/*
// import {x,demo} from './demo.mjs'; // importing the variables and the functions which are exported in the module.
// import alias_name from './demo.mjs'; // this is the alias name just carries the defualt function to get the defualt and the other functions:
import alias_name,{x,y,demo} from './demo.js';
console.log(x,y);
demo();
// import {mainDemo} from './demo.mjs';
console.log(alias_name().demo());
*/

