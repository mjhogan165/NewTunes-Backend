import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { User } from "@prisma/client";
import { authenticateToken } from "./user.router";
interface NewTuneStructure {
  id?: number;
  artist: string;
  title: string;
  tagged: User[];
  img: string;
  createdById: any;
  comment: string;
}

const newTunesController = Router();

newTunesController.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

newTunesController.get("/newTune", async (req, res) => {
  const newTunes = await prisma.newTune.findMany({
    include: {
      tagged: {
        select: {
          id: true,
          username: true,
          email: true,
          profileImg: true,
        },
      },
      createdBy: true,
    },
  });
  return res.status(200).send(newTunes);
});
newTunesController.get("/newTune/:id", async (req, res) => {
  const userId = +req.params.id;
  const newTunes = await prisma.newTune.findMany({
    include: {
      tagged: true,
    },
  });

  res.status(200).send(newTunes);
});
newTunesController.post("/newTune", async (req, res) => {
  const taggedIds: [] = [];
  taggedIds.push();
  const newTune = await prisma.newTune.create({
    data: {
      artist: req.body.artist,
      title: req.body.title,
      img: req.body.img,
      comment: req.body.comment,
      createdById: req.body.createdById,
    },
  });
  for (const userId of req.body.taggedUserIds) {
    const tagged = await prisma.newTune.update({
      where: {
        id: newTune.id,
      },
      data: {
        tagged: { connect: { id: userId } },
        createdBy: { connect: { id: req.body.createdById } },
      },
    });
  }
  return res.status(200).send(newTune);
});
newTunesController.post("/newTune/byUser", async (req, res) => {});

export { newTunesController };
