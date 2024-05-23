import { Types } from "mongoose";
import { z } from "zod";


const productIdValidation = z.custom<Types.ObjectId>(
    val => {
        return Types.ObjectId.isValid(val);
    },
    {
        message: 'Invalid ObjectId',
    },
);


const orderValidationSchema = z.object({
    email: z.string({ required_error: "Email is required", }).email(),
    productId: productIdValidation,
    price: z.number({ required_error: "Price is required", }),
    quantity: z.number({ required_error: "Quantity is required", })
})

export default orderValidationSchema;