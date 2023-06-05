const express = require("express");
const cookiParser = require("cookie-parser");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth")
const path = require("path")
const connectToMongoDb = require("./connection");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const app = express();
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/urlshortner")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("error", err.massge);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookiParser());
app.use(checkForAuthentication);

// middlewares
app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});



app.listen(PORT, () => `Server Started at PORT at ${PORT}`);
