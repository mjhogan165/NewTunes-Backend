import express from "express";
import { prisma } from "./prisma/prisma-instance";
import { friendsController } from "./Router/friends.router";
import { userController } from "./Router/user.router";
import { newTunesController } from "./Router/newTunes.router";
import cors from "cors";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// var cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(friendsController);
app.use(userController);
app.use(newTunesController);

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" }).status(200); // the 'status' is unnecessary but wanted to show you how to define a status
});

app.listen(3001);
