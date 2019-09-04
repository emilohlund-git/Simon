//Initialize the gameboard and components that goes on it
let startButton = document.querySelector(".start"),
    board = document.querySelector(".board"),
    currentScore = 0,
    points = document.querySelector(".points"),
    score = document.createElement("p"),
    logoButton = document.createElement("div"),
    // Create the rows in which the panels reside
    row1 = document.createElement("div"),
    row2 = document.createElement("div"),
    // Create the panels
    green = document.createElement("div"),
    red = document.createElement("div"),
    blue = document.createElement("div"),
    yellow = document.createElement("div");

score.classList.add("score");
points.appendChild(score);
score.innerHTML = currentScore;
logoButton.classList.add("logo-button");
row1.classList.add("row1");
row2.classList.add("row2");
green.classList.add("green");
green.id = "green";
row1.appendChild(green);
red.classList.add("red");
red.id = "red";
row1.appendChild(red);
blue.classList.add("blue");
blue.id = "blue";
row2.appendChild(blue);
yellow.classList.add("yellow");
yellow.id = "yellow";
row2.appendChild(yellow);
board.appendChild(row1);
board.appendChild(row2);
board.appendChild(logoButton);
/* End of game-board initialization */

//Game functions
/* Level handling */
var current = 0,
  target,
  lost = false,
  win = false,
  playing = false,
  levelSpeed = 1000;
var currentLevel = 3;
var amountOfBeeps = currentLevel;
var panelsToPress = [];

/* Set all color-panels to an array */
var colorPanels = [blue, green, yellow, red];

/* And an array for their colors */
var panelColors = ["blue", "green", "yellow", "red"];

/* Random function to return a number from 0 to the length of the color panels array, to choose a random element */
var randomNum = function() {
  return Math.floor(Math.random() * colorPanels.length - 1) + 1;
};

function changeColor(panel) {
  colorPanels[panel].style.background = "#fff";
  setTimeout(function() {
    colorPanels[panel].style.background = panelColors[panel];
  }, 100);
}

function playSequence() {
  colorPanels.forEach(function(panel) {
    panel.addEventListener("mouseenter", function() {
      if (amountOfBeeps < 1) {
        panel.style.cursor = "pointer";
      } else {
        panel.style.cursor = "default";
      }
    });
  });

  var levelBeeps = setInterval(function() {
    let rn = randomNum();
    panelsToPress.push(colorPanels[rn].id);

    var beep = new Audio("sounds/beep.mp3");
    beep.play();
    changeColor(rn);
    amountOfBeeps--;

    if (amountOfBeeps < 1) {
      stopLevel(levelBeeps);
    }
  }, levelSpeed);
}

function stopLevel(interval) {
  clearInterval(interval);
}

colorPanels.forEach(function(panel) {
  panel.addEventListener("click", function() {
    if (amountOfBeeps < 1) {
      target = document.getElementById(panelsToPress[current]);
      if (this == target && !lost) {
        currentScore++;
        score.innerHTML = currentScore;
        if (currentScore > parseInt(document.getElementById("highscore").innerHTML)) {
          document.getElementById("highscore").innerHTML = currentScore;
          db.collection("highscore")
            .doc("score")
            .set({
              highscore: document.getElementById("highscore").innerHTML,
            });
        }
        playSound("beep");
        this.style.background =
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)";
        current++;
        setTimeout(function() {
          panel.style.background = panel.id;
        }, levelSpeed / 2);
        if (current == panelsToPress.length) {
          win = true;
          winFunction();
        }
      } else if (this != target) {
        lost = true;
        loseFunction();
      }
    }
  });
});

function loseFunction() {
  currentScore = 0;
  score.innerHTML = currentScore;
  startButton.style.background = "red";
  playing = false;
  playSound("ping");
  currentLevel = 3;
  panelsToPress = [];
  current = 0;
  amountOfBeeps = currentLevel;
  colorPanels.forEach(function(panel) {
    panel.style.background = "red";
    setTimeout(function() {
      panel.style.background = panel.id;
    }, 1500);
  });
  setTimeout(function() {
    lost = false;
  }, 1500);
}

function winFunction() {
  playSound("tone");
  panelsToPress = [];
  currentLevel += 1;
  levelSpeed -= 35;
  amountOfBeeps = currentLevel;
  current = 0;
  colorPanels.forEach(function(panel) {
    panel.style.background = "green";
    setTimeout(function() {
      panel.style.background = panel.id;
    }, 1500);
  });
  setTimeout(function() {
    playSequence();
  }, 3000);
}

function playSound(sound) {
  var tone = new Audio("sounds/" + sound + ".mp3");
  tone.play();
}

startButton.addEventListener("click", function() {
  startButton.style.background = "rgb(46, 4, 4)";
  startButton.style.cursor = "default";
  if (!playing) {
    playing = true;
    playSequence();
  }
});
