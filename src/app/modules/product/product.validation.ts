import { z } from "zod";

// variants validation schema
const variantsValidationSchema = z.object({
    type: z.string(),
    value: z.string(),
})

// inventory validation schema
const inventoryValidationSchema = z.object({
    quantity: z.number().min(0, { message: 'Min quantity is 0' }),
    inStock: z.boolean()
})

// product validation schema
const productValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(0, { message: 'Min price is 0' }),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(variantsValidationSchema),
    inventory: inventoryValidationSchema,
})

export default productValidationSchema;