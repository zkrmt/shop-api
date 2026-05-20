import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config({ path: "/var/www/shop-api/.env" })

const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)

export default stripe