import { Query } from "../../../databases/dbConnection.js";
import express from "express";
const productRouter = express.Router(); 
//we get the router object from express which is used to create routes in our application and handle the requests. where coming from the index.js file
//we are creating a router object and exporting it so that we can use it in the index.js file.

//----------------------------------------All Products Route----------------------------------------
//allProducts View EndPoint
productRouter.get('/products',(req,res,next)=>{
    var result=Query.execute('select * from products',(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json({message:"success",data:rows});
        }
    });
})
export {productRouter};





