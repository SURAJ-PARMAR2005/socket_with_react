//pacakges 

import express from 'express';
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import cors from "cors";


//Configurations

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://socket-with-react-1.onrender.com/',
        methods:["GET","POST"],
    }
});


//middleWare
app.use(cors())

//socket.io stuff 


io.on('connection',(socket) => {
    console.log('new client connected');

    

    socket.on('message',(message) => {
        console.log('message received: ', message);

        io.emit('message',message );
    })
})

const PORT = 5000;
server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
