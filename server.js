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

const users = [] // stores usere who joined 

io.on("connection",(socket)=>{ // event call's when someone entires, each user has there own socketId which is unique, socket.id identify connection not usename

     console.log("User Connected:", socket.id);
     

    socket.on("send_message", (data,callback) => {  // send data by calling event

    console.log("Sender Socket ID:", socket.id); 
    console.log("Sender Username:", data.username);

    callback({
        success:"Successful"
    })

    io.to(data.room).emit("receive_message",data) // send data to every one in the room
    });

    socket.on("join_room",(data)=>{
        socket.join(data.room)  // join the room 

        users.push({
            socketId : socket.id,
            username : data.username,
            room : data.room 
        })

        const roomUsers = users.filter(each => each.room === data.room)

        io.to(data.room).emit("room_users",roomUsers)
      
        socket.to(data.room).emit("user_joined",data)
    })

    socket.on("typing",(data)=>{
        socket.to(data.room).emit("is_typing",data)
    })

    socket.on("stop_typing",(data)=>{
        socket.to(data.room).emit("stop_typing",data)
    })

    socket.on("disconnect",()=>{ // when someone disconnect the disconnect event call the socket.on runs
   
        const index = users.findIndex(each => each.socketId === socket.id) // find's the index of disconnected user

        if(index !== -1){
            const disconnectedUser = users[index];
            users.splice(index,1) // removes disconnected user from original array

            const roomUsers = users.filter(each => each.room === disconnectedUser.room )

            io.to(disconnectedUser.room).emit("room_users",roomUsers)
            
            console.log(`${disconnectedUser.username} left ${disconnectedUser.room}`)
        } 

        console.log("disconnected user",socket.id)
})

});



server.listen(5000,()=>{    // Starts the HTTP server and listens for incoming client requests on port 5000.
    console.log("Server is running on port 5000")
})







