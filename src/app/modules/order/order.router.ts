import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router()

// create a new order
router.post('/', OrderControllers.createOrder);

// get all the orders
router.get('/', OrderControllers.getAllOrders);


export const OrderRoutes = router;