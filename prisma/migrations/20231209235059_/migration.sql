-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FriendRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FriendRequest" ("id", "receiverId", "senderId", "status") SELECT "id", "receiverId", "senderId", "status" FROM "FriendRequest";
DROP TABLE "FriendRequest";
ALTER TABLE "new_FriendRequest" RENAME TO "FriendRequest";
CREATE TABLE "new_NewTune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "createdById" INTEGER NOT NULL,
    "comment" TEXT,
    "tagged" TEXT,
    CONSTRAINT "NewTune_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewTune" ("artist", "comment", "createdById", "id", "img", "tagged", "title") SELECT "artist", "comment", "createdById", "id", "img", "tagged", "title" FROM "NewTune";
DROP TABLE "NewTune";
ALTER TABLE "new_NewTune" RENAME TO "NewTune";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
