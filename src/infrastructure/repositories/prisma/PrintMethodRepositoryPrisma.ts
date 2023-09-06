import { create } from "domain";
import PrintMethod from "../../../domain/entities/PrintMethod";
import PrintMethodRepository from "../../../interfaces/repositories/PrintMethodRepository";
import prismaClient from "../../databases/prisma/client";
import ProductRepositoryPrisma from "./ProductRepositoryPrisma";
import User from "../../../domain/entities/User";

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

    async readById(id: string, detailed: boolean): Promise<PrintMethod | null> {
        let printMethod: PrintMethod|null = null
        const printMethodRes = await this._client.printMethod.findUnique({
            where: {
                id: +id
            },
            include: {
                creator: detailed
            }
        })
        if(printMethodRes) {
            printMethod = new PrintMethod(printMethodRes.userEmail || "deleted_user", printMethodRes.printMethodName, printMethodRes.description)
            printMethod.setId(printMethodRes.id+"")
            printMethod.setIsActive(printMethodRes.isActive)
            printMethodRes.deactivatedAt ?  printMethod.setDeactivatedAt(printMethodRes.deactivatedAt) : null
            printMethodRes.creator ? printMethod.setCreator(new User(printMethodRes.creator.email, printMethodRes.creator.username, "")) : null
            printMethod.setCreatedAt(printMethodRes.createdAt)
            printMethod.setUpdatedAt(printMethodRes.updatedAt)
        }
        return Promise.resolve(printMethod)
    }
}

export default PrintMethodRepositoryPrisma