import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";


// create new order controller
const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const zodParseData = orderValidationSchema.parse(orderData);
        const result = await OrderServices.addNewOrderToDb(zodParseData);

        // send the success data to client
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
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


// get all the orders
const getAllOrders = async (req: Request, res: Response) => {
    try {
        let result;
        const { email } = req.query;
        if (email) {
            result = await OrderServices.getAllOrdersByEmailFromDb(email as string)
        }
        else {
            result = await OrderServices.getAllOrdersFromDb();
        }



        // send the success data to client
        res.status(200).json({
            success: true,
            message: email ? "Orders fetched successfully for user email!" : "Orders fetched successfully!",
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


export const OrderControllers = {
    createOrder,
    getAllOrders,
}