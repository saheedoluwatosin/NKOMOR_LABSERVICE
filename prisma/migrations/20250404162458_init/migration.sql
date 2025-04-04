-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `customId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('PATIENT', 'SERVICE_PROVIDER') NOT NULL,
    `providerType` ENUM('LAB', 'PHARMACY') NULL,
    `labName` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `businessNo` VARCHAR(191) NULL,
    `PhoneNumber` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `pharmacyName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `licenseNumber` VARCHAR(191) NULL,
    `drugCategories` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_customId_key`(`customId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
