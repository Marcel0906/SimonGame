// Array of colors for the game
let simonGame = [];
let userClick = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

$("#level-title").text("Press A Key to Start");

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userColor = $(this).attr("id");
  userClick.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userClick.length - 1);
});

function nextSequence() {
  userClick = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  simonGame.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (simonGame[currentLevel] === userClick[currentLevel]) {
    if (userClick.length === simonGame.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  simonGame = [];
  started = false;
}
