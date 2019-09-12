var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var randomChosenColor = "black";
var level = 0;
var gameActive = false;
var needUserInput = false;

// Continues the sequence generation
function nextSequence() {
  // Add next color to sequence array
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Show user what color was generated
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  needUserInput = true;

  // Update level heading
  level++;
  $("h1").text("Level " + level);
}

// Plays sound corresponding to button color
function playSound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();
}

// Animates button press based on color
function animatePress(pressColor) {
  $("#" + pressColor).addClass("pressed").delay(100).queue(function() {
    $("#" + pressColor).removeClass("pressed");
    $("#" + pressColor).dequeue();
  });
}

// Checks if user's answer matches generated answer
function checkAnswer(idx) {
    if (gamePattern[idx] !== userClickedPattern[idx]) {
      playSound("wrong");
      $("body").addClass("game-over").delay(200).queue(function() {
        $("body").removeClass("game-over");
        $("body").dequeue();
      });
      restartLevel();
    }
}

function restartLevel() {
  $("h1").text("Game over! You reached level " + level + ".\nPress any key to restart.");
  gamePattern = [];
  userClickedPattern = [];
  needUserInput = false;
  gameActive = false;
  level = 0;
}

// Starting game
$(document).keypress(function(event) {
  if (!gameActive) {
    gameActive = true;
    nextSequence();
    $("h1").text("Level " + level);
  }
});

// Detect when buttons are clicked
$(".btn").click(function() {
  if (needUserInput) {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

    if (gameActive && userClickedPattern.length === gamePattern.length) {
      needUserInput = false;
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

});
