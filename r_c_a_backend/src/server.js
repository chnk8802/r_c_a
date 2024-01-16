import express from 'express';
import { connectDb } from './db/db.js';
import dotenv from 'dotenv';
import userRoutes from './routers/user.js';
import saleRoutes from './routers/sale.js';
dotenv.config();
connectDb();

const app = express();
const port = 5000 || process.env.PORT

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/sale', saleRoutes)

app.listen(port, () => console.log(`Server is running on port : ${port}`));