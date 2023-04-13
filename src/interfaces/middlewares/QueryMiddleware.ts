interface QueryMiddleware {
    filterProductQuery(): (...args: any[])  => any
}

export default QueryMiddleware