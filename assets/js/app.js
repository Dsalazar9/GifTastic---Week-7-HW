

var buttons = ["dog", "cat", "rabbit","eagle","bull"];
var userpick = "";
var app = {

  defaultButtons: function() {
    for (var i = 0; i < buttons.length; i++) {

      var sp = $("<button>"); 
      sp.attr("class", "button"); 
      sp.attr("animal", buttons[i]); 
      sp.append("" + buttons[i]); 

      $("#buttons").append(sp); 

    };
  },

  //Function to create buttons typed by user.
  newButton: function() {

    //Get the value typed in the text box.
    var newbutton = $("#animal-input").val().trim();

    //Create the new button, and add an ID and a custon attribute.
    var sp = $("<button>");
    sp.attr("class", "button");
    sp.attr("animal", newbutton);
    sp.append("" + newbutton);

    //Append the new button to the div "buttons".
    $("#buttons").append(sp);

    //Cleaning text box.
    $("#animal-input").text("");
  },

  //Creates a new button//Creates a new button
  showGif: function() {

    //Cleaning div
    $("#images").empty();

    //Generatin the QueryURL.
    var api = "&api_key=osci6gUKNLoHPAxZkxn8zpUNbfrXEghy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userpick + api;

    //Getting the gifs using the Giphy API with Ajax.
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { //all the information queed from Giphy is stored in the object "response".

      for (var j = 0; j < 10; j++) {
        var gifSpan = $("<div>"); //Using span to have all the new images inline by default.
        var ratingDiv = $("<div>"); //This will hold the rating.
        var gifImg = $("<img>"); //This will hold the gif.
        var gifWidth = 0;
        var spanWidth = 0;

        gifSpan.attr("id", "gif"); //Adds ID to modify data on CSS.

        ratingDiv.append("Rating: ", response.data[j].rating); //pulling the rating for the imageß.

        gifImg.attr("src", response.data[j].images.original.url); //pulling the url for the image.
        gifImg.attr("height", "230px"); //Adds same height to all the images to have a more uniform look.
        gifImg.attr("alt", userpick); //Adds alt tag to the images.

        gifWidth = Math.round(((230 * response.data[j].images.original.width) / response.data[j].images.original.height) * 100) / 100;

        spanWidth = gifWidth + 10;

        gifSpan.width(spanWidth);
        console.log(queryURL, gifWidth);

        gifSpan.append(ratingDiv); //Appending the rating to the span.
        gifSpan.append(gifImg); //Appending the image to the span.



        $("#images").append(gifSpan); //Generating the span in the body of the website.

        //Clean userpick
        userpick = "";
      };
    });
  },
};


//Calls function on load to create all the default buttons.
app.defaultButtons();


//Adding a new custom button by user.
$("#addAnimal").on('click', function(event) {
  event.preventDefault();

  app.newButton();
});

//Clicking one of the buttons.
$(document.body).on('click', ".button", function(event) {
  event.preventDefault();
  //Updates the userpick variable with the value
  userpick = $(this).attr("animal");
  app.showGif();
});