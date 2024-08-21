import { prisma } from "../lib/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { resend } from "../lib/resend";
import { generateToken } from "../lib/generate-jwt";
import { authenticateJWT } from "../lib/authenticate-jwt";
export const resetPasswordRequest = async (req: Request, res: Response)=>{
    const {email} = req.body;
    const user = await prisma.user.findUnique({where:{email}})
    //check if acc exist
    if(!user) return res.status(404).send("User not found")
    //generate random 6 digit otp
    const new_otp = Math.floor(100000 + Math.random() * 900000);
    // const new_otp = 123456;
    //save otp in db
    await prisma.otp.upsert({
        where: {
          user_id: user.id,
        },
        update: {
          otp: new_otp,
          updated_at: new Date(),
        },
        create: {
          user_id: user.id,
          otp: new_otp,
          updated_at: new Date(),
        },
      });
    //send email with otp 
    (async function () {
        const { data, error } = await resend.emails.send({
          from: 'WhatsTrek <support@whatstrek.com>',
          to: [email],
          subject: 'WhatTrek: Password Reset Request',
          html: `OTP: <strong>${new_otp}</strong>`,
        });
      
        if (error) {
          return console.error({ error });
        }
      
        console.log({ data });
      })();

    return res.status(200).send("OTP sent")

}

// model Otp{
//     id            String        @id @default(cuid())
//     user_id          String
//     otp Int
//     updated_at DateTime @default(now())
//     user             User          @relation(fields: [user_id], references: [id], onDelete: Cascade)
//   }
  

export const checkOTP = async (req: Request, res: Response)=>{
    const {otp, email}= req.body
    const user = await prisma.user.findUnique({where:{email}})
    if(!user) return res.status(404).send("User not found")

    //check if otp is correct
    const otp_db = await prisma.otp.findUnique({where:{user_id:user.id}})
    //compare otp
    if(otp_db.otp !== otp) return res.status(401).send("Invalid OTP")

    //check if otp is older than 1 minute
    const otp_age = Date.now()- otp_db.updated_at.getTime()
    console.log("otp_age",otp_age);
    if( otp_age > 5*60000) return res.status(401).send("OTP expired")
    
    // generate and send a reset-password token 
    // const password_reset_token = 123456789  //generate a JWT token with email
  const password_reset_token = await generateToken({ id: user.id, email: user.email });

    //send token
    return res.json({message:"ok",data:password_reset_token})
}

export const resetPassword = async (req: Request, res: Response)=>{
    const {token,password}=req.body
    //check token
    const decoded:any = authenticateJWT(token);
    if(!decoded) return res.status(401).send("Invalid token")
    if(decoded==="jwt expired") return res.status(401).send("waited too long, generate another token")
    const email : string = decoded.email
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
        where: {email},
        data: {password:hashedPassword}
    })
    res.status(201).json({message:"Password reset success"});

}

