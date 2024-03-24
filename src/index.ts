import express from 'express';

import connectDB from './database';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
import AuthRouter from './Auth/index';
import UserRoute from './User/index';
import PostRoute from './Post/index';
dotenv.config();

connectDB();
const app = express();

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use('/auth', AuthRouter);
app.use('/user', UserRoute);
app.use('/post', PostRoute);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;