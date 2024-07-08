//====================================_Inner_HTML_Scripting_====================================
/*
// function showAlert(message){
//     window.alert("Hello World!"+message);//This will show an alert box with the message (related to the browser)
// }
// document vs window objects in JavaScript
// /* 
//     * Document object represents the HTML document that is displayed in that window.
//     * Window object represents the browser window or tab that contains the document.
// *

//This will change the content of the element with id="demo" (related to the document)
document.getElementById("demo").innerHTML = "Welcome JS!";
// innerHTML property sets or returns the HTML content (inner HTML) of an element.
function changeContent(content=''){
    if(content != ''){
        document.getElementById("demo").innerHTML = "Welcome JS!";
    }
    else{
        document.getElementById("demo").innerHTML = content;
    }
}
window.console.log('Hello World!')
*/
//====================================_Variables_====================================
/* var x = 5;
// var y = 6;
// var z = x + y;
// console.log(z);
// //====================================_Input_====================================
// var person = prompt("Please enter your name", "Harry Potter");
// //Or
// // var person = window.prompt("Please enter your name", "Harry Potter");
// if (person != null) {
//     console.log("Hello " + person + "! How are you today?");
// }
*/
//====================================_Data Types_====================================
/*
// 1. String
var name = "John";
// 2. Number
var age = 30;
// 3. Boolean
var isMale = true;
// 4. Array
var fruits = ["apple", "orange", "mango"];
// 5. Object
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
// 6. Undefined
var car;
// 7. Null
var person = null;
*/
//====================================_Data Types Conversion_====================================
/*
// 1. String to Number
// var x = "10";
// console.log(parseInt(x), typeof(parseInt(x)));
// // 2. Number to String
// var x = 10;
// console.log(x.toString(), typeof(x.toString()));
// // 3. Boolean to String
// var x = true;
// console.log(x.toString(), typeof(x.toString()));
// // 4. Date to String
// var x = new Date();
// console.log(x.toString(), typeof(x.toString()));
// // 5. Array to String
// var fruits = ["Banana", "Orange", "Apple"];
// console.log(fruits.toString(), typeof(fruits.toString()));
// // 6. String to Array
// var str = "a,b,c,d,e,f";
// console.log(str.split(","), typeof(str.split(",")));
*/
//====================================_Operators_====================================
/*
// 1. Arithmetic Operators
var x = 5;
var y = 2;
var z = x + y;
console.log(z);
// 2. Assignment Operators
var x = 10;
x += 5;
console.log(x);
// 3. Comparison Operators
var x = 5;
var y = 2;
console.log(x == y);
// 4. Logical Operators
var x = 6;
console.log(x > 0 && x < 10);
// 5. Type Operators
var x = 5;
console.log(typeof x);
// 6. Bitwise Operators
var x = 5;
var y = 1;
console.log(x & y);
// 7. String Operators
var x = "Hello";
var y = "World!";
console.log(x + " " + y);
// 8. Conditional (Ternary) Operator
var age = 20;
var voteable = (age < 18) ? "Too young":"Old enough";
console.log(voteable);
*/
//====================================_Objects_====================================
/*
var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};
console.log(person.firstName + " is " + person.age + " years old.");
*/
//====================================_Events_====================================
/*
// 1. onClick
function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}
// 2. onChange
function myFunction() {
    var x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
}
// 3. onMouseOver
function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World!";
}
// 4. onLoad
function myFunction() {
    alert("Page is loaded");
}
    */
//====================================_Strings_====================================
/*
// 1. String Length
var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(txt.length);
// 2. Finding a String in a String
var str = "Please locate where 'locate' occurs!";
console.log(str.indexOf("locate"));
// 3. Searching for a String in a String
var str = "Please locate where 'locate' occurs!";
console.log(str.search("locate"));
// 4. Extracting String Parts
var str = "Apple, Banana, Kiwi";
console.log(str.slice(7, 13));
// 5. Replacing String Content
var str = "Please visit Microsoft!";
console.log(str.replace("Microsoft", "W3Schools"));
// 6. Converting to Upper and Lower Case
var text1 = "Hello World!";
console.log(text1.toUpperCase());
console.log(text1.toLowerCase());
// 7. Concatenating Strings
var text1 = "Hello";
var text2 = "World";
console.log(text1.concat(" ", text2));
// 8. Extracting String Characters
var str = "HELLO WORLD";
console.log(str.charAt(0));
// 9. Converting a String to an Array
var txt = "a,b,c,d,e";   // String
console.log(txt.split(","));
*/
//====================================_Numbers_====================================
/*
// 1. toString()
var x = 123;
console.log(x.toString());
// 2. toExponential()
var x = 9.656;
console.log(x.toExponential(2));
// 3. toFixed()
var x = 9.656;
console.log(x.toFixed(0));
// 4. toPrecision()
var x = 9.656;
console.log(x.toPrecision(2));
// 5. valueOf()
var x = 123;
console.log(x.valueOf());
// 6. Number()
console.log(Number(true));
console.log(Number(false));
console.log(Number("10"));
console.log(Number("10 20"));
*/
//====================================_Loops_====================================
/*
// 1. for Loop
var cars = ["BMW", "Volvo", "Saab", "Ford"];
var i;
var text_for = "";
for (i = 0; i < cars.length; i++) {
    text_for +="<li>"+ cars[i]+"</li>";
}
document.write("<ol>"+text_for);
// 2. while Loop
var while_text = "";
var i = 0;
while (i < 10) {
    while_text += "<br>The number is " + i;
    i++;
}
console.log(while_text);
// 3. do while Loop
var do_text = "";
var i = 0;
do {
    do_text += "<br>The number is " + i;
    i++;
}
while (i < 10);
console.log(do_text);
*/
//====================================_Functions_====================================
/*
function myFunction(p1, p2) {
    return p1 * p2;
}
console.log(myFunction(4, 3));
*/
//====================================_Arrow_Function_====================================
/*
// making function inside object, and making function inside function inside object
let Person={
    name:'Ahmed',
    age:95,
    gender:'male',
    foo:function(){
        console.log('Welcome from Person.foo function!')
        
        function demo(name){
            console.log('Welcome from test function!'+name)
        }
        demo('Ahmed')
    }
}
Person.foo();
console.log('\n\n\n\n\n\n')

let Person={
    name:'Ahmed',
    age:95,
    gender:'male',

    foo:function(){
        let that=this; // this will refer to the object Person
        function demo(){
            //that will refer to the object Person
            //but this in this scope will refer to the upper function [foo()].
            console.log(that.name);
            console.log(that.age);
            console.log(that.gender);
        }
        demo();
    }
}
Person.foo();
// we can solve it using the arrow function:
let Person1={
    name:'Islam',
    age:15,
    gender:'Male',

    foo:function(){
        let demo=()=>{
            console.log('Hola\t'+this.name);
            console.log('HOlllllllA\t'+this.age);
            console.log('yr '+this.gender);
        }
        demo();

        let greating=(name)=>'Hello '+name;
        console.log(greating('Ali'));
    }
}
Person1.foo();
*/
//====================================_Destructing_====================================
/*
let Obj={'name':'Omar',
    'age':25,
    'gender':"male"};

let {name,age,sex}=Obj
console.log(name)
console.log(age)
console.log(sex)*/
//====================================_CallBack Implementation_====================================
/*
// so we can pass function to function and call it in the main function which means (call back the function).
function greet(name){
    console.log('Hello '+name())
    console.log(name())
}
greet(function(){
    console.log('demo');
    return 'ahmedddd'
})
console.log(console.log('Testing')  );*/
//====================================_Promise, Async, Await_====================================
/*
// let x=fn=>console.log(fn+'nd');
// let x1=fn=>setTimeout(() => {
//     console.log(fn+'st')
// }, 2000);
// function calling(){
//     x1('1'); // while we write it first logically it must excute first but once js is async language it will excute last.
//     x('2');
// }
// calling();
// while js is async language so we can say that the process that finish first will be executed first.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Using SetTimtout=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
console.log('done1'); // this will be executed first

// setTimeout(callable method, #Time to execute the callable);

setTimeout(()=>{
    console.log('done2')},
            3000); // this will be executed fifth
setTimeout(()=>{
    console.log('done3')},
            1000); // this will be executed third
setTimeout(()=>{
    console.log('done4')},
            2000); // this will be executed fourth

console.log('done5'); // this will be executed second

// lets assume we wanna a function to execute after another function like excute f2() after f1().
// we have several ways to do that:


//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Copilot =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// function f1(callback){
//     setTimeout(()=>{
//         console.log('f1 is done')
//         callback()
//     },2000)
// }
// function f2(){
//     console.log('f2 is done')
// }
// f1(f2);
// // 2. using promise
// function f3(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('f3 is done')
//             resolve()
//         },2000)
//     })
// }
// function f4(){
//     console.log('f4 is done')
// }
// f3().then(f4);
// // 3. using async and await
// async function f5(){
//     await new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('f5 is done')
//             resolve()
//         },2000)
//     })
// }
// function f6(){
//     console.log('f6 is done')
// }
// f5().then(f6);
// // 4. using async and await with try and catch
// async function f7(){
//     try{
//         await new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 console.log('f7 is done')
//                 resolve()
//             },2000)
//         })
//     }catch(e){
//         console.log(e)
//     }
// }
// function f8(){
//     console.log('f8 is done')
// }
// f7().then(f8);
// // 5. using async and await with try and catch and return value
// async function f9(){
//     try{
//         await new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 console.log('f9 is done')
//                 resolve('done')
//             },2000)
//         })
//     }catch(e){
//         console.log(e)
//     }
// }
// function f10(){
//     console.log('f10 is done')
// }
// f9().then((data)=>{
//     console.log(data)
//     f10()
// });



// The following means that we can't execute the next function until the previous function is done.
// so instead of the previous result which is :
// done3,done2,done1 -> cause it makes the function that takes the longest time to be executed first.

// The code is using callback functions to ensure that the functions getPasta, getPizza, and getSalad are executed in a specific sequence. 
// By using callbacks, the code waits for each function to finish executing before moving on to the next one. 
// This helps to handle the execution time and ensures that the functions are executed in the desired order, regardless of the time it takes for each function to complete.

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Main-Functions -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// function getPasta(x){
//     setTimeout(() => {
//         console.log('done1')
//         x();
//     }, 3000);
// }
// function getPizza(x){
//     setTimeout(() => {
//         console.log('done2')
//         x();
//     }, 2000);
// }
// function getSalad(){
//     setTimeout(() => {
//         console.log('done3')
//     }, 1000);
// }
// ---------------------------- Callback ----------------------------
// getPasta(function(){
//     getPizza(function(){
//         getSalad()
//     });
// });
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- Main-Functions-with-Promise-Instance -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function getPasta(){
    return new Promise((resolved,rejected)=>{
        setTimeout(() => {
            document.getElementById('demo').innerHTML='done1'
            if(true){
                resolved();
            }
            else{
                rejected()
            }
        }, 3000);
    })
}

function getPizza(){
    return new Promise((resolved,rejected)=>{
        setTimeout(() => {
            document.getElementById('demo').innerHTML='done2'
            if(true){
                resolved();
            }
            else{
                rejected()
            }
        }, 2000);
    })
}
function getSalad(){
    setTimeout(() => {
        document.getElementById('demo').innerHTML='done3'
    }, 1000);
}

// ---------------------------- Promise ----------------------------
// getPasta().then(function(){
//     getPizza().then(function(){
//         getSalad()
//     })
// });
//---------------------------- Async and Await ----------------------------

// async function demo(){
//     await getPasta()
//     await getPizza()
//     await getSalad()
// }
// demo()
// we can use Await&Async to make the code more readable and easy to understand,and most of functions is Nodejs return Promise.
//---------------------------- Then & Catch ----------------------------
// getPasta().then(
//     ()=>{
//     getPizza().then(
//         ()=>{getSalad()})
//         .catch(()=>{document.getElementById('demo').innerHTML='Error Catched';});
//     }
// ).catch(
//     function(){
//         document.getElementById('demo').innerHTML='Error Catched';
//     }
// );
*/
//====================================_Mapping&Foreach_====================================
/*
let x=[1,2,3,4,5,6,7,8,9,10];
result=x.map((element)=>{return 'Ahmed '+element})
console.log(result)
//====================================_Foreeach_====================================
let res=x.forEach((element)=>{console.log('foreach element '+element)})
console.log(res)
// the difference between map and foreach is that map return the result of the function while foreach return undefined(void).
*/
//====================================_YARN_&_NPM_====================================
/*
// npm (node package manager) is a package manager for JavaScript programming language, and it is the default package manager for Node.js.
// https://www.npmjs.com/package
// yarn is a package manager for JavaScript programming language, and it is the default package manager for React.js.
// Yarn is a package manager for JavaScript programming language. It offers several advantages over npm:
// - Yarn is faster than npm, as it uses parallel processing to install packages.
// - Yarn is more secure than npm, as it uses checksums to verify package integrity.
// - Yarn is more reliable than npm, as it has a deterministic dependency resolution algorithm.
// - Yarn is more deterministic than npm, as it creates a lockfile to ensure consistent installations.
// - Yarn is more reproducible than npm, as it guarantees the same installation across different environments.
// - Yarn is more parallel than npm, as it can download and install packages concurrently.
// - Yarn has a better offline mode than npm, as it caches packages locally for offline use.
// - Yarn can continue downloading the package after the network connection is lost by checking which files have been installed and keep downloading on it.
*/
//====================================_Class_====================================
/*
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log('Hello '+this.name)
    }
}
let person=new Person('Ahmed',25)
person.greet()
console.log(person.name)
console.log(person.age)
class Student extends Person{
    constructor(name,age,grade){
        super(name,age);
        this.grade=grade;
    }
    greet(){
        console.log('Hello '+this.name+' your grade is '+this.grade)
    }
}
let student=new Student('Ali',22,95)
student.greet()
console.log(student.name)
*/