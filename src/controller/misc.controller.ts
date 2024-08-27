import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const saveBugReport = async (req: Request, res: Response) => {
  const {
    email,
    title,
    description
  }: {
    email: string;
    title: string;
    description: string;
  } = req.body;

  try {
    if(!email || !title || !description) {
      return res.status(400).json({message:"Missing required fields"});
    }
    const user = await prisma.user.findUnique({
      where: {email},
    })
    if (!user) {
      return res.status(404).json({message:"User not found"});
    }
    const report = await prisma.bugReports.create({
      data: {
        email,
        title,
        description
      },
    })
    res.status(201).json({message:"Report Saved"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while saving the bug report"});
  }
};
