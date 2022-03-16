import bodyParser from "body-parser";
import morgan from 'morgan'
import dotenv from 'dotenv'
import express from "express";
import List from "../Routes/Api/V1/List/index.js";
import User from "../Routes/Api/V1/User/index.js";

import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;


dotenv.config();

const app = express();
const apiV1 = '/api/v1';

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')


// Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));



// Routes
app.use(`${apiV1}/list`, List);
app.use(`${apiV1}/user`, User);

export default app;