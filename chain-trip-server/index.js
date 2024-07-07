import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


import dotenv from 'dotenv';
dotenv.config();

import routes from './api/routes/routes.index.js';

const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

const port = 3030;

app.get('/', (req, res) => {
    res.send('IPFS upload server is up and running!');
});

// Mount endpoints
app.use('/api', routes)

app.listen(port, () => console.log('Server ready at: http://localhost:%s', port))