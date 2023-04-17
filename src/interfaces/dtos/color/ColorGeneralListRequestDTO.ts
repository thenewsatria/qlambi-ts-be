import ColorFilter from "../queries/prisma/color/ColorFilter"
import ColorSortOrder from "../queries/prisma/color/ColorSortOrder"
import Operator from "../queries/prisma/Operator"

interface ColorGeneralListRequestDTO {
    filter: ColorFilter | Operator,
    sortOrder: ColorSortOrder
}

export default ColorGeneralListRequestDTO