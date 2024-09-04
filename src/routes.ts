import axios from "axios";
import { resend } from "lib/resend";
import { Express, Request, Response } from "express";
import { login, login_v2, refreshToken, register, resendVerificationMail, verifyAccount } from "./controller/user.controller";
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
import { authenticate } from "./middleware/authenticate-jwt";
import { revenueCatHook, setRevenueCatId } from "./controller/revenuecat.controller";

function routes(app: Express) {
  //health check
  app.get("/v1/test",async (req: Request, res: Response) => {
    res.send("Server is healthy");
  });
  
  app.post("/v1/register", register);
  // body: {
  //   email: string;
  //   password: string;
  //   name: string;
  // }
  app.post("/v1/login", login);
  // body: {
  //   email: string;
  //   password: string;
  // }
  app.post("/v1/refresh-token", refreshToken);




  app.post("/v1/save-contact", saveContact);
  // body: {
  //   name: string;
  //   email: string;
  //   number: number;
  // }

  app.get("/v1/get-all-contacts", getAllContacts);
  // body:{
  //   email: string;
  // }

  app.post("/v1/update-contact", updateContact);
  // body: {
  //   name: string,
  //   number: number,
  //   id: string;
  // }
  app.post("/v1/delete-contact", deleteContact);
  // body: {
  //   id: string;
  // }

  // create new template
  app.post("/v1/new-template", newTemplate);
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
  app.get("/v1/get-template", getTemplate);
  // body: {email: string;}

  // edit templlates
  app.post("/v1/edit-template", updateTemplate);
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
  app.post("/v1/delete-template", deleteTemplate);
  // body: {
  //     id: string
  //   }

  app.post("/v1/forgot-password-request", resetPasswordRequest)
  // body: {
  //     email: string
  //   }
  app.post("/v1/check-otp",checkOTP)
  // body: {
  //     email: string
  //     otp: Int
  //   }
  app.post("/v1/reset-password",resetPassword)
  // body: {
  //     token: string
  //     password: Int
  //   }

  app.post("/v1/bug-report", saveBugReport)
  // {
  //   email: string;
  //   title: string;
  //   description: string;
  // }      

//...........................................v2.........................................



app.get("/v2/test" ,async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const authObj=await authenticate(authHeader)
    if(!authObj.id){
      return res.status(401).json({ message: authObj.message });
    }
    console.log("v2:test->",new Date());
    res.send("Server is healthy");
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
})



app.post("/v2/register", register);
  // body: {
  //   email: string;
  //   password: string;
  //   name: string;
  // }
  app.post("/v2/login", login_v2);
  // body: {
  //   email: string;
  //   password: string;
  // }
  app.post("/v2/refresh-token", refreshToken);

  app.get("/v2/verify",verifyAccount)
  app.get("/v2/resend-verification-link",resendVerificationMail)


  app.post("/v2/save-contact", saveContact);
  // body: {
  //   name: string;
  //   email: string;
  //   number: number;
  // }

  app.get("/v2/get-all-contacts", getAllContacts);
  // body:{
  //   email: string;
  // }

  app.post("/v2/update-contact", updateContact);
  // body: {
  //   name: string,
  //   number: number,
  //   id: string;
  // }
  app.post("/v2/delete-contact", deleteContact);
  // body: {
  //   id: string;
  // }

  // create new template
  app.post("/v2/new-template", newTemplate);
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
  app.get("/v2/get-template", getTemplate);
  // body: {email: string;}

  // edit templlates
  app.post("/v2/edit-template", updateTemplate);
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
  app.post("/v2/delete-template", deleteTemplate);
  // body: {
  //     id: string
  //   }

  app.post("/v2/forgot-password-request", resetPasswordRequest)
  // body: {
  //     email: string
  //   }
  app.post("/v2/check-otp",checkOTP)
  // body: {
  //     email: string
  //     otp: Int
  //   }
  app.post("/v2/reset-password",resetPassword)
  // body: {
  //     token: string
  //     password: Int
  //   }

  app.post("/v2/bug-report", saveBugReport)
  // {
  //   email: string;
  //   title: string;
  //   description: string;
  // }      



  //...........................................RC webhook.........................................
  app.post("/v2/rc/webhook", revenueCatHook)
  app.post("/v2/rc/set-id", setRevenueCatId)
}

export default routes;
