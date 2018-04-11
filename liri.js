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

selector(command, input);

function selector(cmd, inp) {
    switch (cmd) {
        case "myTweets":
            myTweets();
            break;
        case "spotify_this":
            spotifyThisSong(inp);
            break;
        case "movie_this":
            movieThis(inp);
            break;
        case "do-what-it-says":
            dwis();
            break;
        default:
            console.log("Please enter a command!");
            break;
    }
}

function myTweets() {
    var params = {
        screen_name: 'RJAguero15',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("----------------------------------------------");
                console.log("Twitter Username: " + tweets[0].user.screen_name);
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
                console.log("----------------------------------------------");

                //Append to log.txt file.
                fs.appendFile("log.txt", "\n" + "Twitter Username: " + tweets[0].user.screen_name + "\n" + "Tweet: " + tweets[i].text + "\n" + "Date: " + tweets[i].created_at, function (error) {

                    // If an error was experienced we say it.
                    if (error) {
                        console.log(error);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Has Been Added!");
                    }

                });
            }
        }
    });
}

function spotifyThisSong(song) {
    //song = process.argv[2];
    if (song === "") {
        song = "First Date";
    }
    spotify.search({
        type: 'track', query: song
    }, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var songReport = data.tracks.items[0];
            console.log("----------------------------------------------");
            console.log("Artist: " + songReport.artists[0].name);
            console.log("Title: " + songReport.name);
            console.log("Album: " + songReport.album.name);
            console.log("Preview URL: " + songReport.preview_url);
            console.log("----------------------------------------------");

            //Append to log.txt file.
            fs.appendFile("log.txt", "\n" + "Artist: " + songReport.artists[0].name + "\nTitle: " + songReport.name + "Album: " + songReport.album.name + "Preview URL: " + songReport.preview_url, function (error) {

                // If an error was experienced we say it.
                if (error) {
                    console.log(error);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Has Been Added!");
                }

            });
        }
    });
}

function movieThis(movie) {
    //movie = process.argv[2];
    var movieInfo = movie;
    if (movieInfo === "") {
        movieInfo = "The Godfather"
    }
    var omdbUrl = "http://www.omdbapi.com/?t=" + movieInfo + "&y=&plot=short&apikey=66bad2df"
    request(omdbUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            console.log("----------------------------------------------");
            console.log("Title: " + body.Title);
            console.log("Year Released: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            console.log("Produced In: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("----------------------------------------------");

            //Append to log.txt file.
            fs.appendFile("log.txt", "\nTitle: " + body.Title + "\nYear Released: " + body.Year + "\nIMDB Rating: " + body.imdbRating + "\nRotten Tomatoes Rating: " + body.Ratings[1].Value + "\nProduced In: " + body.Country + "\nLanguage: " + body.Language + "\nPlot: " + body.Plot + "\nActors: " + body.Actors, function (error) {

                // If an error was experienced we say it.
                if (error) {
                    console.log(error);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Has Been Added!");
                }

            });
        }
    });
}


function dwis() {
    //Open file and break apart string in to command and input
    //inside of then for oepn file
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(", ");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });
    selector(c, i);
}

dwis();

