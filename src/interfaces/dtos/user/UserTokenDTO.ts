import Role from "../../../domain/enums/Role"

interface UserTokenDTO {
    email: string
    role: Role
}

export default UserTokenDTO