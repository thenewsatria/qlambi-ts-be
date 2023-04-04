import Role from "../../../domain/enums/Role"

interface UserCreationDTO {
    email: string
    username: string
    password: string
    role: Role
}

export default UserCreationDTO