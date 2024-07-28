"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controller/user.controller");
const contact_controller_1 = require("./controller/contact.controller");
const template_controller_1 = require("./controller/template.controller");
function routes(app) {
    //health check
    app.get("/api/test", async (req, res) => {
        res.send("Server is healthy");
    });
    app.post("/api/register", user_controller_1.register);
    // body: {
    //   email: string;
    //   password: string;
    //   name: string;
    // }
    app.post("/api/login", user_controller_1.login);
    // body: {
    //   email: string;
    //   password: string;
    // }
    app.post("/api/save-contact", contact_controller_1.saveContact);
    // body: {
    //   name: string;
    //   email: string;
    //   number: number;
    // }
    app.get("/api/get-all-contacts", contact_controller_1.getAllContacts);
    // body:{
    //   email: string;
    // }
    app.post("/api/update-contact", contact_controller_1.updateContact);
    // body: {
    //   name: string,
    //   number: number,
    //   id: string;
    // }
    app.post("/api/delete-contact", contact_controller_1.deleteContact);
    // body: {
    //   id: string;
    // }
    // create new template
    app.post("/api/new-template", template_controller_1.newTemplate);
    // {
    //   email: string;
    //   title: string;
    //   preset_msg: string;
    //   tags: string[];
    // }
    // get templates
    app.get("/api/get-template", template_controller_1.getTemplate);
    // body: {email: string;}
    // edit templlates
    app.post("/api/edit-template", template_controller_1.updateTemplate);
    // body: {
    //     id: string, 
    //     title: string, 
    //     preset_msg: string, 
    //     tags: string[];
    //   }
    // toggle template
    app.post("/api/toggle-template", template_controller_1.toggleTemplate);
    // body: {
    //     id: string, 
    //     toggle: boolean
    //   }
    // delete template
    app.post("/api/delete-template", template_controller_1.deleteTemplate);
    // body: {
    //     id: string
    //   }
}
exports.default = routes;
//# sourceMappingURL=routes.js.map