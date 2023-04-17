import SearchQuery from "../SearchQuery"

interface ColorFilter {
    colorName?: SearchQuery
    hexValue?: SearchQuery
    description?: SearchQuery
    isActive?: boolean
}

export default ColorFilter