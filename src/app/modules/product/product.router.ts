import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// router to create new product
router.post("/", ProductControllers.createProduct)



export const ProductRoutes = router; 