import User from "../../../domain/entities/User";
import prismaClient from "./client";

export async function deleteAllUser() {
    await prismaClient.user.deleteMany({})
}

export async function insertUser(user: User): Promise<User> {
    const newUser = await prismaClient.user.create({
        data: {
            email: user.getEmail(),
            username: user.getUsername(),
            password: user.getPassword()
        }
    })

    user.setId(newUser.id+"")
    user.setCreatedAt(newUser.createdAt)
    user.setUpdatedAt(newUser.updatedAt)   

    return Promise.resolve(user)
}