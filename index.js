import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import useRoutes from "./routes/users.js";
dotenv.config();
const app= express();
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
mongoose.set('strictQuery', false);

app.get("/",(req,res)=> {

      res.send("This is a stack overflow clone API")
})
app.use("/user", useRoutes);

const port= process.env.PORT || 5000;

const MONGO_URL= "mongodb+srv://admin:raj212@clones01.6ihkszq.mongodb.net/collect?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(port,()=> {console.log(`Server is running at port ${port}`)}))
.catch((err)=> {console.log(err.message)});
