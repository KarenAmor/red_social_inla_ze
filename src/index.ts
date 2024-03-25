import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '/Users/kmorenom/Developer/red_social_inla_ze/src/Document/Swagger.json';

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

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', AuthRouter);
app.use('/user', UserRoute);
app.use('/post', PostRoute);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;