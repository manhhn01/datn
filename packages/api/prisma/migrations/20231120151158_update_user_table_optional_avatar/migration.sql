/*
  Warnings:

  - You are about to drop the column `avatar` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL;
