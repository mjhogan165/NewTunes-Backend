import { prisma } from "./prisma-instance";
import { clearDb } from "./clearDb";

export async function seedUsers() {
  await clearDb();

  const userOne = await prisma.user.create({
    data: {
      username: "user-one",
      password: "passwordsyeah",
      email: "bestemail@email.com",
    },
  });
  const userTwo = await prisma.user.create({
    data: {
      username: "user-two",
      password: "pw2",
      email: "bessheep@ail.com",
    },
  });
  const userThree = await prisma.user.create({
    data: {
      username: "user-three",
      password: "pw3",
      email: "pool@email.com",
    },
  });

  const friendRequestOne = await prisma.friendRequest.create({
    data: {
      senderId: userOne.id,
      receiverId: userTwo.id,
      status: "accepted",
    },
  });

  const friendRequestTwo = await prisma.friendRequest.create({
    data: {
      senderId: userTwo.id,
      receiverId: userThree.id,
      status: "rejected",
    },
  });
  return [friendRequestOne, friendRequestTwo];
}
