import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
 import bookingRoute from './routes/bookingRoute.js';
 import userRoute from './routes/userRoute.js' 
import  cookieParser from'cookie-parser';



const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())
//  app.use(cors());



 app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000',
   'https://empire-court.onrender.com']
}));

app.use('/bookings', bookingRoute);
 app.use('/users', userRoute);

const PORT = process.env.PORT|| 5000;



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
