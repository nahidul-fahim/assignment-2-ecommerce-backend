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
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
};

// get all product controller
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.getAllProductsFromDb();

        // send the response to client side
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        })
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}


export const ProductControllers = {
    createProduct,
    getAllProducts,
}