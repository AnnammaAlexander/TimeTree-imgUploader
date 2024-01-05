import express from 'express';
import cors from 'cors';
import connectDB from './model/connection.js';
import router from './routes/index.js';
 import { configKeys } from './config/configKey';
import {v2 as cloudinary} from 'cloudinary';


const app= express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//cloudinary config
cloudinary.config({
    cloud_name : 'wellconnect'  ,
    api_key : configKeys.api_key,
    api_secret :configKeys.api_secret
})

connectDB()
app.use(router)
const  port =3000
// const port = parseInt(configKeys.PORT,10)
app.listen(port ,'0.0.0.0', ()=>{
    console.log(`Server started on http://localhost:${port}`);
})


export default app;