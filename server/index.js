import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, routeNotFound } from '../server/middleware/errorMiddleware.js';
import routes from './routes/index.js';
import  dbConnection  from './utils/connectDB.js';




dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Root route


app.use('/api', routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});