/*
  Warnings:

  - You are about to alter the column `tagged` on the `NewTune` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "tagged" INTEGER,
    CONSTRAINT "NewTune_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewTune" ("artist", "comment", "createdById", "id", "img", "tagged", "title") SELECT "artist", "comment", "createdById", "id", "img", "tagged", "title" FROM "NewTune";
DROP TABLE "NewTune";
ALTER TABLE "new_NewTune" RENAME TO "NewTune";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
