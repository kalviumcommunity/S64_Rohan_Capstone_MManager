import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoute.js"

// app config 
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// api endpoints
app.use("/api/user", userRouter) // user routes
app.use("/api/admin", adminRouter)
// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/', (req, res) => {
    res.send('API Working');
});
app.listen(port,()=> console.log("Server Started",port))
