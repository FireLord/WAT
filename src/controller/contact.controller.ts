import { authenticate } from "../middleware/authenticate-jwt";
import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const saveContact = async (req: Request, res: Response) => {
  const {
    email,
    name,
    number,
  }: {
    name: string;
    email: string;
    number: string;
  } = req.body;

  try {
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2: saveContact->",new Date());


    // get the user_id
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({message:"User not found"});
    }

    const contact = await prisma.contact.create({
      data: {
        user_id: user.id,
        original_number: number,
        contact_name: name,
      },
    });
    console.log(contact);

    res.status(201).json({message:"Contact Saved", data:contact});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while saving the contact"});
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2: getAllContacts->",new Date());


    const email = req.query.email as string;
    const user = await prisma.user.findUnique({
      where: {email},
    });
    if (!user) {
      return res.status(404).json({message:"User not found"});
    }

    const contacts = await prisma.contact.findMany({
      where: { user_id: user.id },
    });

    return res.json({message:"ok",data:contacts});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while fetching contacts"});
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { name, number, id }:{name:string, number:string, id:string} = req.body;

  try {
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2: updateContact->",new Date());

    const contact = await prisma.contact.update({
      where: { id },
      data: {
        contact_name: name,
        original_number: number,
      },
    });

    return res.json({message:"updated sucessfully",data:contact});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while updating the contact"});
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2: deleteContact->",new Date());

    await prisma.contact.delete({
      where: { id },
    });

    return res.json({message:"Contact deleted"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"An error occurred while deleting the contact"});
  }
};


// ...........................................v2....................................... 
