import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

// use express server
const app = express();
// hide important values from code
dotenv.config();
// for handling json request and response
app.use(express.json());
// to prevent cross-origin-error
app.use(
	cors({
		origin: "*",
	})
);

// middleware for authentication
function auth(req, res, next) {
	if (req.headers.authorization === process.env.header_auth) {
		next();
	} else {
		res.status(404).json({
			msg: "unauthorized",
		});
	}
}

// route is "/" and response is sent to who is accessing the server
app.get("/", (req, res) => {
	res.send("welcome to node js server");
});

// different route with different response
app.get("/user", (req, res) => {
	res.json({ msg: "hi" });
});

// another route with middleware by authentication
app.post("/data", [auth], (req, res) => {
	res.json({
		"req data": req.body.msg,
	});
});

// server listening in port : 3000
app.listen(3000, (req, res) => {
	console.log("server : 3000");
});
