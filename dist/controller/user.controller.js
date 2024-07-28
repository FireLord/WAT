"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = require("../lib/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res) => {
    const { name, email, password, } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "User created", data: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the user");
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email or password");
        }
        const payload = {
            name: user.name,
            email,
        };
        return res.json({ message: "login success", data: payload });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while logging in");
    }
};
exports.login = login;
// import { prisma } from "../lib/db";
// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../lib/generate-jwt";
// export const register = async (req: Request, res: Response) => {
//   const {
//     name,
//     email,
//     password,
//   }: {
//     name: string;
//     email: string;
//     password: string;
//   } = req.body;
//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log({
//     name,
//     email,
//     password: hashedPassword,
//   });
//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });
//   // // Generate a JWT
//   // const token = generateToken({ id: user.id, email: user.email });
//   res.status(201).send("User created");
// };
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   // Find the user by email
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     return res.status(401).send("Invalid email or password");
//   }
//   // Compare the password with the hashed password in the database
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   console.log(password, user.password, isPasswordValid);
//   if (!isPasswordValid) {
//     return res.status(401).send("Invalid email or password");
//   }
//   // Generate a JWT
//   // const token = await generateToken({ id: user.id, email: user.email });
//   const payload = {
//     name: user.name,
//     email,
//   };
//   return res.json(payload);
// };
//# sourceMappingURL=user.controller.js.map