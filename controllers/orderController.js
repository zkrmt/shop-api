import pool from "../models/db.js"
import Stripe from "stripe"



const create = async(req,res)=>{

    try{
        const {items} = req.body
        let total = 0
        for(const item of items){
            total += item.price * item.quantity
        }
        const order = await pool.query("INSERT INTO orders(user_id,total_price,status,created_at) VALUES($1,$2,$3,NOW()) RETURNING*",[req.user.id,total,"pending"])
        const orderId = order.rows[0].id
        for(const item of items){
            await pool.query("INSERT INTO order_items(order_id,product_id,quantity,price) VALUES($1,$2,$3,$4)",
            [orderId,item.product_id, item.quantity,item.price])
        }
        
        res.status(201).json({message:"The order has been placed."})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"server error"})
    }

}


const getAll = async(req,res)=>{

    try{
        const product = await pool.query("SELECT * FROM orders WHERE user_id=$1",[req.user.id])
        res.json(product.rows)
    }catch(err){
        console.error(err)
        res.status(500).json({error:"server error"})
    }
}

const getById = async(req,res)=>{

    try{
        const {id} = req.params 
        const product = await pool.query(`SELECT orders.*, order_items.product_id, order_items.quantity, order_items.price
            FROM orders JOIN order_items ON orders.id = order_items.order_id
            WHERE orders.id = $1 AND orders.user_id=$2`,
            [id,req.user.id] 
        )
        res.json(product.rows[0])
    }catch(err){
        console.error(err)
        res.status(500).json({error:"server error"})
    }
}



const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)

const createPayment = async(req,res)=>{
    try{
        const {id} = req.params
        const order = await pool.query("SELECT * FROM orders WHERE id = $1 AND user_id = $2",
            [id,req.user.id]
        )
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:[
                {
                    price_data: {
                        currency:"eur",
                        product_data: {name:"Commande #" + order.rows[0].id},
                        unit_amount: order.rows[0].total_price * 100
                    },
                    quantity:1
                }
            ],
            mode:"payment",
            metadata:{orderId:id},
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel"
        })
        res.json({url:session.url})
    }catch(err){
        console.log(err)
        res.status(400).json({error:"The payment failed."})
    }
}




export {create,getAll,getById,createPayment}