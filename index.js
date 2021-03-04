import express from "express"
import mongoose from "mongoose"
import router from "./router.js"
import {DB_URL} from "./DBconnect"
import fileUpload from "express-fileupload"

const PORT = 5000;
const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp(){
    try{
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, ()=>console.log("server started"+PORT));
    } catch (e){
        console.log(e)
    }
}

startApp()