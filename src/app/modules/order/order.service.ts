import { ProductServices } from "../product/product.service";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// add new order to database and update quantity
const addNewOrderToDb = async (order: TOrder) => {
    console.log("Showing from service:", order);
    // getting single product for the order
    const getSingleProductFromDb = await ProductServices.getSingleProductFromDb(String(order?.productId))
    console.log(getSingleProductFromDb);

    const availableQuantity: number = <number>getSingleProductFromDb?.inventory?.quantity;

    if (availableQuantity <= 0 || order?.quantity > availableQuantity) {
        throw new Error("Insufficient quantity available in inventory")
    }
    else {
        const newAvailableQuantity: number = <number>availableQuantity - order?.quantity;

        let updatedProduct;
        if (newAvailableQuantity > 0) {
            updatedProduct = {
                "inventory": {
                    "quantity": newAvailableQuantity,
                    "inStock": true,
                }
            }
        } else {
            updatedProduct = {
                "inventory": {
                    "quantity": newAvailableQuantity,
                    "inStock": false,
                }
            }
        }
        // updating the quantity in database
        await ProductServices.updateProductIntoDb(String(order.productId), updatedProduct)

        // creating new order to database
        const result = await Order.create(order);
        return result;
    }
};

// get all the orders from db
const getAllOrdersFromDb = async () => {
    const result = await Order.find();
    return result;
}


// get orders by email from db
const getAllOrdersByEmailFromDb = async (email: string) => {
    const result = await Order.find({ email });
    return result;
}




export const OrderServices = {
    addNewOrderToDb,
    getAllOrdersFromDb,
    getAllOrdersByEmailFromDb,
}