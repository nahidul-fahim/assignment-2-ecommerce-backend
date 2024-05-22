import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// router to create new product
router.post("/", ProductControllers.createProduct)

// router to get all the products
router.get("/", ProductControllers.getAllProducts)

// router to get single product
router.get("/:productId", ProductControllers.getSingleProduct)



export const ProductRoutes = router; 