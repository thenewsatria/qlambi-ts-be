import ProductFilter from "./product/ProductFilter";

interface Operator{
    AND?: ProductFilter[]
    OR?: ProductFilter[]
    NOT?: ProductFilter[]
}

export default Operator