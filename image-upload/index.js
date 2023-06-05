const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    estination: function (req, file, cb){
       return cb(null, "./uploads")
    },
    filename : function(req,file,cb){
      return  cb(null, `${Date.now()}-${file.originalname}`)
    },
});

const upload = multer({storage });

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))

app.get("/" ,(req,res)=>{
    return res.render("homepage")
})
const cpUpload = upload.fields([{ name: 'profileimage', maxCount: 1 }])
app.post("/upload", cpUpload, (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`server started at PORT on ${PORT}`);
})