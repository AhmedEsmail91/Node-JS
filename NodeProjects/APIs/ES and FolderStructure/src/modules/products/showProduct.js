//----------------------------------------Show Product Route----------------------------------------
import express from "express";
import { Query } from "../../../databases/dbConnection.js";
const showProductRouter = express.Router();
// Calling showProduct View EndPoint
showProductRouter.get('/products/:id',(req,res,next)=>{
    const {id}=req.params;
    const result=Query.execute('select * from products where id=?',[id],(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json(rows)
        }
    });
})
export {showProductRouter};