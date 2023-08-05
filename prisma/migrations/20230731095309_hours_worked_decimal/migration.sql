/*
  Warnings:

  - You are about to alter the column `hours` on the `TimeReportItem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

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
    "fileId" INTEGER NOT NULL
);
INSERT INTO "new_TimeReportItem" ("dom", "employeeId", "fileId", "hours", "id", "jobGroup", "month", "year", "ymd") SELECT "dom", "employeeId", "fileId", "hours", "id", "jobGroup", "month", "year", "ymd" FROM "TimeReportItem";
DROP TABLE "TimeReportItem";
ALTER TABLE "new_TimeReportItem" RENAME TO "TimeReportItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
