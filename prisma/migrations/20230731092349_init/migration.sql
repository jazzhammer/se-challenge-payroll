-- CreateTable
CREATE TABLE "TimeReportItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "dom" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,
    "jobGroup" TEXT NOT NULL
);
