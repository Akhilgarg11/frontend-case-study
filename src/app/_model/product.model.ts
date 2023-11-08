import { FileHandle } from "./file-handle.model";

export interface Product{
    name: string,
    price: string,
    details: string,
    category: string,
    brand: string,
    image: FileHandle
}