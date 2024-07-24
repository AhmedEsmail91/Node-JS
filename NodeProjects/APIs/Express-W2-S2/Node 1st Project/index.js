//----------------------------------------Establishing the Server----------------------------------------
// node-express
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
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
            res.json(rows)
        }
    });
}
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

