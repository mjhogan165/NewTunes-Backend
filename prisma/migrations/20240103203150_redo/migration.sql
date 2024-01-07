/*
  Warnings:

  - You are about to drop the column `taggedId` on the `NewTune` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_NewTuneToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NewTuneToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "NewTune" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NewTuneToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewTune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "createdById" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "NewTune_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewTune" ("artist", "comment", "createdById", "id", "img", "title") SELECT "artist", "comment", "createdById", "id", "img", "title" FROM "NewTune";
DROP TABLE "NewTune";
ALTER TABLE "new_NewTune" RENAME TO "NewTune";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_NewTuneToUser_AB_unique" ON "_NewTuneToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NewTuneToUser_B_index" ON "_NewTuneToUser"("B");
