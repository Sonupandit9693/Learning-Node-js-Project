const { log } = require("console")
const http = require("http")
const fs = require("fs")
const url = require("url")

const mySrever = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New request recived \n`;
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    fs.appendFile("./Demo.txt", log, (err, data)=>{
        switch(myUrl.pathname){
            case "/" :
            res.end("Home page");
            break;
            case "/about" : 
            res.end("I am Sonu kumar");
            break;
            default :
            res.end("404 Not found")
        }
    })

})

mySrever.listen(8000, ()=>{
    console.log("server is started");
})