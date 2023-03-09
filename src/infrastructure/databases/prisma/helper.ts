import prismaClient from "./client";

export async function deleteAllUser() {
    await prismaClient.user.deleteMany({})
}