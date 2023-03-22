-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
