import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { Express } from "express";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const friendsController = Router();

// friendsController.get("/friendRequest", async (req, res) => {
//   const friendRequests = await prisma.friendRequest.findMany();
//   res.status(200).send(friendRequests);
//   console.log("get friendRequest");
// });

//find users friends
friendsController.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
friendsController.get("/friendRequest", async (req, res) => {
  const friendRequests = await prisma.friendRequest.findMany();
  res.status(200).send(friendRequests);
  console.log("get friendRequest");
});
friendsController.post("/friendRequest/create", async (req, res) => {
  console.log("post friendRequest");
  const incoming = {
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    status: req.body.status,
  };
  console.log(incoming);
  const newFriend = z.object({
    senderId: z.number(),
    receiverId: z.number(),
    status: z.string(),
  });
  const parse = newFriend.parse(req.body);
  console.log(parse);
  // const body = req.body;

  const friendRequest = await prisma.friendRequest.create({
    data: {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      status: req.body.status,
    },
  });
  return res.status(201).send(friendRequest);
});

friendsController.post("/friendRequest/accepted", async (req, res) => {
  const friendrequestresult = z.object({
    id: z.number(),
    status: z.string(),
  });
  const { id, status } = req.body;
  // console.log(req.body);
  const acceptedFriends = await prisma.friendRequest.findMany({
    where: {
      status: status,
      OR: [{ senderId: id }, { receiverId: id }],
    },
    include: { receiver: true, sender: true },
  });
  return res.status(200).send(acceptedFriends);
});
friendsController.patch("/friendRequest/accepted", async (req, res) => {
  const friendrequestresult = z.object({
    id: z.number(),
    status: z.string(),
  });
  const { id, status } = req.body;
  // console.log(req.body);
  const acceptedFriends = await prisma.friendRequest.findMany({
    where: {
      status: status,
      OR: [{ senderId: id }, { receiverId: id }],
    },
    include: { receiver: true, sender: true },
  });
  return res.status(200).send(acceptedFriends);
});
friendsController.patch("/friendRequest/pending", async (req, res) => {
  const friendrequestresult = z.object({
    id: z.number(),
    status: z.string(),
  });
  const { id, status } = req.body;

  const updatedRequest = await prisma.friendRequest.updateMany({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  console.log({
    endpoint: "PATCH friend",
    body: req.body,
    updatedResult: updatedRequest,
  });
  return res.status(200).send(updatedRequest);
});

friendsController.post("/friendRequest/pending", async (req, res) => {
  const { id, status } = req.body;
  const pendingFriends = await prisma.friendRequest.findMany({
    where: {
      status: status,
      OR: [{ senderId: id }, { receiverId: id }],
    },
    include: { receiver: true, sender: true },
  });
  return res.status(200).send(pendingFriends);
});
friendsController.post("/friendRequest/rejected", async (req, res) => {
  const { id, status } = req.body;
  const pendingFriends = await prisma.friendRequest.findMany({
    where: {
      status: status,
      OR: [{ senderId: id }, { receiverId: id }],
    },
    include: { receiver: true, sender: true },
  });
  return res.status(200).send(pendingFriends);
});
// friendsController.patch("/friendRequest/rejected", async (req, res) => {
//  const friendrequestresult = z.object({
//    id: z.number(),
//    status: z.string(),
//  });
//  const { id, status } = req.body;
//  console.log(req.body);
//  const updatedRequest = await prisma.friendRequest.updateMany({
//    where: {
//      id: id,
//    },
//    data: {
//      status: status,
//    },
//  });
//  return res.status(200).send(updatedRequest);
// });

export { friendsController };
