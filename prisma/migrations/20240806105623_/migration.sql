/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('LEGESLATOR', 'ADMIN', 'DEVELOPER');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "clausesAbstainId" TEXT,
ADD COLUMN     "clausesAgainstId" TEXT,
ADD COLUMN     "clausesForId" TEXT,
ADD COLUMN     "meetingId" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "rollNo" TEXT NOT NULL,
ADD COLUMN     "type" "UserType" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clauses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meetingId" TEXT,

    CONSTRAINT "Clauses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "clausesId" TEXT NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_id_key" ON "Meeting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clauses_id_key" ON "Clauses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Responses_id_key" ON "Responses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clausesForId_fkey" FOREIGN KEY ("clausesForId") REFERENCES "Clauses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clausesAgainstId_fkey" FOREIGN KEY ("clausesAgainstId") REFERENCES "Clauses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clausesAbstainId_fkey" FOREIGN KEY ("clausesAbstainId") REFERENCES "Clauses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clauses" ADD CONSTRAINT "Clauses_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_clausesId_fkey" FOREIGN KEY ("clausesId") REFERENCES "Clauses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
