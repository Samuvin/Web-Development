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

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

score0El.textContent = 0;
score1El.textContent = 0;

const scores = [0, 0];
let currentScore = 0;
let active = 0;
// rolling dice

const switchPlayer = function () {
	document.getElementById(`current--${active}`).textContent = 0;
	active = active === 0 ? 1 : 0;
	currentScore = 0;
	player0.classList.toggle("player--active");
	player1.classList.toggle("player--active");
};

btnroll.addEventListener("click", () => {
	const roll = Math.trunc(Math.random() * 6) + 1;
	dice.classList.remove("hidden");
	dice.src = `dice-${roll}.png`;
	if (roll != 1) {
		currentScore += roll;
		document.getElementById(`current--${active}`).textContent = currentScore;
	} else {
		switchPlayer();
	}
});

btnhold.addEventListener("click", () => {
	scores[active] += currentScore;
	document.getElementById(`score--${active}`).textContent = scores[active];

	if (scores[active] >= 10) {
		document
			.querySelector(`.player--${active}`)
			.classList.add("player--winner");
		document
			.querySelector(`.player--${active}`)
			.classList.remove("player--active");
	} else {
		switchPlayer();
	}
});
