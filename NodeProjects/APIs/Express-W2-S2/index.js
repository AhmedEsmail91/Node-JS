const express = require("express");
// Express is a function
const Route=express();
// Route is an object
Route.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
// GET request
Route.get("/",(req,res)=>{
    res.send("Hello World");
});
Route.get("/about",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.send("<h1>About Us</h1>");
});
Users=
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
Route.get("/api",(req,res)=>{
    res.json(Users); // instead of res.end(JSON.stringify(Users));
});
/* get user by id
Route.get("/api/:id",(req,res)=>{
    const user=Users.find(
        (x)=>x.id===parseInt(req.params.id)
    );
    if(!user){
        res.status(404).send("User not found");
    }
    res.json(user);
});
*/

Route.get('/file',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

//POST
/*
Route.post("/addUser",(req,res)=>{
    // req.on('data',(chunck)=>{
    //     console.log(chunck.toString());
    // });
    console.log(req.body);
    res.send("User added successfully");
});
*/
Route.use(express.json()); // this will be applied (fire) to all the routes (get, post, delete, put, patch) in the application but must be decleared before the routes.
// POST+Middleware
Route.post("/addUser",(req,res)=>{
    // express.json() is a middleware that parses the incoming request with JSON payloads, it's like (urlencoded) for Template engines SSR
    
    console.log(req.body);
    // req.body==$request in php (it's an object) carrys the data from the client
    
    // OR SIMPLY:
    
    const {email}=req.body; // destructuring
    let isExist=Users.find((user)=>user.email===email);

    if(isExist){
      res.json({message:"Email already exists"});
    }
    else {
      const newUser={
        "id":Users.length+1,
        "name":req.body.name,
        "age":req.body.age,
        "email":req.body.email,
        "phone":req.body.phone,
        "address":req.body.address,
        "occupation":req.body.occupation
      };  
      Users.push(newUser);
      res.json({message:"User added successfully"});
    }

    // Users.push(req.body);
    
});

Route.delete("/deleteUser/:id",(req,res)=>{
    const userIndex=Users.findIndex(
        (user)=>user.id===parseInt(req.params.id) //req.params.id , params is an object that contains the route parameters like: /:id
    );
    // array.findIndex((value,index,array)=>{//---Manipulation---//}) => return -1 if the element not found in the array.
    if(userIndex < 0){
        res.status(404).send("User not found");
    }
    //array.splice(start,deleteCount).
    //start: index at which to start changing the array,
    //deleteCount: An integer indicating the number of elements in the array to remove from start.
    let deletedUser=Users.splice(userIndex,1);

    res.json({message:"User deleted successfully",deletedUser});
});

Route.put("/updateUser/:id",(req,res)=>{
    const userIndex=Users.findIndex(
        (user)=>user.id===parseInt(req.params.id)
    );
    
    if(userIndex < 0){
        res.status(404).send("User not found");
    }

    const updatedUser={
      "id":parseInt(req.params.id),
      "name":req.body.name,
      "age":req.body.age,
      "email":req.body.email,
      "phone":req.body.phone,
      "address":req.body.address,
      "occupation":req.body.occupation
    };  
    Users[userIndex]=updatedUser;
    res.json({message:"User updated successfully"});
});

//Middleware
// Structure of Node Middlewares : https://bit.ly/4bFAKHa
// how to add the middlewares in the route
Route.get('/middlewares_testing_1',
  (req,res,next)=>{res.send('Done1.0')}/*middleware 1*/, // the res.send() will stop the execution of the next middlewares so we need to use next() to pass the control to the next middleware.
  (req,res,next)=>{res.send('Done2.0')}/*middleware 2*/,
  (req,res,next)=>{res.send('Done3.0')}/*middleware 3*/);

Route.get('/middlewares_testing_2',
  (req,res,next)=>{next()}/*middleware 1*/, // the next middleware will be executed after the current middleware after using next().
  (req,res,next)=>{next()}/*middleware 2*/,
  (req,res,next)=>{next()}/*middleware 3*/, 
  (req,res,next)=>{res.json(Users)}/*middleware 4*/
);

// Assigning the middlewares to a variable.

let isLoggedin=true;

let auth=(req,res,next)=>{
  if(isLoggedin){
    next();
  }
  else{
    res.send("Can't Login.")
  }
}
Route.get('/auth_test',
  auth,
  (req,res,next)=>{res.json(Users)}
);

// Handling the Buffer instead of calling express.json() middleware:
// check line: 138.

/* Route.all vs Route.use
 *Route.use():
  app.use('/api', authenticateMiddleware); // Applies to all HTTP methods
  app.use('/api', logRequestMiddleware); // Runs after authentication for any HTTP method
 *Route.all():
  app.all('/api/resource', (req, res) => {
  *Logic here will execute for any HTTP method (GET, POST, etc.)
});*/