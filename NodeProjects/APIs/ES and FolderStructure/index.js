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
/*
//----------------------------------------DB----------------------------------------
const sql=require('mysql2')
const Query=sql.createConnection({
    host:"localhost",
    database:"session6_node",
    password:"",
    user:"root"
});

//----------------------------------------All Products Route----------------------------------------
const allProducts=(req,res,next)=>{
    var result=Query.execute('select * from products',(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json({message:"success",data:rows});
        }
    });
}zxasasd
//allProducts View EndPoint
app.get('/products',allProducts)

//----------------------------------------Show Product Route----------------------------------------
const showProduct=(req,res,next)=>{
    const {id}=req.params;
    const result=Query.execute('select * from products where id=?',[id],(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json(rows)
        }
    });
}
// Calling showProduct View EndPoint
app.get('/products/:id',showProduct)
//----------------------------------------Add Product Route----------------------------------------
const addProduct=(req,res,next)=>{
    const {name,desc,price}=req.body;
    // any callback functions has error as first parameter 
    const result=Query.execute('insert into products (name,description,price) value(?,?,?)',[name,desc,price],(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json({"message":"Product Added"})
        }
    });
}
//addProduct EndPoint
app.post('/products',addProduct)

//----------------------------------------Delete Product Route----------------------------------------
const deleteProduct=(req,res,next)=>{
    const {id}=req.params;
    const result=Query.execute('delete from products where id=?',[id],(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            if(rows.affectedRows==0) res.json({"message":"Product Not Found"});

            else res.json({"message":"Product Deleted"});
            
        }
    });
}
app.delete('/products/:id',deleteProduct)
//----------------------------------------Update Product Route----------------------------------------
updateProduct=(req,res,next)=>{
    const id =req.params.id;
    const {name,desc,price}=req.body;
    const result=Query.execute('update products set name=?,description=?,price=? where id=?',[name,desc,price,id],(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            if(rows.affectedRows==0) res.json({"message":"Product Not Found"});

            else res.json({"message":"Product Updated"});
            
        }
    });
}
app.put('/products/:id',updateProduct)
*/

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
app.listen(port, () => console.log(`App listening on port ${port}!`))

//----------------------------------------Try Import for ES6----------------------------------------

// import {x,demo} from './demo.mjs'; // importing the variables and the functions which are exported in the module.
// import alias_name from './demo.mjs'; // this is the alias name just carries the defualt function to get the defualt and the other functions:
import alias_name,{x,y,demo} from './demo.js';
console.log(x,y);
demo();
// import {mainDemo} from './demo.mjs';
console.log(alias_name().demo());
