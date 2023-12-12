import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { Express } from "express";

const friendsController = Router();

friendsController.get("/friendRequest", async (req, res) => {
  const friendRequests = await prisma.friendRequest.findMany();
  res.status(200).send(friendRequests);
  console.log("get friendRequest");
});
friendsController.post("/friendRequest", async (req, res) => {
  console.log("post friendRequest");
  const body = req.body;
  console.log({ BODY: req.body });
  const friendRequest = await prisma.friendRequest.create({
    data: {
      senderId: body.senderId,
      receiverId: body.receiverId,
      status: body.status,
    },
  });
  return res.status(201).send(friendRequest);
});

friendsController.get("/friendRequest/:id", async (req, res) => {
  console.log("get friends by id");
  const id = +req.params.id;
  const friends = await prisma.friendRequest.findMany({
    where: {
      OR: [{ senderId: id }, { receiverId: id }],
    },
  });
  console.log(friends);
  return res.status(400).send(friends);
});

export { friendsController };
