import { prisma } from "./prisma-instance";
import { clearDb } from "./clearDb";
import {
  createFriends,
  generateTunes,
  addUsersToDb,
  createUser,
  createFriendship,
  createTune,
  createTuneWithTagged,
} from "./functions";
import { faker } from "@faker-js/faker";
//import { createTuneWithUsers } from "./models/tune";

export async function seedUsers() {
  await clearDb();

  // const generatedUsers = await generateUsers(30);

  //const createdUsers = await addUsersToDb(generatedUsers);
  // const tunes = await createTunes(createdUsers);
  //const acceptedFriends = await createFriends(createdUsers);
  const jon = await createUser({
    email: "jon@jon.com",
    password: "billybob",
    profileImg: faker.image.avatar(),
    username: "jjhiggz",
  });
  const matt = await createUser({
    email: "matt@matt.com",
    password: "mattymatt",
    profileImg: faker.image.avatar(),
    username: "iammatt",
  });
  const lauren = await createUser({
    email: "Luaren@luaren.com",
    password: "laurenpass",
    profileImg: faker.image.avatar(),
    username: "laurenname",
  });
  const bob = await createUser({
    email: "bob@bobbob.com",
    password: "bobiscool",
    profileImg: faker.image.avatar(),
    username: "iambob",
  });
  const steve = await createUser({
    email: "steve@email",
    password: "StevieBOI",
    profileImg: faker.image.avatar(),
    username: "iamsteve",
  });
  const billy = await createUser({
    email: "billyyboi@billy.com",
    password: "bigbilly",
    profileImg: faker.image.avatar(),
    username: "goforbilly",
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
  const mattAndLaurenFriendship = await createFriendship(
    lauren.id,
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
  const laurenAndJonFriendship = await createFriendship(
    lauren.id,
    jon.id,
    "accepted"
  );
  const laurenAndBobFriendship = await createFriendship(
    lauren.id,
    bob.id,
    "rejected"
  );
  const JonAndBobFriendship = await createFriendship(
    bob.id,
    jon.id,
    "accepted"
  );
  createTuneWithTagged([bob.id, lauren.id], {
    artist: "singerman",
    title: "titleman",
    img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg",
    createdById: jon.id,
    comment: "I like songs",
  });
  createTuneWithTagged([jon.id, lauren.id], {
    artist: "bob bob man",
    title: "title are fun ",
    img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg",
    createdById: bob.id,
    comment: "you suck",
  });
  createTuneWithTagged([matt.id, jon.id], {
    artist: "song man writer",
    title: "TITLES ",
    img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg",
    createdById: bob.id,
    comment: "I like songs",
  });
  createTuneWithTagged([matt.id, bob.id], {
    artist: "THE PERFECT ARTIST",
    title: "i hate titles",
    img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/509.jpg",
    createdById: lauren.id,
    comment: "check itttttt",
  });
  // const tune1 = createTuneWithUsers(
  //   {
  //     artist: "johnBoi",
  //     title: "best artist",
  //     comment: " kldfjolsdfj",
  //     createdById: matt.id,
  //     img: faker.image.avatar(),
  //   },
  //   [jon.id, matt.id]
  // );
  //const mattTuneOne = await createTune("goodartist", "SongTitle", null, "comments are cool", 1353 )
}
