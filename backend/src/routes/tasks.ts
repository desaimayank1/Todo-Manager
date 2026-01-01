import { Router, type Router as ExpressRouter } from "express";
import { assignUser, createTask, deleteTask, listTask, listUser, updatePriority, updateStatus, updateTask } from "../controllers/task.controller";
import { auth, adminOrCreator } from "../middlewares/auth";


const taskRouter: ExpressRouter = Router();

taskRouter.use(auth);
taskRouter.route("/").post(createTask);
taskRouter.route("/").get(listTask);
taskRouter.route("/users").get(listUser);
taskRouter.route("/:id/status").patch(updateStatus);
taskRouter.use("/:id",adminOrCreator);
taskRouter.route("/:id").put(updateTask);
taskRouter.route("/:id").delete(deleteTask);
taskRouter.route("/:id/priority").patch(updatePriority);
taskRouter.route("/:id/assign").patch(assignUser);

export default taskRouter;