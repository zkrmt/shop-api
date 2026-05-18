import pool from "../models/db.js"
import stripe from "../config/stripe.js"

const handleWebhook = async(req,res)=>{
    const sig = req.headers["stripe-signature"]
    let event
    try{
        event = stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
    }catch(err){
        res.status(400).json({message:err.message})
    }
    if(event.type ==="checkout.session.completed"){
        const session = event.data.object
        const orderId = session.metadata?.orderId
        if(!orderId){return res.status(400).json({error:"orderId missing"})}
        await pool.query("UPDATE orders SET status = $1 WHERE id = $2 ",[
            "paid",orderId]
        )
    }
    res.json({received:true})
}

export default handleWebhook