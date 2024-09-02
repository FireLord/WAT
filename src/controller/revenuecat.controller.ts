import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const revenueCatHook = async (req: Request, res: Response) => {
    try {
        console.log("body:",req.body);
        console.log("querry params:",req.query);
        console.log("headers:",req.headers);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"An error occurred during revenuecat transaction"});
    }
}