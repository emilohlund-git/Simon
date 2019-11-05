//Initialize the gameboard and components that goes on it
const startButton = document.querySelector(".start"),
  board = document.querySelector(".board"),
  points = document.querySelector(".points"),
  score = document.createElement("p"),
  logoButton = document.createElement("div"),
  row1 = document.createElement("div"),
  row2 = document.createElement("div"),
  green = document.createElement("div"),
  red = document.createElement("div"),
  blue = document.createElement("div"),
  yellow = document.createElement("div");
let current = 0,
  target,
  currentScore = 0,
  lost = false,
  win = false,
  playing = false,
  levelSpeed = 1000,
  currentLevel = 3,
  amountOfBeeps = currentLevel,
  panelsToPress = [],
  // Adding all clickable panels to an array
  colorPanels = [blue, green, yellow, red],
  // Creating an array with the colors of the panels
  /*
   * This is so that when I target a specific panel with colorPanels[number]
   * I can change the color back to the original value using this array.
   * An example is the function right below (changeColor).
   * I'm changing the color to white, and then back to its original color.
   */
  panelColors = ["blue", "green", "yellow", "red"];

const gameBox = document.getElementById("game-box");
const signInBox = document.getElementById("sign-in-box");
const mainMenu = document.getElementById("main-menu");

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

function changeColor(panel) {
  colorPanels[panel].style.background =
    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)";
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
    let rn = Math.floor(Math.random() * colorPanels.length - 1) + 1;
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
        if (
          currentScore >
          parseInt(document.getElementById("highscore").innerHTML)
        ) {
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
        }, 100);
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

/*
 * When you've lost the game this function gets called.
 *
 *
 */
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

/*
 * When you've won a round this function gets called.
 * It resets the panelsToPress array and adds one to the currentLevel, which amps up the difficulty.
 * amountOfBeeps is the variable which tells the game how many sequences we have to follow each level.
 * After this the panels are shifted to a green color and then back to it's previous value.
 */
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

function stateHandler(elements, state) {
  elements.forEach(function(element) {
    element.style.display = state;
  });
}

//SETUP MAIN MENU
stateHandler([signInBox, gameBox], "none");
const logo = document.createElement("p");
const playButton = document.createElement("button");
logo.style.color = "#fff";
logo.innerHTML = "Simon Says";
mainMenu.appendChild(logo);
mainMenu.appendChild(playButton);


