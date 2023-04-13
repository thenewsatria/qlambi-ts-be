import e, { Request, Response, NextFunction } from "express";
import Operator from "../../../interfaces/dtos/queries/prisma/Operator";
import ProductFilter from "../../../interfaces/dtos/queries/prisma/product/ProductFilter";
import ProductOrder from "../../../interfaces/dtos/queries/prisma/product/ProductSortOrder";
import SortOrder from "../../../interfaces/dtos/queries/prisma/SortOrder";
import QueryMiddleware from "../../../interfaces/middlewares/QueryMiddleware";

class QueryMiddlewareExpress implements QueryMiddleware {
    filterProductQuery(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            const {searchBy, keyword, active, sortBy, sortOrder} = req.query

            let filter: Operator | ProductFilter = {}
            let orderBy: ProductOrder = {
                // the default is sorted by createdAt
                createdAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
            }

            if (keyword) {
                if(searchBy) {
                    switch (searchBy) {
                        case 'productName':
                            filter = {
                                productName: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        case 'productClass':
                            filter = {
                                productClass: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        case 'productType':
                            console.log('eko')
                            filter = {
                                productType: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        case 'material':
                            filter = {
                                material: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        case 'description':
                            filter = {
                                description: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        default:
                            filter = {
                                productName: {
                                    contains: keyword as string
                                }
                            }
                        break;
                    }
                }else{
                    // if searchBy is undefined but keyword is exist then the default is searched by productName
                    filter = {
                        productName: {
                            contains: keyword as string
                        }
                    }
                }
            }

            if (active) {
                // if previous filter not set, then filter only contain isActive 
                if(Object.keys(filter).length === 0) {
                    filter = {
                        isActive: active === 'true'
                    }
                }else{
                    // else it concatenate the condition with the previous filter
                    filter = {
                        AND: [
                            filter as ProductFilter,
                            {
                                isActive: active === 'true'
                            }
                        ]
                    }
                }
            }

            if(sortBy){
                switch (sortBy) {
                    case 'created':
                        orderBy = {
                            createdAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
                        }
                    break;
                    case 'updated':
                        orderBy = {
                            updatedAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
                        }
                    break;
                    case 'deactivated':
                        orderBy = {
                            deactivatedAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
                        }
                    break;
                    default:
                        // if sortBy is invalid than those 3 defined then
                        // the default is sortBy createdAt
                        orderBy = {
                            createdAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
                        }
                    break;
                }
            }

            
            res.locals.productFilter = filter
            res.locals.productOrder = orderBy

            console.log("Filter: ",filter)
            console.log("OrderBy: ",orderBy)
            next()
        }
    }
}

export default QueryMiddlewareExpress