import ItemFilter from "../queries/prisma/item/ItemFilter";
import ItemSortOrder from "../queries/prisma/item/ItemSortOrder";

interface ItemGeneralListRequestDTO {
    filter: ItemFilter
    sortOrder: ItemSortOrder
}

export default ItemGeneralListRequestDTO