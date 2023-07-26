enum AppOperationType {
    /**
     * VALIDATION is used for any operation type related with validation
     * Example: checking is email is used, username is used, is related password is the same
     */
    VALIDATION = "validation",
    GENERATION = "generation",
    DECODING = "decoding",
    /**
     * FETCHING is used for any operation type related with fetching data
     * Example: Is token related with user's email exists?, fetching related user etc
     */
    FETCHING = "fetching"
}

export default AppOperationType