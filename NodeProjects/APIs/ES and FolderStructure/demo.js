// ----------------------------------------Try Require for ES5----------------------------------------
// Using require
/*
let x=10;
let y=30;

// ---=== Three Types of Modules ===---
// ---=== 1. Core modules        ===---
// ---=== 2. Local modules       ===---
// ---=== 3. Third party modules ===---

module.exports.myX=x; //local module
module.exports.myY=y; 

// ---=== Exporting the module ===---
module.exports= {myX:x,myY:y};

function demo(){
    return "testing"
}
function mainDemo(){
        return {
            demo1:function(){
                return "hello world from demo1"
            },
            demo2:function(){
                return "hello world from demo2"
            },
            ROUTER:function(){
                return "OK!"
            }
        }
    }
demo(); //returns a function then that function return an object of functions
module.exports=demo;
// In calling the module it's gonna be like 'express' module:
const express=require('express'); //Cause the module is assigned to a Function.
const app=express();
module.exports.DemoFun=demo;

// assign all functions and variables to module.exports
module.exports={
    mainDemo,x,y
};
*/

// ----------------------------------------Try Import for ES6----------------------------------------
// Using import
// export let x=10; //write export before the variable
let x=10; 
let y=30;
// export function demo(){
//     console.log("Hello World");
// }
function demo(){
    console.log("Hello World");
}
export {
    x,y,demo
}

//default export 
// this means that the module can be imported without using the curly braces and giving it any Alias name just for one thing
export default function(){
    return{
        demo,
        y}
}

// export default function(){
//     console.log("Default Export");
// }