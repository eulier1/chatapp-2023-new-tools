
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./jwt";

export const authenticateJWTSocket = (socket, next) => {
    console.log('socket authentication', socket.handshake.auth.token)
    const token = socket.handshake.auth.token
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) next(new Error("not authenticated"))
      })
      next();
}
