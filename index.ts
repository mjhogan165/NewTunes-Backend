import express from "express";
import { prisma } from "./prisma/prisma-instance";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" }).status(200); // the 'status' is unnecessary but wanted to show you how to define a status
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
  console.log("got");
});

app.post("/users", async (req, res) => {
  const body = req.body;
  console.log({ BODY: req.body });
  // if (!body.success) {
  //   // const errMsg = customErrorMap()
  //   // console.log(body.error.issues[0].message);
  //   return res.status(404).send("thing");
  // }
  const users = await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
      email: body.email,
    },
  });
  return res.status(200).send("users");
});

app.get("/friendRequest", async (req, res) => {
  const friendRequests = await prisma.friendRequest.findMany();
  res.status(200).send(friendRequests);
  console.log("got");
});

app.listen(3001);
////////
