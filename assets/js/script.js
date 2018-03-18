$(document).ready(function () {
    var animals = ["Cat", "Dog", "Parakeet", "Snake", "Chimp", "Horse"]

    //generates buttons for each item in animal array
    function createButtons() {
        $("#buttons").empty();

        for (var i = 0; i < animals.length; i++) {
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#buttons").append(a);
        };
    };

    createButtons();
    //adds animals by entering value in input field
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#user-input").val().trim();
        animals.push(newAnimal);
        createButtons();
        $('#user-input').val('');
    });
    //grabs new gifs instead of the same 10 gifs over and over again
    var clickCount = 0;

    $(document).on('click', '.animal', function () {
        //sets up API call
        var animal = $(this).attr("data-animal");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=VI3fGPPXO4IGaZP0AmgPz6TTfTo8Eq7W&q='${animal}&limit=10&offset=${clickCount}&rating=PG-13&lang=en`
        //sets up "offset" value to grab different gifs each time
        clickCount = clickCount + 10;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                //creates new div with still gif inside
                var animalDiv = $('<div>');
                animalDiv.addClass('imgDiv text-center');

                var rating = response.data[i].rating;
                //download button target
                var gifDownload = response.data[i].images.original_mp4.mp4;
                //adds rating and download button
                var p = $('<p>').html(`Rating:  ${rating} 
                <a href ='${gifDownload}' download>
                <i title= 'Download Gif' class="fas fa-download"></i>
                </a>`);
                p.addClass('modal-title');

                var animalImage = $('<img>');
                animalImage.addClass('gif');
                animalImage.attr('data-state', 'still');
                //creates target for modal functionality
                animalImage.attr('data-toggle', 'modal');
                animalImage.attr('data-target', '#animalModal');
                //creates still image rather than animated gif
                var still = response.data[i].images.fixed_width_still.url;
                var modal = response.data[i].images.original.url;
                //puts click target in modal
                var modalGif = $('<img>');
                modalGif.attr('src', modal);

                animalImage.attr('src', still);
                animalImage.attr('data-animate', modal);
                $(animalDiv).append(p);

                $(animalDiv).append(animalImage);

                $(animalDiv).hide().prependTo("#gif-display").fadeIn(2000);
                //clicking on gif opens modal with animated, full-size gif
                $(document).on('click', '.gif', function () {
                    var modal = $(this).attr('data-animate')

                    modalGif.attr('src', modal);
                    $('#modalText').html(modalGif);

                })

            };

        });
    });
});

