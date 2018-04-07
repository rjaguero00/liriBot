require("dotenv").config();

var keys = require('./keys.js');

var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");

//Keys for spotify and twitter
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var input = process.argv[3];


function myTweets() {
    var params = {
        screen_name: 'RJAguero15',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

function spotifyThisSong() {

}

function movieThis() {

}

function dwis() {

}