-- CreateTable
CREATE TABLE "Employee" (
    "empcode" TEXT NOT NULL,
    "nameth" TEXT NOT NULL,
    "nameen" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "ressigned" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("empcode")
);

-- CreateTable
CREATE TABLE "OpenChat" (
    "empcode" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "modified" TEXT NOT NULL,
    "modifieddate" TEXT NOT NULL,

    CONSTRAINT "OpenChat_pkey" PRIMARY KEY ("empcode")
);
