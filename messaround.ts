import { array } from "zod";

const generateUsers = (num: number): IBIGUSER[] => {
  let loop = 1;
  let users: IBIGUSER[] = [];
  for (let i = 0; i < num; i++) {
    const pass = "pass" + loop;
    // const hashPass = await bcrpyt.hash(pass, 10);
    // console.log(pass);
    let newUser = {
      username: "user" + loop,
      password: "pass" + loop,
      email: "user" + num + "@email.com",
    };
    // console.log(newUser);
    users.push(newUser);
    loop++;
  }
  return users;
};

interface IBIGUSER {
  username: string;
  password: string;
  email: string;
}
let usedPairs = [];
let users = generateUsers(30);

interface IFRIENDSREQ {
  senderId: string;
  receiverId: string;
  status: string;
}

let pairs = [];
for (let i = 1; i < users.length; i++) {
  const currUser = users[i];
  //   const num1 = i;
  //   const num2 = i + 1;
  //   const pair = [i, i + 1];
  //   const usedP = [i + 1, i];
  for (let index = 2; index < users.length; index++) {
    const user_ = users[index];
    const genPair = [i, index];
    const revPair = [index, i];
    pairs.push(genPair);
    usedPairs.push(genPair);
    usedPairs.push(revPair);
  }

  //   pairs.push(pair);
  //   usedPairs.push(usedP);
  //   usedPairs.push(pairs);
}
// console.log(users);
// console.log("run");
console.log(pairs);
console.log(usedPairs);

for (const pair of pairs) {
  if (pairs.includes(pair)) {
    pairs;
  }
}

// const genReq = (pairs, usedPairs) => {
//     for (let i = 1; i < [pairs].length; i++) {
//         const currUser = [pairs][i];
//         const addRequest = {
//             senderId: "user" + i,
//             receiverrId: "user" + i,
//             status: "accepted",
//         };
//     }
// }
