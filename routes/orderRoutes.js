import express from "express"
import {create,getAll,getById,createPayment} from "../controllers/orderController.js"
import verifyToken from "../middleware/verifyToken.js"

const order = express.Router()

order.post("/",verifyToken,create)

order.post("/:id/pay",verifyToken,createPayment)

order.get("/",verifyToken,getAll)

order.get("/:id",verifyToken,getById)




export default order