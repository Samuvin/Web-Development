"use strict";

//Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
let active = 0;

score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
// rolling dice

btnroll.addEventListener("click", () => {
	const roll = Math.trunc(Math.random() * 6) + 1;
	dice.classList.remove("hidden");
	dice.src = `dice-${roll}.png`;

	if (roll !== 1) {
		currentScore += roll;
		if (active == 0) {
			currentScore0El.textContent = currentScore;
		} else {
			currentScore1El.textContent = currentScore;
		}
	} else {
		currentScore = 0;

		if (player1.classList.contains("player--active")) {
			player1.classList.remove("player--active");
			player2.classList.add("player--active");
			currentScore0El.textContent = 0;
			active = 1;
		} else {
			player2.classList.remove("player--active");
			player1.classList.add("player--active");
			currentScore1El.textContent = 0;
			active = 0;
		}
	}
});
