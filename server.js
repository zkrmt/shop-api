import express from "express"
import router from "./routes/authRoutes.js"
import order from "./routes/orderRoutes.js"
import product from "./routes/productRoutes.js"
import webhook from "./routes/webhookRoutes.js"



const app = express()

app.use("/webhook", express.raw({type:"application/json"}),webhook)

app.use (express.json())

app.use("/auth",router)
app.use("/products", product)
app.use("/orders",order)

app.get("/success", (req, res) => {
    res.json({message: "Payment successful!"})
})

app.get("/cancel", (req, res) => {
    res.json({message: "Payment cancelled."})
})

app.listen(3000,()=>{
    console.log("You are connected to the server")})