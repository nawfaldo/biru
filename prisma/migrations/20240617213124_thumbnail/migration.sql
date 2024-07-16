-- AlterTable
ALTER TABLE `Post` ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    MODIFY `type` ENUM('IMAGE', 'VIDEO', 'TEXT') NULL;
