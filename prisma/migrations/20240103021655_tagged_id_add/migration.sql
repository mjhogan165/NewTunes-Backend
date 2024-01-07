/*
  Warnings:

  - You are about to drop the column `tagged` on the `NewTune` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewTune" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,
    "createdById" INTEGER NOT NULL,
    "comment" TEXT,
    "taggedId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "NewTune_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NewTune_taggedId_fkey" FOREIGN KEY ("taggedId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewTune" ("artist", "comment", "createdById", "id", "img", "title") SELECT "artist", "comment", "createdById", "id", "img", "title" FROM "NewTune";
DROP TABLE "NewTune";
ALTER TABLE "new_NewTune" RENAME TO "NewTune";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
