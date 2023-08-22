import SortOrder from "../SortOrder";

interface ItemSortOrder {
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deactivatedAt?: SortOrder
    price?: SortOrder
    stock?: SortOrder
}

export default ItemSortOrder