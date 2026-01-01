import { Request, Response } from "express";
import { PrismaClient, TaskStatus, PriorityLevel } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority: priority as PriorityLevel,
                dueDate: dueDate ? new Date(dueDate) : null,
                createdById: req.user!.id,
                assignedToId: assignedTo || null,
            },
        });

        res.json(task);

    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const listTask = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const tasks = await prisma.task.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: "desc" },
        });
        
        const user=await prisma.user.findUnique({
            where: { id: req.user?.id },
        })
        
        const userDetails={
            name:user?.name,
            ...req.user,
        }

        res.json({tasks,user:userDetails});

    } catch (error) {
        console.error("Error listing tasks:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const listUser = async (req: Request, res: Response) => {
    try {

        const users = await prisma.user.findMany();
        const userDetails=users.map((user)=>{
            return ({
                id:user.id,
                name:user.name,
                email:user.email,
            })
        })
        res.json(userDetails);
    } catch (error) {
        console.error("Error getting users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const updateTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate, assignedTo } = req.body;

        const task = await prisma.task.update({
            where: { id: req.params.id },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedToId:assignedTo
            },
        });

        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const deleteTask = async (req: Request, res: Response) => {
    try {
        await prisma.task.delete({
            where: { id: req.params.id },
        });

        res.json({ message: "Task deleted" });

    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        const task = await prisma.task.update({
            where: { id: req.params.id },
            data: { status: status as TaskStatus },
        });

        res.json(task);

    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const updatePriority = async (req: Request, res: Response) => {
    try {
        const { priority } = req.body;

        const task = await prisma.task.update({
            where: { id: req.params.id },
            data: { priority: priority as PriorityLevel },
        });

        res.json(task);

    } catch (error) {
        console.error("Error updating Priority:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const assignUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const task = await prisma.task.update({
            where: { id: req.params.id },
            data: { assignedToId: userId },
        });

        res.json(task);

    } catch (error) {
        console.error("Error assigning user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}