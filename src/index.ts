import express, { Request, Response } from "express";
import { prisma } from "./lib/db";
import routes from "./routes";


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
