/*
  Warnings:

  - You are about to drop the column `hours` on the `TimeReportItem` table. All the data in the column will be lost.
  - Added the required column `hoursWorked` to the `TimeReportItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeReportItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "dom" INTEGER NOT NULL,
    "ymd" DATETIME NOT NULL,
    "hoursWorked" DECIMAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "jobGroup" TEXT NOT NULL,
    "timeReportFileId" INTEGER NOT NULL
);
INSERT INTO "new_TimeReportItem" ("dom", "employeeId", "id", "jobGroup", "month", "timeReportFileId", "year", "ymd") SELECT "dom", "employeeId", "id", "jobGroup", "month", "timeReportFileId", "year", "ymd" FROM "TimeReportItem";
DROP TABLE "TimeReportItem";
ALTER TABLE "new_TimeReportItem" RENAME TO "TimeReportItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
