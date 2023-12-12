import { prisma } from "./prisma-instance";
import bcrpyt from "bcrypt";

export const generateUsers = async (num: number) => {
  let loop = 1;
  let users: any = [];
  for (let i = 0; i < num; i++) {
    const pass = "pass" + loop;
    const hashPass = await bcrpyt.hash(pass, 10);
    console.log(pass);
    let newUser = {
      username: "user" + loop,
      password: hashPass,
      email: "user" + num + "@email.com",
    };
    console.log(newUser);
    users.push(newUser);
    loop++;
  }
  return users;
};

export const createUsers = async (arr: any) => {
  let users = [];
  for (let i = 0; i < arr.length; i++) {
    const user = arr[i];
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
    users.push(newUser);
  }
  return users;
};
export async function createFriends(arr: any) {
  let requests = [];
  for (let i = 0; i < arr.length - 10; i++) {
    const user = arr[i];
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id,
        receiverId: user.id + 1,
        status: "accepted",
      },
    });
    requests.push(friendRequest);
  }
  return requests;
}
