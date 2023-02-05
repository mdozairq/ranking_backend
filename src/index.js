import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import resultRouter from "./routes/rank.js";


const app = express();
dotenv.config();


app.use(express.json({limit:"50mb", extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(cors());


app.use('/', resultRouter);

app.get('/', (req, res)=>{
    res.send("All API for TPO GCE");
})
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>console.log(`Server is running on Port: ${PORT}`)))
.catch((error)=> console.log(error.message));
