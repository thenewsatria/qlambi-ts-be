import User from "../../../domain/entities/User";
import UserService from "../../../domain/services/UserService";
import EmailDTO from "../../../interfaces/dtos/user/singular/EmailDTO";
import AppOperationType from "../../../interfaces/enums/AppOperationType";
import ResourceType from "../../../interfaces/enums/ResourceType";
import ResourceNotFoundError from "../../errors/app/ResourceNotFoundError";

class GetUserByEmailUsecase {
    private readonly userService: UserService
    
    constructor(userService: UserService) {
        this.userService = userService
    }
    async execute(data: EmailDTO): Promise<User> {
        const user = await this.userService.fetchByEmail(data)

        if(!user){
            return Promise.reject(
                new ResourceNotFoundError("User with provided email doesn't exist", true,
                        AppOperationType.FETCHING, ResourceType.USER)
            )
        }

        return Promise.resolve(user)
    }
}

export default GetUserByEmailUsecase