import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOrCreator  = async  (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const taskId = req.params.id;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role === "ADMIN") {
      return next();
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { createdById: true },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdById === user.id) {
      return next();
    }

    return res.status(403).json({ message: "Unauthorized" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
