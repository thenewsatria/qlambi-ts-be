interface QueryMiddleware {
    filterQuery(): (...args: any[])  => any
}

export default QueryMiddleware