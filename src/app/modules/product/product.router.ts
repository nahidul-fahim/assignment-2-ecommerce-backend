import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// router to create new product
router.post("/", ProductControllers.createProduct)

// router to get all the products
router.get("/", ProductControllers.getAllProducts)

// router to get single product
router.get("/:productId", ProductControllers.getSingleProduct)

// router to update single product
router.put("/:productId", ProductControllers.updateProductById)

// router to delete single product
router.delete("/:productId", ProductControllers.deleteSingleProduct)



export const ProductRoutes = router; 