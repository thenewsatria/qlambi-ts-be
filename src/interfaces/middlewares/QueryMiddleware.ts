interface QueryMiddleware {
    filterProductQuery(): (...args: any[])  => any
    filterColorQuery(): (...args: any[])  => any
    filterItemQuery(): (...args: any[]) => any
}

export default QueryMiddleware