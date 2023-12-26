import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../auth/jwt.js";

export const loginController = (req, res) => {

    // Authenticate user (dummy example, replace with your authentication logic)
    const { username } = req.body;
    const user = { username };

    const accessToken = jwt.sign(user, SECRET_KEY);
    res.json({ accessToken });
}