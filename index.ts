import express, {Request, Response, Router, json} from "express";
import cors from 'cors';
import 'express-async-errors';
import { ValidationError, handleError } from "./utils/errors";
import rateLimit from 'express-rate-limit';
import { adRouter } from "./routers/ad.router";
import { config } from "./config/config";


const app = express();

app.use(cors({
    // origin: 'http://localhost:3000',
    origin: config.corsOrigin,
}));
app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

// added prefix to all URLS
const router = Router();

router.use('/ad', adRouter);

app.use('/api', router);

app.use(handleError)

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001');
    
});
