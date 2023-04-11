-- AlterTable
ALTER TABLE `Token` MODIFY `refreshToken` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `UsedToken` MODIFY `usedRefreshToken` VARCHAR(255) NOT NULL;
