import pg from"pg"
import dotenv from "dotenv"

dotenv.config()

const {Pool} = pg

const pool = new Pool({

user: process.env.DB_USER,
host: process.env.DB_HOST,
Port: process.env.DB_PORT,
password: process.env.DB_PASSWORD,
database:process.env.DB_NAME 
})

export default pool