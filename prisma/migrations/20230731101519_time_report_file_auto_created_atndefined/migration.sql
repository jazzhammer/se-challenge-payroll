/*
  Warnings:

  - You are about to drop the column `fileId` on the `TimeReportItem` table. All the data in the column will be lost.
  - Added the required column `timeReportFileId` to the `TimeReportItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeReportItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "dom" INTEGER NOT NULL,
    "ymd" DATETIME NOT NULL,
    "hours" DECIMAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "jobGroup" TEXT NOT NULL,
    "timeReportFileId" INTEGER NOT NULL
);
INSERT INTO "new_TimeReportItem" ("dom", "employeeId", "hours", "id", "jobGroup", "month", "year", "ymd") SELECT "dom", "employeeId", "hours", "id", "jobGroup", "month", "year", "ymd" FROM "TimeReportItem";
DROP TABLE "TimeReportItem";
ALTER TABLE "new_TimeReportItem" RENAME TO "TimeReportItem";
CREATE TABLE "new_TimeReportFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileId" INTEGER NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TimeReportFile" ("fileId", "id", "uploadedAt") SELECT "fileId", "id", "uploadedAt" FROM "TimeReportFile";
DROP TABLE "TimeReportFile";
ALTER TABLE "new_TimeReportFile" RENAME TO "TimeReportFile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
