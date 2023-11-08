import { Product } from "./product.model";

export interface ProductResponse{
    data: Product,
    message : string,
    status : Boolean
}