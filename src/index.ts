import express from 'express';

import connectDB from './database';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import UserRouter from './Users/index';
dotenv.config();

connectDB();
const app = express();

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/user', UserRouter);
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
