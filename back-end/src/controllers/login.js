import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/auth/jwt.js";
import { postUser } from "../models/user.js";

export const loginController = async (req, res) => {

    // Authenticate user (dummy example, replace with your authentication logic)
    const { username } = req.body;
    const user = { name: username };
    console.log(user)
    // Record a user for demo purpose
    const newUser = await postUser(user)

    const accessToken = jwt.sign(user, SECRET_KEY);
    res.json({ accessToken, newUser });
}