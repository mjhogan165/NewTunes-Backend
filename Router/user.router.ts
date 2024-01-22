import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import bcrypt from "bcrypt";
import { createUser } from "../prisma/functions";
import jwt from "jsonwebtoken";

const secretKey = process.env.ACCESS_TOKEN_SECRET
  ? process.env.ACCESS_TOKEN_SECRET
  : "wy3g3w5w9j5";

const userController = Router();
userController.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      id: true,
      profileImg: true,
      username: true,
    },
  });
  res.status(200).send(users);
});
userController.get("/user/:id", async (req, res) => {
  const userId = +req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  console.log({ user: user });
  res.status(200).send(user);
});
userController.post("/userIdsByName", async (req, res) => {
  const taggedUserIds: number[] = [];
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
userController.post("/user/create", async (req, res) => {
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
export const authenticateToken = (req: any, res: any, next: any) => {
  console.log("Called");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401);
  }
  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

userController.post("/user/login", async (req, res) => {
  const username = req.body.username;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.status(500).send("user not found");
  }

  const myJwt = jwt.sign(user, secretKey);

  if (user.password) {
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (passCheck) {
      return res.status(200).json(myJwt);
    } else return res.status(500).send("");
  }
});

userController.post("/user/acceptedfriends", async (req, res) => {
  const { status, id } = req.body;
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
  const { status, id } = req.body;
  const requestObject = await prisma.user.findMany({});
  return res.status(200).send(requestObject);
});

export { userController };
