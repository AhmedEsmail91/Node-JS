
//----------------------------------------Update Product Route----------------------------------------
import express from "express";
import { Query } from "../../../databases/dbConnection.js";
const updateProductRouter = express.Router();
updateProductRouter.put('/products/:id',(req,res,next)=>{
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
})
export {updateProductRouter};