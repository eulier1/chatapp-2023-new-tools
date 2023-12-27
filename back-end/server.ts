import { createServer } from "node:http";
import cors from "cors";

// Express Imports
import app from "./src/config/express.ts";
import loginAPI from "./src/routes/login.js";


// Socket Imports
import { Server } from "socket.io";
import { ioConnections } from "./src/config/socket.ts";
import { authenticateJWTSocket } from "./src/utils/auth/socket.js";

const PORT = 3000

export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: "*",
    }}
);


// RESTful Routes
app.use(loginAPI)

// Socket Events
io.use(authenticateJWTSocket)
io.on('connection', ioConnections({io}));


server.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})