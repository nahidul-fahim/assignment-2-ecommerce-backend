import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";


// create new product controller
const createProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body;

        // zod validation
        const zodParseData = productValidationSchema.parse(productData)

        // send the data to service
        const result = await ProductServices.createProductIntoDb(zodParseData);

        // send the success data to client
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        })
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
};


// get all product controller
const getAllProducts = async (req: Request, res: Response) => {
    try {
        let result;
        const { searchTerm } = req.query;
        if (searchTerm) {
            result = await ProductServices.getSearchedProductFromDb(searchTerm as string)
        }
        else {
            result = await ProductServices.getAllProductsFromDb();
        }

        // send the response to client side
        res.status(200).json({
            success: true,
            message: searchTerm ? `Products matching search term ${searchTerm} fetched successfully!` : "Products fetched successfully!",
            data: result,
        })
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}


// get a single product controller
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.getSingleProductFromDb(productId);
        // send the response to client side
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}


// update a product
const updateProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { product: productData } = req.body;
        // zod validation
        // const zodParseData = productValidationSchema.parse(productData)
        // send the data to service
        const result = await ProductServices.updateProductIntoDb(productId, productData);
        // send the success data to client
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}


// delete a product
const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await ProductServices.deleteProductFromDb(productId);

        // send the success data to client
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}


export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProductById,
    deleteSingleProduct,
}