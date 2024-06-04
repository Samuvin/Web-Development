const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL = 2;

setTimeout(() => {
	console.log("Timer 1 finished"), 0;
});

setImmediate(() => {
	console.log("Immediate 2 finished");
});

fs.readFile("test-file.txt", "utf8", () => {
	console.log("File read finished");
	console.log("------------------");

	setTimeout(() => {
		console.log("Timer 2 finished"), 0;
	});
	setTimeout(() => {
		console.log("Timer 3 finished"), 3000;
	});
	setImmediate(() => {
		console.log("Immediate 2 finished");
	});

	process.nextTick(() => console.log("Next"));

	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Crypto finished");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Crypto finished");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Crypto finished");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Crypto finished");
	});
});

console.log("Hello");
