const http=require('http');
const fs=require('fs'); //this makes the file system module available to us
const aboutPage=fs.readFileSync('./about.html') // read the file synchronously
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
//Question:
// res.end() vs res.write()[chuncking the data]
const Server=http.createServer((req,res)=>{
    if(req.url==='/'){
        // res.setHeader('Content-type','text/html')
        res.write('<h1>Home Page</h1>')
        res.write('<h1>Home Page</h1>')
        res.write('<h1>Home Page</h1>')
        res.write('<h1>Home Page</h1>')
        res.write('<h1>Home Page</h1>')
        res.write('<h1>Home Page</h1>')// write is used to send data in chunks and makes the server keep loading cause it doesn't know when the data is finished
        res.end('<h1>Home Page</h1>') // end is used to send the data in one go and tells the server that the data is finished
    }
    else if(req.url==='/about' && req.method==='GET'){
        res.end(aboutPage)
    }
    else if(req.url==='/api' && req.method==='GET'){
        
        res.end(JSON.stringify(FakeData))
    }
    else if(req.url==='/adduser' && req.method==='POST'){
        req.on('data',(chunk)=>{
            console.log(JSON.parse(chunk))
        })
        res.end('User Added')
    }
    else{
        res.end('404 Page')
    }
    console.log(req)
});
Server.listen(3000,'192.168.40.118',()=>{
    console.log('Server is Running')
})
//HTTP methods
//GET->Browser is requesting data from the server
//POST
//PUT->Update the whole resource
//PATCH->Update a part of the resource [Better Performance for large data]
//DELETE
 
