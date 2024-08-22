import axios from "axios";
import { resend } from "lib/resend";
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
  updateTemplate,
} from "./controller/template.controller";
import { checkOTP, resetPassword, resetPasswordRequest } from "./controller/password.controller";
import { saveBugReport } from "./controller/misc.controller";

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
  //   preset_msg_2: string?,
  //   tags: string[];
  //   rule_type: string,
  //   regex_value: string,
  //   toggle: Bool,
  //   welcome_msg_only: Bool,
  //   delay_second: string?
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
  //     preset_msg_2: string?,
  //     tags: string[];
  //     rule_type: string,
  //     regex_value: string?,
  //     toggle: Bool,
  //     welcome_msg_only: Bool,
  //     delay_second: string?
  //   }

  // delete template
  app.post("/api/delete-template", deleteTemplate);
  // body: {
  //     id: string
  //   }

  app.post("/api/forgot-password-request", resetPasswordRequest)
  // body: {
  //     email: string
  //   }
  app.post("/api/check-otp",checkOTP)
  // body: {
  //     email: string
  //     otp: Int
  //   }
  app.post("/api/reset-password",resetPassword)
  // body: {
  //     token: string
  //     password: Int
  //   }

  app.post("/api/bug-report", saveBugReport)
  // {
  //   email: string;
  //   title: string;
  //   description: string;
  // }
}

export default routes;
