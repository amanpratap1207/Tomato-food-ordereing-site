import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

// we need user's email&password to create the user. So, here we are using POST method:
// these below are the endpoints.
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser) 

export default userRouter;