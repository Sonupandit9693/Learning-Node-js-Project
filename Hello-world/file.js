const { log } = require("console")
const fs = require("fs")
const os = require("os")

// sync work fs 
// fs.writeFileSync("./text.txt", "Hello world")

// Async work fs
// const result = fs.writeFile("./text.txt", "Another moments is comming in my life", (err)=>{
//     console.log("Error", err);
// })


// const response = fs.readFileSync("./text.txt", "utf-8")
// console.log(response);


// fs.readFile("./text.txt", "utf-8" , (err, result)=>{
//     if(err){
//         console.log("Error :", err);
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString() );
// fs.appendFileSync("./text.txt", `${Date.now()}Hey there i am presenting here \n`)

console.log(os.cpus().length);