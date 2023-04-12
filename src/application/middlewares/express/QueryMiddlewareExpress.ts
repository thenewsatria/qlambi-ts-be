import { Request, Response, NextFunction } from "express";
import QueryMiddleware from "../../../interfaces/middlewares/QueryMiddleware";

class QueryMiddlewareExpress implements QueryMiddleware {
    filterQuery(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            const {searchBy, keyword, active, sortBy, sortOrder} = req.query

            const filter: any = {}
            const orderBy: any = {}

            if (keyword) {
                if(searchBy) {
                    switch (searchBy) {
                        case 'description':
                            filter.description = {
                                contains: keyword
                            }
                        break;
                        case 'material':
                            filter.material = {
                                contains: keyword
                            }
                        break;
                        case 'productName':
                            filter.productName = {
                                contains: keyword
                            }
                        break;
                        default:
                            filter.productName = {
                                contains: keyword
                            }
                        break;
                    }
                }
                filter.productName = {
                    contains: keyword
                }
            }

            if (active) {
                filter.isActive = active === 'true'
            }

            if(sortBy){
                switch (sortBy) {
                    case 'created':
                        orderBy.createdAt = sortOrder ? sortOrder : "desc"
                    break;
                    case 'updated':
                        filter.updatedAt = sortOrder ? sortOrder : "desc"
                    break;
                    case 'deactivated':
                        filter.deactivatedAt = sortOrder ? sortOrder : "desc"
                    break;
                    default:
                        orderBy.createdAt = sortOrder ? sortOrder : "desc"
                    break;
                }
            }
            orderBy.createdAt = sortOrder ? sortOrder : "desc"
            res.locals.productFilter = filter
            res.locals.productOrderBy = orderBy
            next()
        }
    }
}

export default QueryMiddlewareExpress