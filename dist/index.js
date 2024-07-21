"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const socketAccessToken = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJLUTc5NDMiLCJqdGkiOiI2NjliYTVhNzUyNTMyNTEzNjI2NzcxNTIiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzIxNDc2NTE5LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MjE1MTI4MDB9.SAriOSEy6KChMFsxQcwbpaOuNzj9HLIIdb63dK7eWDY";
// import deserializeUser from "./middleware/deserializeUser";
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,userId,agentid,adminid,skey");
    next();
});
// app.use(deserializeUser);
app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
    (0, routes_1.default)(app);
});
//////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=index.js.map