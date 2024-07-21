import express, { Request, Response } from "express";
import { prisma } from "./lib/db";
import routes from "./routes";


const socketAccessToken = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJLUTc5NDMiLCJqdGkiOiI2NjliYTVhNzUyNTMyNTEzNjI2NzcxNTIiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzIxNDc2NTE5LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MjE1MTI4MDB9.SAriOSEy6KChMFsxQcwbpaOuNzj9HLIIdb63dK7eWDY"

// import deserializeUser from "./middleware/deserializeUser";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,userId,agentid,adminid,skey"
  );
  next();
});

// app.use(deserializeUser);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  routes(app);
});

//////////////////////////////////////////////////////////////////////////////////////////
