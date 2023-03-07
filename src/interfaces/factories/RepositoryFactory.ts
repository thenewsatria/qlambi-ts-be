import UserRepository from "../repositories/UserRepository";

interface RepositoryFactory {
    createUserRepository(): UserRepository
}

export default RepositoryFactory