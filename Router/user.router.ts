import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { Express } from "express";
import bcrypt from "bcrypt";

const userController = Router();

userController.get("/users", async (req, res) => {
  const username = req.body.username;
  const users = await prisma.user.findMany();
  res.status(200).send(users);
  console.log("got");
});
//create user
userController.post("/user/create", async (req, res) => {
  console.log({ body: req.body });
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      email: email,
    },
  });
  if (user) {
    return res.status(200).send(user);
  } else return res.status(500).send("not created");
});

//login
userController.post("/user/login", async (req, res) => {
  const username = req.body.username;
  console.log({ body: req.body });
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.status(500).send("user not found");
  }

  const passCheck = await bcrypt.compare(req.body.password, user.password);
  console.log(passCheck);
  if (passCheck) {
    return res.status(200).send(user);
  } else return res.status(500).send("");
});

export { userController };
