import axios from "axios";
import { Express, Request, Response } from "express";
import { login, register } from "./controller/user.controller";
import {
  deleteContact,
  getAllContacts,
  saveContact,
  updateContact,
} from "./controller/contact.controller";
import {
  deleteTemplate,
  getTemplate,
  newTemplate,
  toggleTemplate,
  updateTemplate,
} from "./controller/template.controller";

function routes(app: Express) {
  //health check
  app.get("/api/test", async (req: Request, res: Response) => {
    res.send("Server is healthy");
  });

  app.post("/api/register", register);
  // body: {
  //   email: string;
  //   password: string;
  //   name: string;
  // }
  app.post("/api/login", login);
  // body: {
  //   email: string;
  //   password: string;
  // }

  app.post("/api/save-contact", saveContact);
  // body: {
  //   name: string;
  //   email: string;
  //   number: number;
  // }

  app.get("/api/get-all-contacts", getAllContacts);
  // body:{
  //   email: string;
  // }

  app.post("/api/update-contact", updateContact);
  // body: {
  //   name: string,
  //   number: number,
  //   id: string;
  // }
  app.post("/api/delete-contact", deleteContact);
  // body: {
  //   id: string;
  // }

  // create new template
  app.post("/api/new-template", newTemplate);
  // {
  //   email: string;
  //   title: string;
  //   preset_msg: string;
  //   tags: string[];
  //   type: EXPERT | SIMILAR | EXACT,
  //   regex: string,
  //   welcome_msg_only: Bool,
  // }

  // get templates
  app.get("/api/get-template", getTemplate);
  // body: {email: string;}

  // edit templlates
  app.post("/api/edit-template", updateTemplate);
  // body: {
  //     id: string,
  //     title: string,
  //     preset_msg: string,
  //     tags: string[];
  //     type: EXPERT | SIMILAR | EXACT,
  //     regex: string,
  //     welcome_msg_only: Bool,
  //   }

  // toggle template
  app.post("/api/toggle-template", toggleTemplate);
  // body: {
  //     id: string,
  //     toggle: boolean
  //   }

  // delete template
  app.post("/api/delete-template", deleteTemplate);
  // body: {
  //     id: string
  //   }
}

export default routes;
