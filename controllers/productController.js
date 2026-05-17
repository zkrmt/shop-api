import pool from "../models/db.js"

const getAll = async(req,res)=>{
  
    try{
        const allProducts = await pool.query("SELECT * FROM products")
        res.json(allProducts.rows)
    }catch(err){
        console.error(err)
         res.status(500).json({error:"server error"})
    }



}

const getById = async(req,res)=>{
  try{ 
      const {id} = req.params
      const productId = await pool.query("SELECT * FROM products WHERE id=$1",[id])
      res.json(productId.rows[0])
      }catch(err){
       console.error(err)
       res.status(500).json({error:"server error"})
      }
}


const create = async(req,res)=>{
    try{
        const {name,description,price,stock,image_url} = req.body
        const product = await pool.query("INSERT INTO products (name,description,price,stock,image_url) VALUES ($1,$2,$3,$4,$5)",
            [name,description,price,stock,image_url]
        )
        res.status(201).json({message:"A new product has been created."})

    }catch(err){
        console.error(err)
         res.status(500).json({error:"server error"})
                
    }
}

const update = async(req,res)=>{
    try{
        const {id}= req.params
        const {name,description,price,stock,image_url} = req.body
        const product = await pool.query("UPDATE products SET name=$1,description=$2,price=$3,stock=$4,image_url=$5 WHERE id =$6",
            [name,description,price,stock,image_url,id] 
        )
        res.json({message:"The product has been updated."})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"server error"})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await pool.query("DELETE FROM products WHERE id= $1",[id])
        res.json({message:"The product has been removed."})
    }catch(err){
        console.error(err)
         res.status(500).json({error:"server error"})
    }

}


export {getAll,getById,create,update,deleteProduct}