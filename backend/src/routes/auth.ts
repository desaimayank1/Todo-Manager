import { Router, type Router as ExpressRouter } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";

const authRouter: ExpressRouter = Router();

authRouter.route("/register").post(userRegister);
authRouter.route("/login").post(userLogin);

export default authRouter;