import { NewTune } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../prisma-instance";
import { getPublicUser } from "../functions";

// export const createTuneWithUsers = async (
//   tuneData: Omit<NewTune, "id">,
//   userIds: number[]
// ) => {
//   const newTune = await prisma.newTune.create({
//     data: {
//       artist: tuneData.artist,
//       title: tuneData.title,
//       img: tuneData.img,
//       comment: tuneData.comment,
//       createdById: tuneData.createdById,
//       //createdBy: req.body.createdBy,
//       // tagged: { create: taggedUsers },
//     },
//   });
//   for (const id of userIds) {
//     const user = getPublicUser({ id });
//     await prisma.newTune.update({
//       where: {
//         id: newTune.id,
//       },
//       data: {
//         tagged: { push: user },
//       },
//     });
//   }
// };
