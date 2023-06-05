const shortid = require("shortid");
const URL = require("../models/url")

async function handelGenrateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({err: "Not found url"});
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    res.render(`home`, {
        id: shortId
    })
}

async function handelGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}

module.exports = {
    handelGenrateNewShortUrl,
    handelGetAnalytics,
}