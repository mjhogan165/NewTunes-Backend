/*
  Warnings:

  - You are about to drop the `_NewTuneToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taggedId` to the `NewTune` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_NewTuneToUser_B_index";

-- DropIndex
DROP INDEX "_NewTuneToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NewTuneToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewTune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "createdById" INTEGER NOT NULL,
    "comment" TEXT,
    "taggedId" INTEGER NOT NULL,
    CONSTRAINT "NewTune_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NewTune_taggedId_fkey" FOREIGN KEY ("taggedId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewTune" ("artist", "comment", "createdById", "id", "img", "title") SELECT "artist", "comment", "createdById", "id", "img", "title" FROM "NewTune";
DROP TABLE "NewTune";
ALTER TABLE "new_NewTune" RENAME TO "NewTune";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
