import { Router } from "express";
import { createPost, deletePost, updatePost } from "../controllers/post.controllers.js";
import { verifyLogin } from "../middlewares/verifyLogin.middleware.js";
import { createComment, deleteComment } from "../controllers/comment.controller.js";

const postRouter = Router()

postRouter.route("/create-post").post(verifyLogin, createPost)
postRouter.route("/update-post").put(verifyLogin, updatePost)
postRouter.route("/delete-post").delete(verifyLogin, deletePost)

postRouter.route("/create-comment").post(verifyLogin, createComment)
postRouter.route("/delete-comment").delete(verifyLogin, deleteComment)

export { postRouter }