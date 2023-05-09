-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemCode` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `productId` INTEGER NULL,
    `colorId` INTEGER NULL,
    `sizeId` INTEGER NULL,
    `price` INTEGER NOT NULL,
    `itemImage` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `deactivatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Item_itemCode_key`(`itemCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `Size`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
