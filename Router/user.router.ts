import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { Express } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
const userController = Router();
import { createUser } from "../prisma/functions";
import { profile } from "console";

// const userSchema = z.object({
//   username: z.string(),
//   password: z.string(),
//   email: z.string(),
// });
// const usersArraySchema = z.array(userSchema);

userController.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  // const parsedData = usersArraySchema.parse(users);
  console.log({ getUsers: users });
  res.status(200).send(users);
  console.log("got");
});
userController.post("/userIdsByName", async (req, res) => {
  const taggedUserIds: number[] = [];
  console.log(req.body);
  for (const username of req.body.usernames) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user) {
      taggedUserIds.push(user.id);
    }
  }

  if (taggedUserIds) {
    return res.status(200).send(taggedUserIds);
  }
});
//create user

userController.post("/user/create", async (req, res) => {
  console.log({ body: req.body });
  const { username, email, profileImg, password } = req.body;

  createUser({
    username: username,
    password: password,
    email: email,
    profileImg: profileImg,
  })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
    })
    .catch(() => {
      return res.status(500).send("not created");
    });
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
  if (user.password) {
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (passCheck) {
      return res.status(200).send(user);
    } else return res.status(500).send("");
  }
});

userController.post("/user/acceptedfriends", async (req, res) => {
  const friendrequestresult = z.object({
    id: z.number(),
    status: z.string(),
  });
  // // const id = +req.params.id;
  const { status, id } = req.body;
  // friendrequestresult.parse(req.body);
  // console.log({ body: req.body });
  console.log(req.body);
  const requestObject = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      sentRequests: {
        where: { status: status },
      },
    },
  });
  return res.status(200).send(requestObject);
});

userController.post("/user/all", async (req, res) => {
  const friendrequestresult = z.object({
    id: z.number(),
    status: z.string(),
  });
  // // const id = +req.params.id;
  const { status, id } = req.body;
  // friendrequestresult.parse(req.body);
  // console.log({ body: req.body });
  console.log(req.body);
  const requestObject = await prisma.user.findMany({});
  console.log(requestObject);
  return res.status(200).send(requestObject);
});

export { userController };
