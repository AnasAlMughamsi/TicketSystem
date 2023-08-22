import express from 'express'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import { Request, Response } from "express"
import ticketsRouter from "./routes/tickets"
import userRouter from "./routes/user"
import dotenv from "dotenv"
dotenv.config();

const app = express();


// here to add user and tickets
app.use(bodyParser.json({limit: "30mb"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());



app.use('/api/v1/tickets', ticketsRouter);
app.use('/api/v1/user', userRouter);
app.use('/', (req:Request, res:Response) => {
    res.send("main page")
});



const PORT = process.env.PORT ||  5000;
const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl)
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))