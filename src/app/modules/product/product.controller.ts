import { Request, Response } from "express";
import { ProductServices } from "./product.service";



const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        console.log("Product data from controller:", productData);

        const result = await ProductServices.createProductIntoDb(productData);
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

export const ProductControllers = {
    createProduct,
}