var keys = require('./keys.js');

var Request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

/*
8. Make it so liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
*/
function showSpotifyResults(data) {
    console.log("data", data.tracks.total);
    console.log("Testing", data.tracks.items.length) //20 Tracks
//                 var fs = require("fs");
    //Find a Preview URL
    var preview_url;
    for (i=0; i < data.tracks.items.length; i++) {
        //if (data.tracks.items[i].preview_url === null) { console.log("FOUND IT"); break;}
        if (data.tracks.items[i].preview_url != null) { preview_url = data.tracks.items[i].preview_url; console.log("FOUND IT"); break;}
        //console.log("Album" + i, data.tracks.items[i].album);
//                    fs.writeFile("Album.json", JSON.stringify(data.tracks.items[i].album, null, 2), function(myError) {
//                        if (myError) {
//                          return console.log(myError);
//                        }
//                    });
    }
//                console.log("Album.txt was updated!");
    console.log("Movie Title:", movieName);
    console.log("preview_url:", preview_url);
    //console.log("Testing1", data.tracks.items.length); //Length = 20
    //console.log("Testing2", data.tracks.items[0].album);
    //console.log("Testing3", data.tracks.items[0].album.name); //Album's Name
    console.log("Album Name:", data.tracks.items[0].album.name);
    //console.log("Testing4", data.tracks.items[0].album.artists.length); //Length = 1
    //console.log("Testing5", data.tracks.items[0].album.artists[0].name); //Artist's Name
    console.log("Artist's Name:", data.tracks.items[0].album.artists[0].name);
    //console.log("Testing6", data.tracks.items[0]); //preview_url);
    //fs.writeFile("liri.txt", JSON.stringify(data, null, 2), function(myError) {
    //console.log(JSON.stringify(data, null, 2));
    //console.log("respoonse[0]", JSON.stringify(data[0], null, 2));
    //console.log("body", data.getTrack);
    //console.log(data);

};

var cmdIn = process.argv[2];

switch (cmdIn) {
    case "my-tweets":
        var client = new Twitter({
            consumer_key: 'Ov657c4j871UKNG73Tb7bVlVf',
            consumer_secret: 'DpRpVKXPYSaLhv7h4WBjjmyAD7ovwlnCxAD4DugS6EQxm4LqXT',
            access_token_key: '911638568795242498-1p8QY34iEO1pUF0ITeaZsIY7o0CdkVi',
            access_token_secret: 'fclNPnrUeOKp7QZ9jq51BEWxpLG6uNrKLYruSGPpUzQ3D'
        });
 
//        var client = new Twitter(keys.twitterKeys);
        var params = {screen_name: 'larrypUCFBCamp'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log("error", error);
                //throw error;
            } else {
                console.log(JSON.stringify(tweets, null, 2));
                for (var i = 0; (  (i < tweets.length) && (i < 20) ); i++) {
                    console.log("Tweet[" + i + "]: " + tweets[i].text);
                }
            }
        });
        break;
    case "spotify-this-song":
        /*
            * Artist(s)
            
            * The song's name
            
            * A preview link of the song from Spotify
            
            * The album that the song is from

            * If no song is provided then your program will default to "The Sign" by Ace of Base.
        */
        var spotifyClient = new Spotify({
            id: "dd3d4f9bc5b2431e99d7c5eaa27f69da",
            secret: "9b3a2fd81b144b688a60e319aac64ba7"
        });
    
        var spotify = new Spotify({
            id: "dd3d4f9bc5b2431e99d7c5eaa27f69da",
            secret: "9b3a2fd81b144b688a60e319aac64ba7"
        });
        var notFound = false;
        var songName = 'All the Small Things';
        
        songName = "FJDJFSLDFJF";
        spotify
            .search({ type: 'track', query: songName })
            .then(function(response) {
                if (response.tracks.total == 0) {
                    //Nothing Found!
                    songName = "Ace of Base";
                    notFound = true;
                } else {
                    showSpotifyResults(response);
                }
            })
            .catch(function(err) {
                console.log("err", err);
            });
            console.log("AFTER SPOTIFY 1");
        if (notFound) {
            console.log("Calling spotify Again!");
            spotify
                .search({ type: 'track', query: songName })
                .then(function(response) {
                    if (response.tracks.total == 0) {
                        console.log("Severe Error: Cannot Find 'Ace of Base'");
                    } else {
                        showSpotifyResults(response);
                    }
                })
                .catch(function(err) {
                    console.log("err", err);
                });
        }
        break;
    case "movie-this":
/*
        One Param: Movie Title
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `40e9cece`.
*/
        // Grab the movieName which will always be the third node argument.
        var movieName = process.argv[3];
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

        // This line is just to help us debug against the actual URL.
        console.log("queryUrl", queryUrl);

        request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("response", JSON.stringify(response, null, 2))
            console.log("body", JSON.stringify(body, null, 2))
            //console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoes);
        }
        });
        break;
    case "do-what-it-says":
        break;
    default:
        break;
}



