import express from "express"
import router from "./routes/authRoutes.js"
import order from "./routes/orderRoutes.js"
import product from "./routes/productRoutes.js"
import Stripe from "stripe"
import pool from "./models/db.js"
import dotenv from "dotenv"

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
app.post("/webhook", express.raw({type: "application/json"}), async (req, res) => {
    const sig = req.headers["stripe-signature"]
    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch(err) {
        return res.status(400).json({error: err.message})
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object
        const orderId = session.metadata?.orderId
        if(!orderId){
            return res.status(400).json({error:"orderId missing"})
        }
        await pool.query("UPDATE orders SET status = 'paid' WHERE id = $1", [orderId])
    }

    res.json({received: true})
})


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