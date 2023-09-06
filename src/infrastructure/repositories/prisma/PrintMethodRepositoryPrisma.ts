import PrintMethod from "../../../domain/entities/PrintMethod";
import PrintMethodRepository from "../../../interfaces/repositories/PrintMethodRepository";
import prismaClient from "../../databases/prisma/client";
import ProductRepositoryPrisma from "./ProductRepositoryPrisma";

class PrintMethodRepositoryPrisma implements PrintMethodRepository {
    private readonly _client = prismaClient
    private static instance: PrintMethodRepositoryPrisma

    public static getInstance() {
        if(!PrintMethodRepositoryPrisma.instance) {
            PrintMethodRepositoryPrisma.instance = new PrintMethodRepositoryPrisma()
        }

        return PrintMethodRepositoryPrisma.instance
    }

    async createPrintMethod(printMethod: PrintMethod): Promise<PrintMethod> {
        const newPrintMethod = await this._client.printMethod.create({
            data: {
                printMethodName: printMethod.getPrintMethodName(),
                description: printMethod.getDescription(),
                userEmail: printMethod.getUserEmail(),
            }
        })
        
        printMethod.setId(newPrintMethod.id+"")
        printMethod.setCreatedAt(newPrintMethod.createdAt)
        printMethod.setUpdatedAt(newPrintMethod.updatedAt)
        return Promise.resolve(printMethod)
    }
}

export default PrintMethodRepositoryPrisma