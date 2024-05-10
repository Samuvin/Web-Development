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

const switchPlayer = function () {
	document.getElementById(`current--${active}`).textContent = 0;
	active = active === 0 ? 1 : 0;
	currentScore = 0;
	player0.classList.toggle("player--active");
	player1.classList.toggle("player--active");
};

let scores = [0, 0];
let currentScore = 0;
let active = 0;
let playing = true;

const init = function () {
	score0El.textContent = 0;
	score1El.textContent = 0;
	currentScore0El.textContent = 0;
	currentScore1El.textContent = 0;
	player0.classList.remove("player--winner");
	player1.classList.remove("player--winner");
	player1.classList.remove("player--active");
	player0.classList.add("player--active");

	scores = [0, 0];
	currentScore = 0;
	active = 0;
	playing = true;
};
init();
btnroll.addEventListener("click", () => {
	if (playing) {
		const roll = Math.trunc(Math.random() * 6) + 1;
		dice.classList.remove("hidden");
		dice.src = `dice-${roll}.png`;
		if (roll != 1) {
			currentScore += roll;
			document.getElementById(`current--${active}`).textContent = currentScore;
		} else {
			switchPlayer();
		}
	}
});

btnhold.addEventListener("click", () => {
	if (playing) {
		scores[active] += currentScore;
		document.getElementById(`score--${active}`).textContent = scores[active];
		if (scores[active] >= 100) {
			dice.classList.add("hidden");
			document
				.querySelector(`.player--${active}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${active}`)
				.classList.remove("player--active");
			playing = false;
		} else {
			switchPlayer();
		}
	}
});

btnnew.addEventListener("click", init);
