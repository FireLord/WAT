import { prisma } from "../lib/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken, generateVerificationToken, loginService, refreshTokenService}  from "../service/auth.service";
import { authenticate } from "../middleware/authenticate-jwt";
const jwt = require('jsonwebtoken');

export const register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    sendVerificationMail(user.id, user.email);
    const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
    res.status(201).json({message:"User created",data:{name:user.name, email:user.email, verified:user.verified, accessToken, refreshToken}});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while creating the user"});
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(401).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message:"Invalid email or password"});
    }

    const payload = {
      name: user.name,
      email,
    };
    
    return res.json({message:"login success",data:payload});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while logging in"});
  }
};
export const login_v2 = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const payload = await loginService(email, password);
    
    return res.json({message:"login success",data:payload});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while logging in"});
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const {refreshToken} = req.body;
    const newTokens = await refreshTokenService(refreshToken);
    return res.json({message:"refresh token success",data:newTokens});
  } catch (error) {
   return res.status(401).json({message:"refresh token failed"});
  }
}


 const sendVerificationMail = async (id:string,email:string) => {
  console.log("email", email);
  //generate token with email
  const token = await generateVerificationToken({ id, email });
  const verificationUrl = `${process.env.BASE_URL}/v2/verify?token=${token}`;
  (async function () {
    const { data, error } = await resend.emails.send({
      from: 'WhatsTrek <support@whatstrek.com>',
      to: [email],
      subject: 'WhatTrek: Email Verification',
      html: `<a href=${verificationUrl}>Click Here</a> Or go to: ${verificationUrl} <br/> If you did not request this email, please ignore it`,
    });
  
    if (error) {
      return console.error({ error });
    }
  
    console.log({ data });
  })();
}

export const resendVerificationMail = async (req: Request, res: Response) => {
  try {
    //authenticate
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2: resendVerificationMail->",new Date());

    // const { id, email } = req.body;
  sendVerificationMail(authObj.id,authObj.email);
  return res.json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while sending verification email" });
  }
};


export const verifyAccount = async (req: Request, res: Response) => {
 try {
  const { token } = req.query;
  // const { id } = verify(token, process.env.JWT_SECRET) as { id: string };
  const {id}=jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
  const user = await prisma.user.update({
    where: { id },
    data: { verified: true },
  });
  console.log("verified", user);
  return res.json({ message: "Account verified", data: user.email });
 } catch (error) {
  console.log(error);
  
  if (error.name === 'TokenExpiredError') {
    res.status(400).send({ message: "Verification token expired" });
    // throw new Error('Refresh token expired');
  }
  res.status(400).send({ message: "Invalid verification token" });

  // throw new Error('Invalid refresh token');
 }
}

  // Send verification email


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

