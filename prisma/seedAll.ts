import { seedUsers } from "./seed";
import { clearDb } from "./clearDb";

seedUsers()
  .then((res) => {
    console.log("seeded 🌱");
    console.log(res);
  })
  .catch((e) => {
    console.error("error seeding 🌱");
    console.error(e);
  });
