import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoute.js'


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// app.use(cors({
//     origin:[process.env.ORIGION],
//     methods:["GET", "POST","PUT","PATCH","DELETE"],
//     credentials: true
// }))
app.use(cors())

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);


const serer = app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})

mongoose.connect(databaseURL).then(()=>console.log('DB Connection Successful')).catch(err=> console.log(err.message))

