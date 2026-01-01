import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hash, role: role || "USER" },
        });

        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (error) {
        console.error("Error logging user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}