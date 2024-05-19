import { Router } from "express";
import { generateEmailVerification, getUser, login, logout, testingGet, testingSet, verifyEmail } from "../controllers/user.controllers.js";
import { verifyLogin } from "../middlewares/verifyLogin.middleware.js";

const userRouter = Router()

userRouter.route("/email-verification").post(generateEmailVerification)
userRouter.route("/verify-email/:verifyEmailToken").get(verifyEmail)
userRouter.route("/login").post(login)
userRouter.route("/get-user").get(verifyLogin, getUser)
userRouter.route("/logout").get(verifyLogin, logout)
userRouter.route("/testing-get").get(testingGet)
userRouter.route("/testing-set").get(testingSet)

export {userRouter}

