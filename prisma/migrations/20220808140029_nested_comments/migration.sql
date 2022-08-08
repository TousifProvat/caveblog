/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "Reply";
