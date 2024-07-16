/*
  Warnings:

  - Made the column `type` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `type` ENUM('IMAGE', 'VIDEO', 'TEXT') NOT NULL;
