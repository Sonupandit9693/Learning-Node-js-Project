const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

// const upload = multer({storage });

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))

app.get("/" ,(req,res)=>{
    return res.render("homepage")
})

app.post("/upload", upload.single('profileImage'), (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`server started at PORT on ${PORT}`);
})