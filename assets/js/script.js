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
        $('#user-input').val('');
    });

    $(document).on('click', '.animal', function () {
        var animal = $(this).attr("data-animal");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=VI3fGPPXO4IGaZP0AmgPz6TTfTo8Eq7W&q=' + animal + '&limit=10&offset=0&lang=en'
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                var animalDiv = $('<div>');
                animalDiv.addClass('imgDiv')

                rating = response.data[i].rating;

                var p = $('<p>').text("Rating: " + rating);

                var animalImage = $('<img>');
                animalImage.addClass('gif');
                animalImage.attr('data-state', 'still');



                var still = response.data[i].images.fixed_width_still.url;
                var animate = response.data[i].images.fixed_width.url;
                console.log(animate);

                animalImage.attr('src', still);
                animalImage.attr('data-still', still)
                animalImage.attr('data-animate', animate);
                $(animalDiv).append(p);
                $(animalDiv).append(animalImage);

                $(animalDiv).hide().prependTo("#gif-display").fadeIn("2000");

                $(document).on('click', '.gif', function () {
                    var state = $(this).attr('data-state');

                    $('img').on('click', function () {

                        var still = $(this).attr('data-still');
                        var animate = $(this).attr('data-animate');

                        if (state === 'animate') {
                            $(this).attr('src', still);
                            $(this).attr('data-state', 'still');

                        } else if (state === 'still') {
                            $(this).attr('src', animate);
                            $(this).attr('data-state', 'animate');
                        }

                    })
                })

            };

        });
    });
});

