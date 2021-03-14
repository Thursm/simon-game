var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(document).keypress(function() {
  if (!gameStarted) {

    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;

  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var name = randomChosenColour
  // add a for loop to show entire game pattern
  gamePattern.push(randomChosenColour);
  for (i = 0; i < gamePattern.length; i++) {
    pattern(i);
    //playSound(name);
      //$("#" + gamePattern[i]).fadeOut("fast").fadeIn("fast");
      //$('#' + randomChosenColour).fadeOut("fast").fadeIn("fast");
  }
console.log(gamePattern);

};

function pattern(i){
  setTimeout(function(){
$("#" + gamePattern[i]).fadeOut("fast").fadeIn("fast");
playReturnSound(i);
},1000 * i);
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  //$('#' + userChosenColour).fadeOut("fast").fadeIn("fast");
  var name = userChosenColour;
  var currentColour = userChosenColour;

  animatePress(currentColour);
  playSound(name);
  //alert($("." + userChosenColour).hasClass("pressed"));
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
  console.log(userChosenColour);
});

function playReturnSound(i){
  var buttonSound1 = new Audio("sounds/" + gamePattern[i] + ".mp3");
  buttonSound1.play();
}

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function playWrongSound() {
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playWrongSound();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;

}
