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
    // get the user_id
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
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
    res.status(500).send("An error occurred while saving the contact");
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await prisma.user.findUnique({
      where: {email},
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const contacts = await prisma.contact.findMany({
      where: { user_id: user.id },
    });

    return res.json({message:"ok",data:contacts});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching contacts");
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { name, number, id }:{name:string, number:string, id:string} = req.body;

  try {
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
    res.status(500).send("An error occurred while updating the contact");
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await prisma.contact.delete({
      where: { id },
    });

    return res.json({message:"Contact deleted"});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the contact");
  }
};



// import { prisma } from "../lib/db";
// import { Request, Response } from "express";

// export const saveContact = async (req: Request, res: Response) => {
//   const {
//     email,
//     name,
//     number,
//   }: {
//     name: string;
//     email: string;
//     number: number;
//   } = req.body;

//   // get the user_id
//   const user = await prisma.user.findUnique({ where: { email } });
//   console.log(user);
//   const contact = await prisma.contact.create({
//     data: {
//       user_id: user.id,
//       orignal_number: number,
//       contact_name: name,
//     },
//   });

//   res.status(201).send("Contact Saved");
// };

// export const getAllContacts = async (req: Request, res: Response) => {
//   const user = await prisma.user.findUnique({
//     where: { email: req.body.email },
//   });
//   const contacts = await prisma.contact.findMany({
//     where: { user_id: user?.id },
//   });
//   return res.json(contacts);
// }

// export const updateContact = async (req: Request, res: Response) => {
//   const { name, number, id } = req.body;
//   const contact = await prisma.contact.update({
//     where: { id },
//     data: {
//       contact_name: name,
//       orignal_number: number
//     },
//   });
//   return res.json(contact);
// }

// export const deleteContact = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   const contact = await prisma.contact.delete({
//     where: { id },
//   });
//   return res.send("contact deleted")
// }
