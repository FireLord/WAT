import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const revenueCatHook = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"An error occurred during revenuecat transaction"});
    }
}