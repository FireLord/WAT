import { Request, Response } from "express";
export declare const saveContact: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllContacts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateContact: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteContact: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
