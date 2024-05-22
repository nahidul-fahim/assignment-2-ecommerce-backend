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


// update a product
const updateProductIntoDb = async (id: string, product: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(id, product, { new: true });
    return result;
}


// delete a product
const deleteProductFromDb = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}


// get searched product from db
const getSearchedProductFromDb = async (searchTerm: string) => {
    const result = await Product.find({
        $text: { $search: searchTerm },
    });
    return result;
}



export const ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductFromDb,
    getSearchedProductFromDb
}