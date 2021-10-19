// Declaring variables and arrays
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// to begin the game, the user has to press any button using keyboard, and the below function triggers when it happes, and that too only for the very first time.
document.onkeypress = function() {
  if (!started) {
    document.getElementById("level-title").text = "Level " + level;
    nextSequence();
    started = true;
  }
}

// functions calling on Animation on user clicked buttons and check if it is matched with the pattern or not.
var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  (function(i) {
    btns[i].addEventListener("click", function() {
      var userChosenColour = btns[i].id;
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1)
    }, false);
  }(i));
}

// function to check if the user patterns and the game patterns matches.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    document.getElementsByTagName("BODY")[0].classList.add("game-over");
    document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";
    setTimeout(function() {
      document.getElementsByTagName("BODY")[0].classList.remove("game-over");
    }, 200);
    startOver();
  }
}

// function that generates and random call and this happens after moving on to every level.
function nextSequence() {
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// funciton that adds and removes class whenevr pressed and make the animation happens.
function animatePress(currentColour) {
  document.getElementById(currentColour).classList.add("pressed");
  setTimeout(function() {
    document.getElementById(currentColour).classList.remove("pressed");
  }, 100);
}

// function that sets the variables back to default to startover the game again.
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
