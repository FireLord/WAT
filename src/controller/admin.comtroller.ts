import { authenticate } from "../middleware/authenticate-jwt";
import { prisma } from "../lib/db";
import { Request, Response } from "express";


export const getStats = async (req: Request, res: Response) => {
  try {
    // const authHeader = req.headers['authorization'];
    // const authObj=await authenticate(authHeader)
    // if(!authObj.id){
    //   return res.status(401).json({ message: authObj.message });
    // }
    // if(authObj.id!=="cm199ay8u001a9ya4rdptzlo1"){
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    const verified_users = await prisma.user.findMany({
      where: {
        verified: true,
      },
    })
    // console.log(users);
    const payload  = {total_verified_users:verified_users.length, total_active_users:0, total_expired_users:0, active_users:[], expired_users:[], verified_users:[], }
    // verified_users.map(async (user) => )
    for(let i=0;i<verified_users.length;i++){
      const user = verified_users[i]
      const contacts = await prisma.contact.findMany({
        where: {
          user_id: user.id,
        },
      })

      const templates = await prisma.template.findMany({
        where: {
          user_id: user.id,
        },
      })

      // user.contacts = contacts.length
      // user.templates = templates.length
      if(user.subscription_expiry!==null){
        console.log(user.subscription_expiry);
        if(new Date() > new Date(user.subscription_expiry)){
          payload.expired_users.push({...user, total_contacts:contacts.length, total_templates:templates.length, contacts, templates})
          payload.total_expired_users = payload.total_expired_users + 1
        }else{
          payload.active_users.push({...user, total_contacts:contacts.length, total_templates:templates.length, contacts, templates})
          payload.total_active_users = payload.total_active_users + 1
        }
      }else{
        payload.verified_users.push({...user, total_contacts:contacts.length, total_templates:templates.length, contacts, templates})
        payload.total_verified_users = payload.total_verified_users + 1
      }


    }

    return res.json({message:"ok",data:payload});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while fetching templates"});
  }
};
