import http from "node:http";
import express  from "express";
import cors from "cors";
import loginAPI from "./modules/login/api.js";

const PORT = 3000

export const app = express()
app.use(cors())
app.use(express.json())

// RESTful Routes
app.use(loginAPI)

export const server = http.createServer(app)

server.listen(PORT, () =>{
    console.log(`Server running at port ${PORT}`)
})