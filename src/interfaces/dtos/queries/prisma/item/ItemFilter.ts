import NumberQuery from "../NumberQuery"
import SearchQuery from "../StringQuery"

interface ItemFilter {
    itemCode?: SearchQuery
    itemName?: SearchQuery
    price?: NumberQuery
    stock?: NumberQuery
    description?: SearchQuery
    isActive?: boolean
}

export default ItemFilter