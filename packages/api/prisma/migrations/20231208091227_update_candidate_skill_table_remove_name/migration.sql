/*
  Warnings:

  - You are about to drop the column `first_name` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserSkill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "first_name",
DROP COLUMN "last_name";

-- AlterTable
ALTER TABLE "Employer" ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "name";
