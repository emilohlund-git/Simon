const input = document.getElementById("input-name");
let player;

input.addEventListener("keypress", function(e) {
  if (e.keyCode == 13) {
    Velocity(signInBox, { opacity : 0 }, { duration: 1000 });
    localStorage["name"] = input.value;
    player = localStorage["name"];
    document.getElementById("welcome").innerHTML = "Welcome " + player;
    Velocity(gameBox, { top : 1 }, { duration: 1000 });
    gameBox.style.display = "";
  }
});

if (localStorage["name"] != undefined) {
  signInBox.style.display = "none";
  player = localStorage["name"];
  document.getElementById("welcome").innerHTML = "Welcome back " + player;
} else {
  gameBox.style.display = "none";
}

stateHandler([signInBox, gameBox], "hide");