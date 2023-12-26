import { createServer } from "node:http";
import cors from "cors";

// Express Imports
import express  from "express";
import loginAPI from "./modules/login/api.js";
import { authenticateJWT } from "./modules/auth/jwt.js";

// Socket Imports
import { Server } from "socket.io";
import { ioConnections } from "./modules/chat/handlers.js";

const PORT = 3000

export const app = express()
app.use(cors())
app.use(express.json())

export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: "*",
    }}
);


// RESTful Routes
app.use(loginAPI)

// Socket Events
io.on('connection', ioConnections({io}));


server.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})