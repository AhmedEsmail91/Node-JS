console.log('Hello NodeJs!!')
/**
 * Note: window.alert('NOT Running')// we can't excute (DOM or BOM)[Any Document page code] codes in Node server.
*/

// Types of Node Modules (3 Types)
/**
 * 1- Core Modules
 * 2- Local Modules (Created by urself)
 * 3- 3rd party Modules (installed using npm i Module_Name)
 */

//HTTP module used to create the server
const myHttp=require('http');
// import HTTP form (es5), but for es6 use (import) statement [it's like import http as myHTTP in python]


const users=[
    {name:'Ahmed',age:25,email:'ahmed@gmail.com'},
    {name:'Ahmed',age:25,email:'ahmed@gmail.com'},
    {name:'Ahmed',age:25,email:'ahmed@gmail.com'},
    {name:'Ahmed',age:25,email:'ahmed@gmail.com'},
    {name:'Ahmed',age:25,email:'ahmed@gmail.com'}
]
//routing to html file content
const fs=require('fs') // file system module
const htmlContent =fs.readFileSync('./about.html') // read the file synchronously

const Server=myHttp.createServer((req,res)=>{
    //Defualt Route
    if(req.url==='/'&&req.method==='GET'){
        res.setHeader('Content-Type','text/html')//it makes the server to understand the type of the content.
        // res.end('<img src="https://www.webopedia.com/wp-content/uploads/2021/12/Webo.Cisco_.C-Series-300x277.png" alt="Google Logo">')
        /**Chanege Array of objects to string 
         * JSON.stringify(users) => convert the array of objects to string
         */
        res.end(JSON.stringify(users));

    }
    //About Route
    else if(req.url==='/about'&&req.method==='GET'){
        // return the file content
        res.end(htmlContent)

    }
    //API Route
    else if(req.url==='/api'&&req.method==='GET'){
        res.end('api page')
    }
    //NotFound Route
    else{
        res.end('404 not found page')
    }

    console.log(req) // display the request (url, method, etc...)
    
    // the messsage will be displayed
}) // create the server which return listen() used to get the port for the server

Server.listen(3000,()=>{
    console.log('server is running')
}) // this server 
//Coding Endpoints (Routing)

