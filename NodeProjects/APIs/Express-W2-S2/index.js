const express = require("express");
// Express is a function
const app=express();
// app is an object
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
// GET request
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.get("/about",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.send("<h1>About Us</h1>");
});
const FakeData=
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 28,
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Maple Street, Springfield, IL",
    "occupation": "Software Developer"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 34,
    "email": "jane.smith@example.com",
    "phone": "+0987654321",
    "address": "456 Oak Avenue, Metropolis, NY",
    "occupation": "Graphic Designer"
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "age": 25,
    "email": "alice.johnson@example.com",
    "phone": "+1122334455",
    "address": "789 Pine Lane, Gotham, NJ",
    "occupation": "Data Analyst"
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "age": 42,
    "email": "bob.brown@example.com",
    "phone": "+2233445566",
    "address": "321 Cedar Court, Star City, CA",
    "occupation": "Project Manager"
  },
  {
    "id": 5,
    "name": "Charlie Davis",
    "age": 37,
    "email": "charlie.davis@example.com",
    "phone": "+3344556677",
    "address": "654 Birch Boulevard, Central City, TX",
    "occupation": "Marketing Specialist"
  },
  {
    "id": 6,
    "name": "Emily Evans",
    "age": 29,
    "email": "emily.evans@example.com",
    "phone": "+4455667788",
    "address": "987 Walnut Street, Coast City, FL",
    "occupation": "Financial Analyst"
  },
  {
    "id": 7,
    "name": "Frank Green",
    "age": 31,
    "email": "frank.green@example.com",
    "phone": "+5566778899",
    "address": "159 Elm Drive, Keystone City, GA",
    "occupation": "Accountant"
  },
  {
    "id": 8,
    "name": "Grace Harris",
    "age": 26,
    "email": "grace.harris@example.com",
    "phone": "+6677889900",
    "address": "753 Chestnut Avenue, Starling City, AZ",
    "occupation": "Software Engineer"
  },
  {
    "id": 9,
    "name": "Henry White",
    "age": 35,
    "email": "henry.white@example.com",
    "phone": "+7788990011",
    "address": "852 Maple Boulevard, National City, CO",
    "occupation": "HR Specialist"
  },
  {
    "id": 10,
    "name": "Ivy Black",
    "age": 30,
    "email": "ivy.black@example.com",
    "phone": "+8899001122",
    "address": "951 Cedar Lane, Bludhaven, NV",
    "occupation": "Product Manager"
  }
]
app.get("/api",(req,res)=>{
    res.json(FakeData); // instead of res.end(JSON.stringify(FakeData));
});
app.get('/file',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
/* through id

app.get("/api/:id",(req,res)=>{
    const user=FakeData.find(
        (x)=>x.id===parseInt(req.params.id)
    );
    if(!user){
        res.status(404).send("User not found");
    }
    res.json(user);
});
*/
