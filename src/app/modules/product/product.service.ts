import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create new product service
const createProductIntoDb = async (product: TProduct) => {
    const result = await Product.create(product);
    return result;
}


// get all products service
const getAllProductsFromDb = async () => {
    const result = await Product.find();
    return result;
}


// get a single product
const getSingleProductFromDb = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}



export const ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
}