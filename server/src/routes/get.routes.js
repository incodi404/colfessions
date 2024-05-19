import { Router } from "express";
import { institutionList, newsFeed } from "../controllers/get.controllers.js";
import { verifyLogin } from "../middlewares/verifyLogin.middleware.js";

const getRouter = Router()

getRouter.route("/newsfeed").get(verifyLogin, newsFeed)
getRouter.route("/institution-list").get(verifyLogin, institutionList)

export {
    getRouter
}