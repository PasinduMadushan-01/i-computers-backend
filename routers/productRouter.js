import express from 'express';
import {getProductById, updateProduct,deleteProduct, createProduct, getAllProduct } from "../controllers/productController.js";

const productRouter = express.Router();
productRouter.get("/", getAllProduct);
productRouter.post("/", createProduct);
productRouter.get("/search", ()=>{
    console.log("search API")
})

productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById);


export default productRouter;