import { seedUsers } from "./seed";
import { clearDb } from "./clearDb";

seedUsers()
  .then((res) => {
    console.log("seeded 🌱");
  })
  .catch((e) => {
    console.error("error seeding 🌱");
    console.error(e);
  });
