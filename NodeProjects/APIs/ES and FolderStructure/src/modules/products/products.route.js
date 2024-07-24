import { Query } from "../../../databases/dbConnection.js";

function allProducts(app){
    app.get('/products', (req, res) => {
        Query.execute('select * from products', (err, rows) => {
            if (err) {
                res.json({"message": err.message});
            } else {
                res.json({message: "success", data: rows});
            }
        });
    });
}
function showProduct(app){
    app.get('/products/:id', (req, res) => {
        const {id} = req.params;
        Query.execute('select * from products where id=?', [id], (err, rows) => {
            if (err) {
                res.json({"message": err.message});
            } else {
                res.json(rows);
            }
        });
    });
}
function addProduct(app) {
    app.post('/products',(req,res,next)=>{
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
}
function deleteProduct(app){
    app.delete('/products/:id',(req,res,next)=>{
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
    });
}
function updateProduct(app){
    app.put('/products/:id',(req,res,next)=>{
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
    });
}
export{allProducts, showProduct,addProduct,deleteProduct,updateProduct}; 