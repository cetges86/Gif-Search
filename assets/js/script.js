$(document).ready(function () {

    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=VI3fGPPXO4IGaZP0AmgPz6TTfTo8Eq7W&q=' + input + '&limit=25&offset=0&rating=G&lang=en'

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then()


    function createButtons {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("movie");
            // Added a data-attribute
            a.attr("data-name", movies[i]);
            // Provided the initial button text
            a.text(movies[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }

    }

})

