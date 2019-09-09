var randomNumber1 = Math.ceil(Math.random() * 6);
var randomNumber2 = Math.ceil(Math.random() * 6);
var winner;

while (randomNumber1 == randomNumber2) {
  randomNumber2 = Math.ceil(Math.random() * 6);
}

document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2) {
  winner = "Player 1";
}
else {
  winner = "Player 2";
}

document.querySelector("h1").innerHTML = (winner + " wins!");
