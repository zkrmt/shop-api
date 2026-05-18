import express from "express"
import handleWebhook from "../controllers/webhookController.js" 

const webhook = express.Router()

webhook.use("/",handleWebhook)

export default webhook