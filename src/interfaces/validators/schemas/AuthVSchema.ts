interface AuthVSchema {
    getRegisterRequestSchema(): any
    getLoginRequestSchema(): any
    getValidEmailSchema(): any
}

export default AuthVSchema