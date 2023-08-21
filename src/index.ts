import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import { Request, Response } from "express";
import ticketsRouter from "./routes/tickets"
import userRouter from "./routes/user"


const app = express();


// here to add user and tickets
app.use(bodyParser.json({limit: "30mb"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());



app.use('/api/v1/tickets', ticketsRouter);
app.use('/api/v1/user', userRouter);
// app.use('/', (req:Request, res:Response) => {
//     res.send("main page")
// });



const CONNECTION_URL = "mongodb+srv://Anas:Anas22as@cluster0.hjsm5z1.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))