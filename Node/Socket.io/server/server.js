const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
	cors: {
		origin: "*",
	},
});

const userIO = io.of("/user");
userIO.on("connection", (socket) => {
	console.log("user connected " + socket.username);
});

userIO.use((socket, next) => {
	if (socket.handshake.auth.token) {
		socket.username = socket.handshake.auth.token;
		next();
	} else {
		next(new Error("Errror"));
	}
});

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("send-message", (message, room) => {
		if (room === "") socket.broadcast.emit("receive-message", message);
		else {
			socket.to(room).emit("receive-message", message);
		}
		console.log(message);
	});

	socket.on("join-room", (room, cb) => {
		socket.join(room);
		cb(`Joined in room ${room}`);
	});
});

instrument(io, { auth: false });
