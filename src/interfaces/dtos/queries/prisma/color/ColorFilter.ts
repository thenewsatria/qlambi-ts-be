import StringQuery from "../StringQuery"

interface ColorFilter {
    colorName?: StringQuery
    hexValue?: StringQuery
    description?: StringQuery
    isActive?: boolean
}

export default ColorFilter