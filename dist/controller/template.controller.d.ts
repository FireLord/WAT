import { Request, Response } from "express";
export declare const newTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const toggleTemplate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
