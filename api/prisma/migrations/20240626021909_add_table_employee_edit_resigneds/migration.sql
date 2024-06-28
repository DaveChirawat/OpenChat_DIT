/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenChat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "OpenChat";

-- CreateTable
CREATE TABLE "employee" (
    "empcode" TEXT NOT NULL,
    "name_th" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "div" TEXT NOT NULL,
    "dept" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "profile" TEXT NOT NULL DEFAULT '',
    "resigned" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "employee_pkey" PRIMARY KEY ("empcode")
);

-- CreateTable
CREATE TABLE "openchat" (
    "empcode" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "modified_by" TEXT NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "openchat_pkey" PRIMARY KEY ("empcode")
);
