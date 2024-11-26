import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoute.js'
import path from 'path'
import { contactsRoutes } from './routes/ContactRoutes.js'
import setupSocket from './socket.js'


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

const corsOptions = {  
    origin: process.env.ORIGION || 'http://localhost:5173', // Allow requests from this origin  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods  
    credentials: true, // Allow cookies to be passed  
  }; 

app.use(cors(corsOptions))

app.use("/uploads/profiles", express.static(('./uploads/profiles')));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes)


const serer = app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
})

setupSocket(serer)

mongoose.connect(databaseURL).then(()=>console.log('DB Connection Successful')).catch(err=> console.log(err.message))

