const express = require("express") // importing the express.

const app = express(); // creating express application and storing in  variable called app.

const http = require("http") // importing http from node.js not installed like express by default it comes from node.

const server = http.createServer(app) // creating a server and using express application app for handaling http server.

const {Server} = require("socket.io") // importing server from socket.io this socket.io we installed  it.

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
}) // it tells create socket.io server and attach it to our HTTP server

io.on("connection",(socket)=>{ // event call when someone entires, each user has there own socketId which is unique, socket.id identify connection not usename

     console.log("User Connected:", socket.id);

    socket.on("disconnect",()=>{ // when someone disconnect the disconnect event call the socket.on runs
   
        console.log("naruto left")
})

});



server.listen(5000,()=>{    // Starts the HTTP server and listens for incoming client requests on port 5000.
    console.log("Server is running on port 5000")
})







