//----------------------------------------Delete Product Route----------------------------------------
import { Query } from "../../../databases/dbConnection.js";
import express from "express";
const deleteProductRouter = express.Router();
deleteProductRouter.delete('/products/:id',(req,res,next)=>{
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
})
export {deleteProductRouter};