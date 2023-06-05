const express = require("express");
const {handelGenrateNewShortUrl, handelGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/", handelGenrateNewShortUrl);

router.get("/analytics/:shortId",handelGetAnalytics )

module.exports = router;