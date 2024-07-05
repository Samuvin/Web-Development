import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageinput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");
const socket = io("http://localhost:3000");

const userSocket = io("http://localhost:3000/user", {
	auth: {
		token: "Test",
	},
});

socket.on("connect", () => {
	displayMessaage(`You connected with id ${socket.id}`);
});

socket.on("receive-message", (message) => {
	displayMessaage(message);
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const room = roomInput.value;
	const message = messageinput.value;
	if (message === "") return;
	socket.emit("send-message", message, room);
	messageinput.value = "";
});

joinRoomButton.addEventListener("click", () => {
	const room = roomInput.value;
	socket.emit("join-room", room, (message) => {
		displayMessaage(message);
	});
});

function displayMessaage(message) {
	const div = document.createElement("div");
	div.textContent = message;
	document.getElementById("message-container").appendChild(div);
}
