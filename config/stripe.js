import Stripe from "stripe"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, "../.env") })

const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)

export default stripe