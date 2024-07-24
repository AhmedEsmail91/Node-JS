//----------------------------------------Add Product Route----------------------------------------
import { Query } from "../../../databases/dbConnection.js";
import express from "express";

const addProductRouter = express.Router();
//addProduct EndPoint
addProductRouter.post('/products',(req,res,next)=>{
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
})
export {addProductRouter};