//Initialize the gameboard and components that goes on it
let startButton = document.querySelector(".start");
let board = document.querySelector(".board");

let logoButton = document.createElement("div");
logoButton.classList.add("logo-button");
let logoText = document.createElement("span");
logoText.innerHTML = "SIMON";
logoButton.appendChild(logoText);

let row1 = document.createElement("div");
row1.classList.add("row1");

let row2 = document.createElement("div");
row2.classList.add("row2");

let green = document.createElement("div");
green.classList.add("green");
green.id = "green";
row1.appendChild(green);

let red = document.createElement("div");
red.classList.add("red");
red.id = "red";
row1.appendChild(red);

let blue = document.createElement("div");
blue.classList.add("blue");
blue.id = "blue";
row2.appendChild(blue);

let yellow = document.createElement("div");
yellow.classList.add("yellow");
yellow.id = "yellow";
row2.appendChild(yellow);

board.appendChild(row1);
board.appendChild(row2);
board.appendChild(logoButton);

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

function choosePanel() {
  lightUpPanel();
}

function changeColor(panel) {
  colorPanels[panel].style.background =
    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)";
  setTimeout(function() {
    colorPanels[panel].style.background = panelColors[panel];
  }, 100);
}

function playSequence() {
  var levelBeeps = setInterval(function() {
    let rn = randomNum();
    panelsToPress.push(colorPanels[rn].id);

    var beep = new Audio("sounds/beep.mp3");
    beep.play();
    changeColor(rn);

    console.log(panelsToPress);
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
      if (this.id == target.id && !lost) {
        playSound("beep");
        this.style.background =
          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)";
        current++;
        setTimeout(function() {
          panel.style.background = panel.id;
        }, 100);
        if (current == panelsToPress.length) {
          console.log("win");
          win = true;
          winFunction();
        }
      } else if (this.id != target.id) {
        lost = true;
        loseFunction();
      }
    }
  });
});

function loseFunction() {
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
    console.log("Ready");
    lost = false;
  }, 1500);
}

function winFunction() {
  playSound("tone");
  panelsToPress = [];
  currentLevel += 2;
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
    console.log("Ready");
    playSequence();
  }, 5000);
}

function playSound(sound) {
  var tone = new Audio("sounds/" + sound + ".mp3");
  tone.play();
}

console.log(startButton);

startButton.addEventListener("click", function() {
  startButton.style.background = "rgb(105, 10, 10)";
  if (!playing) {
    playing = true;
    playSequence();
  }
});
