import e, { Request, Response, NextFunction } from "express";
import ColorFilter from "../../../interfaces/dtos/queries/prisma/color/ColorFilter";
import ColorSortOrder from "../../../interfaces/dtos/queries/prisma/color/ColorSortOrder";
import Operator from "../../../interfaces/dtos/queries/prisma/Operator";
import ProductFilter from "../../../interfaces/dtos/queries/prisma/product/ProductFilter";
import ProductSortOrder from "../../../interfaces/dtos/queries/prisma/product/ProductSortOrder";
import SortOrder from "../../../interfaces/dtos/queries/prisma/SortOrder";
import QueryMiddleware from "../../../interfaces/middlewares/QueryMiddleware";
import ItemFilter from "../../../interfaces/dtos/queries/prisma/item/ItemFilter";
import ItemSortOrder from "../../../interfaces/dtos/queries/prisma/item/ItemSortOrder";

class QueryMiddlewareExpress implements QueryMiddleware {
    filterProductQuery(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            const {searchBy, keyword, active, sortBy, sortOrder} = req.query

            let filter: Operator | ProductFilter = {}
            let orderBy: ProductSortOrder = {
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
            res.locals.productSortOrder = orderBy
            next()
        }
    }
    
    filterColorQuery(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            const {searchBy, keyword, active, sortBy, sortOrder} = req.query

            let filter: Operator | ColorFilter = {}
            let orderBy: ColorSortOrder = {
                // the default is sorted by createdAt descending
                createdAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
            }

            if (keyword) {
                if(searchBy) {
                    switch (searchBy) {
                        case 'colorName':
                            filter = {
                                colorName: {
                                    contains: keyword as string
                                }
                            }
                        break;
                        case 'hexValue':
                            filter = {
                                hexValue: {
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
                                colorName: {
                                    contains: keyword as string
                                }
                            }
                        break;
                    }
                }else{
                    // if searchBy is undefined but keyword is exist then the default is searched by colorName
                    filter = {
                        colorName: {
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
                            filter as ColorFilter,
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

            
            res.locals.colorFilter = filter
            res.locals.colorSortOrder = orderBy
            next()
        }
    }

    filterItemQuery(): (...args: any[]) => any {
        return (req: Request, res: Response, next: NextFunction) => {
            const {searchBy, keyword, pmin, pmax, smin, smax, active, sortBy, sortOrder} = req.query

            let filter: ItemFilter = {}
            let orderBy: ItemSortOrder = {
                // the default is sorted by createdAt
                createdAt: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
            }

            if (keyword) {
                if(searchBy) {
                    switch (searchBy) {
                        case 'itemCode':
                            // filter = {
                            //     itemCode: {
                            //         contains: keyword as string
                            //     }
                            // }
                            filter.itemCode = {
                                contains: keyword as string
                            }
                        break;
                        case 'itemName':
                            // filter = {
                            //     itemName: {
                            //         contains: keyword as string
                            //     }
                            // }
                            filter.itemName = {
                                contains: keyword as string
                            }
                        break;
                        case 'description':
                            // filter = {
                            //     description: {
                            //         contains: keyword as string
                            //     }
                            // }
                            filter.description = {
                                contains: keyword as string
                            }
                        break;
                        default:
                            // filter = {
                            //     itemName: {
                            //         contains: keyword as string
                            //     }
                            // }
                            filter.itemName = {
                                contains: keyword as string
                            }
                        break;
                    }
                }else{
                    // if searchBy is undefined but keyword is exist then the default is searched by itemName
                    // filter = {
                    //     itemName: {
                    //         contains: keyword as string
                    //     }
                    // }
                    filter.itemName = {
                        contains: keyword as string
                    }
                }
            }

            if(pmin || pmax){
                filter.price = {}
                if(pmin) {
                    filter.price.gte = +pmin
                }
                if(pmax) {
                    filter.price.lte = +pmax
                }
            }

            if(smin || smax) {
                filter.stock = {}
                if(smin) {
                    filter.stock.gte = +smin
                }
                if(smax) {
                    filter.stock.lte = +smax
                }
            }

            if (active) {
                // // if previous filter not set, then filter only contain isActive 
                // if(Object.keys(filter).length === 0) {
                //     filter = {
                //         isActive: active === 'true'
                //     }
                // }else{
                //     // else it concatenate the condition with the previous filter
                //     filter = {
                //         AND: [
                //             filter as ProductFilter,
                //             {
                //                 isActive: active === 'true'
                //             }
                //         ]
                //     }
                // }
                filter.isActive = active == 'true'
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
                    case 'price':
                        orderBy = {
                            price: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
                        }
                    break;
                    case 'stock':
                        orderBy = {
                            stock: sortOrder === "asc" ? SortOrder.ASC : SortOrder.DESC
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

            
            res.locals.itemFilter = filter
            res.locals.itemSortOrder = orderBy
            next()
        }
    }
}

export default QueryMiddlewareExpress