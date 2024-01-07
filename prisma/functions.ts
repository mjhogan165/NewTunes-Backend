import { prisma } from "./prisma-instance";
import bcrpyt from "bcrypt";
import { faker } from "@faker-js/faker";
import { NewTune, User } from "@prisma/client";
import { rejects } from "assert";

export const createUser = async (
  info: Pick<User, "email" | "password" | "profileImg" | "username">
) => {
  const { password, ...restOfInfo } = info;
  return await prisma.user.create({
    data: {
      ...restOfInfo,
      password: await bcrpyt.hash(password!, 10),
    },
  });
};

type a = Partial<{
  name: string;
  id: number;
  password: string;
}>;

export const getPublicUser = async (
  whereInput: Partial<Pick<User, "email" | "id" | "username">>
) => {
  const publicUser = await prisma.user.findFirstOrThrow({
    select: {
      username: true,
      email: true,
      profileImg: true,
    },
    where: {
      ...whereInput,
    },
  });
  return publicUser;
};

export const getPrivateUser = async (
  whereInput: Partial<Pick<User, "email" | "id" | "username">>
) => {
  const privateUser = await prisma.user.findFirstOrThrow({
    where: {
      ...whereInput,
    },
  });
  return privateUser;
};
export const createFriendship = async (
  userId1: number,
  userId2: number,
  status: string
) => {
  const friendRequest = await prisma.friendRequest.create({
    data: {
      senderId: userId1,
      receiverId: userId2,
      status: status,
    },
  });
  return friendRequest;
};

export const createTune = async (
  artist: string,
  title: string,
  img: string,
  comment: string,
  createdById: number
) => {
  const createdTune = await prisma.newTune.create({
    data: {
      artist: artist,
      title: title,
      img: img,
      comment: comment,
      createdById: createdById,
    },
  });
};

export const addUsersToDb = async (arr: any) => {
  // console.log({ addUsersToDb: arr });
  let users = [];
  for (let i = 0; i < arr.length; i++) {
    const user = arr[i];
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        profileImg: user.profileImg,
      },
    });
    users.push(newUser);
  }
  return users;
};
export async function createFriends(arr: any) {
  let requests = [];
  let pairs = [];
  for (let i = 0; i < arr.length - 10; i++) {
    const user = arr[i];
    //friend
    const acceptedRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id, //1
        receiverId: user.id + 1, //2
        status: "accepted",
      },
    });
    //friend
    const acceptedRequestTwo = await prisma.friendRequest.create({
      data: {
        senderId: user.id + 2, //3
        receiverId: user.id, //1
        status: "accepted",
      },
    });
    //sent reject
    const rejectedRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id, //1
        receiverId: user.id + 3, //4
        status: "rejected",
      },
    });
    //recieve reject
    const rejectedRequestTwo = await prisma.friendRequest.create({
      data: {
        senderId: user.id + 4, //5
        receiverId: user.id, //1
        status: "rejected",
      },
    });
    //receive req
    const pendingRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id + 5, //6
        receiverId: user.id, //1
        status: "pending",
      },
    });
    //send req
    const pendingRequestTwo = await prisma.friendRequest.create({
      data: {
        senderId: user.id, //1
        receiverId: user.id + 6, //7
        status: "pending",
      },
    });
    //receive req
    const pendingRequestThree = await prisma.friendRequest.create({
      data: {
        senderId: user.id + 7, //8
        receiverId: user.id, //1
        status: "pending",
      },
    });
    requests.push(acceptedRequest);
    requests.push(acceptedRequestTwo);
    requests.push(rejectedRequest);
    requests.push(rejectedRequestTwo);
    requests.push(pendingRequest);
    requests.push(pendingRequestTwo);
  }
}

function generateRandomInt(limit: number) {
  return Math.floor(Math.random() * (limit - 0) + 0);
}

const returnDefaultTune = (user: string, id: number) => {
  const createdBy = id === 0 ? "user1" : "user0";
  const tagged = id === 0 ? "user0" : user;

  return {
    artist: `${faker.person.firstName()} ${faker.music.genre()}`,
    title: faker.music.songName(),
    img: faker.image.avatar(),
    createdBy: createdBy,
    comment: faker.lorem.lines(2),
    tagged: tagged,
    id: id,
  };
};

export function generateTunes(users: User[]) {
  const inputArray = [];
  for (let index = users.length; index < users.length + 75; index++) {
    const num1 = generateRandomInt(users.length);
    let num2 = generateRandomInt(users.length);
    if (num1 === num2) {
      num2 = num1 + 1;
    }
    const createdBy = "user" + num1.toString();
    const tagged = "user" + num2.toString();

    const randomTune = {
      artist: `${faker.person.firstName()} ${faker.music.genre()}`,
      title: faker.music.songName(),
      img: faker.image.avatar(),
      createdBy: createdBy,
      comment: faker.lorem.lines(2),
      tagged: tagged,
      id: index,
    };
    inputArray.push(randomTune);
  }

  return inputArray;
}

export const createTuneWithTagged = async (
  taggedIds: number[],
  tuneData: Omit<NewTune, "id">
) => {
  console.log({ input: tuneData });
  const newTune = await prisma.newTune.create({
    data: {
      artist: tuneData.artist,
      title: tuneData.title,
      img: tuneData.img,
      comment: tuneData.comment,
      createdById: tuneData.createdById,
      //createdBy: req.body.createdBy,
      // tagged: { create : taggedUsers },
    },
  });
  // const awaiting = await console.log({
  //   newTuneid: newTune.id,
  //   createdById: req.body.createdById,
  // });
  for (const taggedId of taggedIds) {
    await prisma.newTune.update({
      where: {
        id: newTune.id,
      },
      data: {
        tagged: { connect: { id: taggedId } },
      },
    });
  }
};
