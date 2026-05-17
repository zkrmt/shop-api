import pool from "../models/db.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"


// REGISTER

const register = async (req,res)=>{
 
    try{
    const {email,password}= req.body
    const Secretpassword = await bcrypt.hash(password,10)
    const account = await pool.query("INSERT INTO users (email,password) VALUES ($1, $2)",
        [email,Secretpassword])
     res.status(201).json({message:"The account has been registered."}) 
    }catch(err){
    console.log(err)
    res.status(400).json({error:"invalid syntax"})
    }

}

export default register


// LOGIN


const login = async (req,res)=>{
 
 
 
    try{ 
 
        const {email,password}= req.body
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (!result){ return  res.status(400).json({message:"non-existent account"})}
        const verifyPassword = await bcrypt.compare(password,result.rows[0].password)
        if(!verifyPassword){return res.status.json({message:"Incorrect password"})}
        const token = JWT.sign({id:result.rows[0].id, role: result.rows[0].role},process.env.JWT_SECRET)
        res.json({token})
    }catch(err){
    console.log(err)
    res.status(500).json({error:"server error"})
    }

}


// EXPORT
export {register, login}
