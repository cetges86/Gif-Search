$(document).ready(function () {
    var animals = ["Cat", "Dog", "Parakeet", "Snake", "Chimp", "Horse"]

    function createButtons() {
        $("#buttons").empty();

        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-animal", animals[i]);
            // Provided the initial button text
            a.text(animals[i]);
            // Added the button to the buttons-view div
            $("#buttons").append(a);
        };
    };


    createButtons();

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#user-input").val().trim();
        animals.push(newAnimal);
        createButtons();
    });

        $(document).on('click','.animal', function () {
            var animal = $(this).attr("data-animal");
            var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=VI3fGPPXO4IGaZP0AmgPz6TTfTo8Eq7W&q=' + animal + '&limit=10&offset=0&lang=en'
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    var animalDiv = $('<div>');

                    rating = response.data[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', response.data[i].images.fixed_height.url);
                    $(animalDiv).append(p);
                    $(animalDiv).append(animalImage);
                    $('#gif-display').prepend(animalDiv);
                };
            })

        })


    // $(document).on("click", ".movie", addGifs);




})

