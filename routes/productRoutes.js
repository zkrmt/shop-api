import express from "express"
import {getAll,getById,create,update,deleteProduct} from "../controllers/productController.js"
import verifyToken from "../middleware/verifyToken.js"
import verifyAdmin from "../middleware/verifyAdmin.js"

const product = express.Router()

product.get("/",getAll)

product.get("/:id",getById)

product.post("/",verifyToken,verifyAdmin,create)

product.put("/:id",verifyToken,verifyAdmin,update)

product.delete("/:id",verifyToken,verifyAdmin,deleteProduct)

export default product