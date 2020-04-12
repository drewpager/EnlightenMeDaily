"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Twit = require('twit');
var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
});
function clickToTweet(quote) {
    T.post('statuses/update', { status: `${quote} for Drew` }, function (err, data, response) {
        console.log(data);
    });
}
exports.clickToTweet = clickToTweet;
