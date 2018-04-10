require("dotenv").config();

var keys = require('./key.js');

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
            for (i = 0; i < tweets.length; i++) {
                console.log("----------------------------------------------");
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.log("----------------------------------------------");
            }
        }
    });
}

function spotifyThisSong(song) {
    spotify.search({
        type: 'track', query: 'song'
    }, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var songReport = data.tracks.items[0];
            console.log("----------------------------------------------");
            console.log("Artist: " + songReport.artist[0].name);
            console.log("Title: " + songReport.name);
            console.log("Album: " + songReport.album.name);
            console.log("Preview URL: " + songReport.preview_url);
            console.log("----------------------------------------------");
        }
    });
}

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdbApi.key;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);


        }
    });
}


function dwis() {

}

spotifyThisSong();