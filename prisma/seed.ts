import { prisma } from "./prisma-instance";
import { clearDb } from "./clearDb";
import { createUsers, generateUsers, createFriends } from "./functions";

export async function seedUsers() {
  await clearDb();

  const generatedUsers = await generateUsers(20);

  const createdUsers = await createUsers(generatedUsers);

  const createdFriends = await createFriends(createdUsers);

  return [createdUsers, createdFriends];
}
