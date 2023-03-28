import { Router } from "../deps.ts";
import {
    findProduct,
    findProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.ts";

export const router = new Router()
    .get("/api/products", findProduct)
    .get("/api/products/:id", findProductById)
    .post("/api/products", addProduct)
    .put("/api/products/:id", updateProduct)
    .delete("/api/products/:id", deleteProduct);