import { prisma } from "../lib/db";
import { Request, Response } from "express";

export const newTemplate = async (req: Request, res: Response) => {
  const {
    title,
    preset_msg,
    preset_msg_2,
    tags,
    rule_type,
    regex_value,
    welcome_msg_only,
    email,
    delay_second,
    toggle
  }: {
    email: string;
    title: string;
    preset_msg: string;
    preset_msg_2: string | null;
    tags: string[];
    rule_type: string;
    regex_value: string | null;
    welcome_msg_only: boolean;
    delay_second: string | null;
    toggle: boolean;
  } = req.body;

  try {
    // get the user_id
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const template = await prisma.template.create({
      data: {
        user_id: user.id,
        title,
        preset_msg,
        preset_msg_2,
        tags,
        rule_type,
        welcome_msg_only,
        regex_value,
        delay_second,
        toggle
      },
    });

    res.status(201).json({message:"Template Saved", data:template});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the template");
  }
};

export const getTemplate = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    const user = await prisma.user.findUnique({
      where: { email},
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const templates = await prisma.template.findMany({
      where: { user_id: user.id },
    });

    return res.json({message:"ok",data:templates});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching templates");
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  const {id, title, preset_msg, preset_msg_2, tags, rule_type, welcome_msg_only, regex_value, delay_second, toggle} = req.body;

  try {
    const template = await prisma.template.update({
      where: { id },
      data: {
        title,
        preset_msg,
        preset_msg_2,
        tags,
        rule_type,
        welcome_msg_only,
        regex_value,
        delay_second,
        toggle
      },
    });
    console.log(typeof toggle);
    console.log(typeof welcome_msg_only);
    console.log(template);
    return res.json({message:"updated successfully",data:template});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the template");
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await prisma.template.delete({
      where: { id },
    });

    return res.json({message:"Template deleted"});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the template");
  }
};


// import { prisma } from "../lib/db";
// import { Request, Response } from "express";

// export const newTemplate = async (req: Request, res: Response) => {
//   const {
//     title,
//     preset_msg,
//     tags,
//     email,
//   }: {
//     email: string;
//     title: string;
//     preset_msg: string;
//     tags: string[];
//   } = req.body;

//   // get the user_id
//   const user = await prisma.user.findUnique({ where: { email } });

//   const template = await prisma.template.create({
//     data: {
//       user_id: user?.id,
//       title,
//       preset_msg,
//       tags,
//     },
//   });

//   res.status(201).send("Template Saved");
// };

// export const getTemplate = async (req: Request, res: Response) => {
//   const user = await prisma.user.findUnique({
//     where: { email: req.body.email },
//   });
//   const templates = await prisma.template.findMany({
//     where: { user_id: user?.id },
//   });
//   return res.json(templates);
// };

// export const updateTemplate= async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, preset_msg, tags } = req.body;
//   const template = await prisma.template.update({
//     where: { id },
//     data: {
//       title,
//       preset_msg,
//       tags,
//     },
//   });
//   return res.json(template);
// };

// export const deleteTemplate = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const template = await prisma.template.delete({
//     where: { id },
//   });
//   return res.json(template);
// }