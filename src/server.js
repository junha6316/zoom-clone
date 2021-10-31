import http from "http";
import WebSocket from "ws";
import express from "express";

import path from 'path';



const app = express();


app.set('view engine', "pug");
app.set("views", __dirname + "/views")
// set static folder 
app.use("/public", express.static(__dirname + "/public")); 

// router
app.get("/", (req, res) => res.render("home"));
// catch all url to home
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

function handleConnection(socket) {
    console.log(socket);
}

// 커넥션이 발생했을 떄 어떤 동작을 할지 정의
wss.on("connection", handleConnection) 
server.listen(3000);
