import express from "express";
import { prisma } from "./prisma/prisma-instance";
import { friendsController } from "./Router/friends.router";
import { userController } from "./Router/user.router";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(friendsController);
app.use(userController);

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" }).status(200); // the 'status' is unnecessary but wanted to show you how to define a status
});

app.get("/newTune", async (req, res) => {
  const newTunes = await prisma.newTune.findMany();
  res.status(200).send(newTunes);
  console.log("get newTune");
});
app.post("/newTune", async (req, res) => {
  const newTunes = await prisma.newTune.findMany();
  res.status(200).send(newTunes);
  console.log("post newTune");
});

app.listen(3001);
