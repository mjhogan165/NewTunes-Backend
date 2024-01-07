import { Router } from "express";
import { prisma } from "../prisma/prisma-instance";
import { Express } from "express";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NewTune, User } from "@prisma/client";
import { createTuneWithTagged } from "../prisma/functions";

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
    },
  });
  res.status(200).send(newTunes);
});
newTunesController.get("/newTune/:id", async (req, res) => {
  const userId = +req.params.id;
  const newTunes = await prisma.newTune
    .findMany({
      // include: {
      //   tagged: true,
      // },

      include: {
        tagged: true,
      },
    })
    .then((res) => {
      console.log({ res: res });
    });
  // const returnOnlytagged = (id: number, arr:[]) => {
  //   let filteredArr = [];
  //   for (const tune of arr) {
  //     console.log(tune.tagged.id);
  //     if (arr.tagged.id === id) {
  //       filteredArr.push(tune);
  //     }
  //   }
  //   return filteredArr;
  // };
  // const filtered = await returnOnlytagged(userId, newTunes);

  res.status(200).send(newTunes);
  console.log("get newTune");
});
newTunesController.post("/newTune", async (req, res) => {
  console.log("post newTune");
  console.log({ backEndreq: req.body });
  // const newTune = await prisma.newTune.create({
  //   data: {
  // artist: req.body.artist,
  // title: req.body.title,
  // img: req.body.img,
  // comment: req.body.comment,
  // createdById: req.body.createdById,
  //     //createdBy: req.body.createdBy,
  //     // tagged: { create : taggedUsers },
  //   },
  // });
  // for (const userId of req.body.taggedUserIds) {
  //   const tagged = await prisma.newTune.update({
  //     where: {
  //       id: newTune.id,
  //     },
  //     data: {
  //       tagged: { connect: { id: userId } },
  //     },
  //   });
  // }
  const newTune = await createTuneWithTagged(req.body.taggedUserIds, {
    artist: req.body.artist,
    title: req.body.title,
    img: req.body.img,
    comment: req.body.comment,
    createdById: req.body.createdById,
  });
  return res.status(200).send(newTune);
});
newTunesController.post("/newTune/byUser", async (req, res) => {});

export { newTunesController };
