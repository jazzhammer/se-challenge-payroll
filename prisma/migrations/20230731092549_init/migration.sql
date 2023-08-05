/*
  Warnings:

  - Added the required column `fileId` to the `TimeReportItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeReportItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "dom" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,
    "jobGroup" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL
);
INSERT INTO "new_TimeReportItem" ("dom", "employeeId", "hours", "id", "jobGroup", "month", "year") SELECT "dom", "employeeId", "hours", "id", "jobGroup", "month", "year" FROM "TimeReportItem";
DROP TABLE "TimeReportItem";
ALTER TABLE "new_TimeReportItem" RENAME TO "TimeReportItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
