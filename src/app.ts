import express, { Application, Request, Response } from 'express';
import cors from "cors"
import { ProductRoutes } from './app/modules/product/product.router';
const app: Application = express()

// parser
app.use(express.json());
app.use(cors())

// application routers
app.use("/api/products", ProductRoutes)


// test route to check if server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! From assignment 2 eCommerce backend.')
})

export default app;