import { Query } from "../../../databases/dbConnection.js";
const allProducts=(req,res,next)=>{
    var result=Query.execute('select * from products',(err,rows,filed)=>{
        if(err){
            res.json({"message":err.sqlMessage})
        }
        else{
            res.json({message:"success",data:rows});
        }
    });
}
const singleProduct=(req,res,next)=>{
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
const updateProduct=(req,res,next)=>{
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
export default {allProducts,singleProduct,addProduct,updateProduct,deleteProduct}; // how to call them
// import productController from './product.controller.js';
// router.get('/products',productController.index);