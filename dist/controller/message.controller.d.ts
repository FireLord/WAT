import { Request, Response } from "express";
export declare const sentMessage: (req: Request, res: Response) => Promise<void>;
export declare const getAllMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
