//alert("TESTING JAVASCRIPT IS LINKED");

//array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

//array with history of generated game pattern colours
var gamePattern = [];
//array with history of clicked pattern colours
var userClickedPattern = [];

//keep track of whether the game as started or not
var started = false;

//level indicator variable
var level = 0;

//detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {

    //Change h1 to Level number
    $("#level-title").text("Level " + level);
    //call next sequence
    nextSequence();
    //started is now true
    started = true;
  }
});

//detect button click and trigger a handler function
$(".btn").click(function() {

  //store the ID of the button which got clicked
  //push the button which got clicked into an array with all previous clicked buttons stored
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //sound
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //call checkAnswer() after a user has clicked and chosen their answer,
  //passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //check if the most recent answer is the same as game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //if recent answer is same as game pattern then "success"
      console.log("success");

      //check that user has finished their sequence.
      //i.e. that userclick history is the same as game pattern history
      if (userClickedPattern.length === gamePattern.length){

        //call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    //if recent answer is not the same as game pattern then "wrong"
    } else {

      console.log("wrong");
      playSound("wrong");

      //apply game-over class to the body of the website when user gets answer wrong
      //then remove it after 200 milliseconds
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //change h1 to indicate game is over
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //restart the game if wrong
      startOver();
    }

}

function nextSequence() {

  //reset userclick history when nextSequence() is triggered
  userClickedPattern = [];

  //increase level by 1 each time nextSequence() is called
  level++;

  //update h1 with the new change in level
  $("#level-title").text("Level " + level);

  //generate a random number from 0-3
  //convert that random number into a random colour
  //and push that random colour into an array with all previous random colours stored
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //jQuery animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //sound
  playSound(randomChosenColour);
}

//sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//visualise the clicked button
function animatePress(currentColor) {

  //add a class of "pressed" to the button which gets clicked
  $("#" + currentColor).addClass("pressed");

  //remove the "pressed" class on the button after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//restart the game
function startOver() {

  //reset the values of level, gamePattern and started variables
  level = 0;
  gamePattern = [];
  started = false;
}
