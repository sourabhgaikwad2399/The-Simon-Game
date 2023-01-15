var user_Pattern = [];
var random_Pattern = [];

var length = 0;
var validation_For_Key = true;
var level = 0;
var highScore = 0;

$(document).keypress(function() {
  if (validation_For_Key) {

    //removing Highest Score from the window
    $("#highest_Score").text("");

    //Calling for the pattern and starting the game
    setTimeout(gameLogic, 500);
    validation_For_Key = false;
  }
  // document.onkeydown = function (e) {
  //     return false;
  // }
});


$(".btn").click(clicking_Animation);


// Button Clicking Animation and playing sound of that particular button
function clicking_Animation() {

  //Animation
  console.log(this.id);
  var a = this;
  $(a).addClass("pressed");
  setTimeout(function() {
    $(a).removeClass("pressed");
  }, 100);

  //Sound
  var clicked_Button = this.id;
  clicking_Sound(clicked_Button);

  //Pushing the click's button id to array
  user_Pattern.push(this.id);

  //Sending for validation
  check(user_Pattern.length);

}




// Adding Sounds to Buttons
function clicking_Sound(clicked_Button) {
  if (clicked_Button === "grn") {
    var audio = new Audio("sounds/green.mp3");
    audio.play();
  }

  if (clicked_Button === "rd") {
    var audio = new Audio("sounds/red.mp3");
    audio.play();
  }

  if (clicked_Button === "yllw") {
    var audio = new Audio("sounds/yellow.mp3");
    audio.play();
  }

  if (clicked_Button === "blu") {
    var audio = new Audio("sounds/blue.mp3");
    audio.play();
  }
}


//Game starting function
function gameLogic() {
  level++;
  $("h1").text("Level " + level);
  setTimeout(randomPattern, 300);
}


//Function to generate random click and push to random_Pattern array
function randomPattern() {

  let q = ["grn", "rd", "yllw", "blu"];

  //choosing a random click and storing in random_Pattern array
  let t = rdmNumber();
  let c = q[t];

  //animating the machine's click
  $("#" + c).fadeIn(100).fadeOut(100).fadeIn(100);
  clicking_Sound(c);

  //pushing to random_Pattern
  random_Pattern.push(c);

  //Making user_Pattern empty for taking next user_Pattern with new added click
  user_Pattern = [];
}


//Function to validate the click
function check(a) {

  //Check for the number of user clicks and validate
  if (a > random_Pattern.length) {
    setTimeout(game_Over, 300);
  }

  //validate each element of user_Pattern array with the random_Pattern array element
  else {

    for (let i = 0; i < a; i++) {

      if (user_Pattern[i] === random_Pattern[i]) {
        //after validation, go for next element
        continue;
      }

      else {
        //If elements doesn't match --> game over
        setTimeout(game_Over, 300);
      }
    }

    //when user provides full correct pattern, go for the next random click
    if (a == random_Pattern.length)
      setTimeout(gameLogic, 500);
  }
}


//Function to display the game over and set the things up
function game_Over() {

  //Both arrays will become empty for next round
  random_Pattern = [];
  user_Pattern = [];

  //Allowing for a keypress
  validation_For_Key = true;

  //Applying animation of Game Over
  $("body").addClass("game_Over");
  setTimeout(function() {
    $("body").removeClass("game_Over");
  }, 300);

  //Adding Sound of Game Over
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  //Changing text
  $("h1").text("Game Over! Press Any Key to Restart");

  //Displaying Highest Score
  if (highScore <= level) {
    highScore = level;
  }
  $("#highest_Score").text("Highest Score : " + highScore);

  //Setting level back to zero
  level = 0;

}

//Function to generate random number between 0 - 4
function rdmNumber() {
  return Math.floor(Math.random() * 4);
}
