import express, {Request, Response, json} from "express";
import cors from 'cors';
import 'express-async-errors';
import { ValidationError, handleError } from "./utils/errors";
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
// app.use(express.json());
app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

app.use(json());

//Routes

app.get('/', async(req, res) => {
    // throw new Error('Daaam!');
    throw new ValidationError('Daaam!');
});

app.use(handleError)

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001');
    
});
