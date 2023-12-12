import bcrypt from "bcrypt";

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

let hash = bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {});
});

// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//   // result == true
// });
