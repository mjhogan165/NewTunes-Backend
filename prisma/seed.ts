import { prisma } from "./prisma-instance";
import { clearDb } from "./clearDb";
import {
  createUser,
  createFriendship,
  createTuneWithTagged,
} from "./functions";
import { faker } from "@faker-js/faker";

export async function seedUsers() {
  await clearDb();
  const jon = await createUser({
    email: "jon@jon.com",
    password: "jonpass",
    profileImg: faker.image.avatar(),
    username: "jjhiggz",
  });
  const matt = await createUser({
    email: "matt@matt.com",
    password: "mattpass",
    profileImg: faker.image.avatar(),
    username: "iammatt",
  });
  const sally = await createUser({
    email: "sally@gosallygo.com",
    password: "sallypass",
    profileImg: faker.image.avatar(),
    username: "iamsally",
  });
  const bob = await createUser({
    email: "bob@bobbob.com",
    password: "bobpass",
    profileImg: faker.image.avatar(),
    username: "iambob",
  });
  const steve = await createUser({
    email: "steve@email",
    password: "stevepass",
    profileImg: faker.image.avatar(),
    username: "iamsteve",
  });
  const billy = await createUser({
    email: "billyyboi@billy.com",
    password: "billypass",
    profileImg: faker.image.avatar(),
    username: "iambilly",
  });
  const friendMe = await createUser({
    email: "friendme@friendly.com",
    password: "friendMepass",
    profileImg: faker.image.avatar(),
    username: "iamfriendMe",
  });

  const mattAndJonFriendship = await createFriendship(
    jon.id,
    matt.id,
    "accepted"
  );
  const mattAndSteveFriendship = await createFriendship(
    steve.id,
    matt.id,
    "accepted"
  );
  const mattAndsallyFriendship = await createFriendship(
    sally.id,
    matt.id,
    "pending"
  );
  const mattAndBillyFriendship = await createFriendship(
    billy.id,
    matt.id,
    "pending"
  );
  const mattAndBobFriendship = await createFriendship(
    bob.id,
    matt.id,
    "rejected"
  );
  const sallyAndJonFriendship = await createFriendship(
    sally.id,
    jon.id,
    "accepted"
  );
  const sallyAndBobFriendship = await createFriendship(
    sally.id,
    bob.id,
    "rejected"
  );
  const JonAndBobFriendship = await createFriendship(
    bob.id,
    jon.id,
    "accepted"
  );
  createTuneWithTagged([bob.id, sally.id], {
    artist: "singerman",
    title: "titleman",
    img: faker.image.avatar(),
    createdById: jon.id,
    comment: "I like songs",
  });
  createTuneWithTagged([jon.id, sally.id], {
    artist: "bob bob man",
    title: "title are fun ",
    img: faker.image.avatar(),
    createdById: bob.id,
    comment: "you suck",
  });
  createTuneWithTagged([matt.id, jon.id], {
    artist: "song man writer",
    title: "TITLES ",
    img: faker.image.avatar(),
    createdById: bob.id,
    comment: "I like songs",
  });
  createTuneWithTagged([matt.id, bob.id], {
    artist: "THE PERFECT ARTIST",
    title: "i hate titles",
    img: faker.image.avatar(),
    createdById: sally.id,
    comment: "check itttttt",
  });
}
