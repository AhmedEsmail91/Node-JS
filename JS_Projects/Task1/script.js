// // function showAlert(message){
// //     window.alert("Hello World!"+message);//This will show an alert box with the message (related to the browser)
// // }
// // document vs window objects in JavaScript
// /* 
//     * Document object represents the HTML document that is displayed in that window.
//     * Window object represents the browser window or tab that contains the document.
// */

// //This will change the content of the element with id="demo" (related to the document)
// document.getElementById("demo").innerHTML = "Welcome JS!";
// // innerHTML property sets or returns the HTML content (inner HTML) of an element.
// function changeContent(content=''){
//     if(content != ''){
//         document.getElementById("demo").innerHTML = "Welcome JS!";
//     }
//     else{
//         document.getElementById("demo").innerHTML = content;
//     }
// }
// window.console.log('Hello World!')

// //====================================_Variables_====================================
// var x = 5;
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



// //====================================_Data Types_====================================
// // 1. String
// var name = "John";
// // 2. Number
// var age = 30;
// // 3. Boolean
// var isMale = true;
// // 4. Array
// var fruits = ["apple", "orange", "mango"];
// // 5. Object
// var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
// // 6. Undefined
// var car;
// // 7. Null
// var person = null;
//====================================_Data Types Conversion_====================================
// 1. String to Number
var x = "10";
console.log(parseInt(x), typeof(parseInt(x)));
// 2. Number to String
var x = 10;
console.log(x.toString(), typeof(x.toString()));
// 3. Boolean to String
var x = true;
console.log(x.toString(), typeof(x.toString()));
// 4. Date to String
var x = new Date();
console.log(x.toString(), typeof(x.toString()));
// 5. Array to String
var fruits = ["Banana", "Orange", "Apple"];
console.log(fruits.toString(), typeof(fruits.toString()));
// 6. String to Array
var str = "a,b,c,d,e,f";
console.log(str.split(","), typeof(str.split(",")));




// //====================================_Operators_====================================
// // 1. Arithmetic Operators
// var x = 5;
// var y = 2;
// var z = x + y;
// console.log(z);
// // 2. Assignment Operators
// var x = 10;
// x += 5;
// console.log(x);
// // 3. Comparison Operators
// var x = 5;
// var y = 2;
// console.log(x == y);
// // 4. Logical Operators
// var x = 6;
// console.log(x > 0 && x < 10);
// // 5. Type Operators
// var x = 5;
// console.log(typeof x);
// // 6. Bitwise Operators
// var x = 5;
// var y = 1;
// console.log(x & y);
// // 7. String Operators
// var x = "Hello";
// var y = "World!";
// console.log(x + " " + y);
// // 8. Conditional (Ternary) Operator
// var age = 20;
// var voteable = (age < 18) ? "Too young":"Old enough";
// console.log(voteable);
// //====================================_Functions_====================================
// function myFunction(p1, p2) {
//     return p1 * p2;
// }
// console.log(myFunction(4, 3));
// //====================================_Objects_====================================
// var person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 50,
//     eyeColor: "blue"
// };
// console.log(person.firstName + " is " + person.age + " years old.");
// //====================================_Events_====================================
// // 1. onClick
// function displayDate() {
//     document.getElementById("demo").innerHTML = Date();
// }
// // 2. onChange
// function myFunction() {
//     var x = document.getElementById("fname");
//     x.value = x.value.toUpperCase();
// }
// // 3. onMouseOver
// function myFunction() {
//     document.getElementById("demo").innerHTML = "Hello World!";
// }
// // 4. onLoad
// function myFunction() {
//     alert("Page is loaded");
// }
// //====================================_Strings_====================================
// // 1. String Length
// var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// console.log(txt.length);
// // 2. Finding a String in a String
// var str = "Please locate where 'locate' occurs!";
// console.log(str.indexOf("locate"));
// // 3. Searching for a String in a String
// var str = "Please locate where 'locate' occurs!";
// console.log(str.search("locate"));
// // 4. Extracting String Parts
// var str = "Apple, Banana, Kiwi";
// console.log(str.slice(7, 13));
// // 5. Replacing String Content
// var str = "Please visit Microsoft!";
// console.log(str.replace("Microsoft", "W3Schools"));
// // 6. Converting to Upper and Lower Case
// var text1 = "Hello World!";
// console.log(text1.toUpperCase());
// console.log(text1.toLowerCase());
// // 7. Concatenating Strings
// var text1 = "Hello";
// var text2 = "World";
// console.log(text1.concat(" ", text2));
// // 8. Extracting String Characters
// var str = "HELLO WORLD";
// console.log(str.charAt(0));
// // 9. Converting a String to an Array
// var txt = "a,b,c,d,e";   // String
// console.log(txt.split(","));
// //====================================_Numbers_====================================
// // 1. toString()
// var x = 123;
// console.log(x.toString());
// // 2. toExponential()
// var x = 9.656;
// console.log(x.toExponential(2));
// // 3. toFixed()
// var x = 9.656;
// console.log(x.toFixed(0));
// // 4. toPrecision()
// var x = 9.656;
// console.log(x.toPrecision(2));
// // 5. valueOf()
// var x = 123;
// console.log(x.valueOf());
// // 6. Number()
// console.log(Number(true));
// console.log(Number(false));
// console.log(Number("10"));
// console.log(Number("10 20"));
//====================================_Loops_====================================
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
