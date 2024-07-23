import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const sentMessage = async (req: Request, res: Response) => {
  const {
    user_id,
    firt_msg,
    msg_body,
    template_id
  }: {
    user_id: string;
    firt_msg: boolean;
    msg_body: string;
    template_id: string;
  } = req.body;

  try {
    const message = await prisma.sentMessage.create({
      data: {
        user_id,
        firt_msg,
        msg_body,
        template_id
      },
    });
    res.status(201).json({message:"Message saved", data:message});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the message");
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  const email = req.body.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const messages = await prisma.sentMessage.findMany({
      where: { user_id: user.id },
    });

    return res.json({message:"ok",data:messages});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching messages");
  }
};




// import { prisma } from "../lib/db";
// import { Request, Response } from "express";

// export const sentMessage = async (req: Request, res: Response) => {
//   const {
//     user_id,
//     firt_msg,
//     msg_body,
//     template_id
//   }: {
//     user_id:  string
//   firt_msg: boolean
//   msg_body: string
//   template_id :string
//   } = req.body;

//   const message = await prisma.sentMessage.create({
//     data: {
//       user_id,
//       firt_msg,
//       msg_body,
//       template_id
//     },
//   });
//   res.status(201).send("message Saved");
// };

// export const getAllMessages = async (req: Request, res: Response) => {
//     const email = req.body.email
//   const user = await prisma.user.findUnique({
//     where: { email },
//   })
//   const messages = await prisma.sentMessage.findMany({
//     where: { user_id: user?.id }
//   });
//   return res.json(messages);    
// }
