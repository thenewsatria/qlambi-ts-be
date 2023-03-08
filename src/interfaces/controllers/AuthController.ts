interface AuthController {
    userLogin(): (...args: any[]) => any
    userRegister(): (...args: any[]) => any
}

export default AuthController