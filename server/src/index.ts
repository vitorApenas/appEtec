const express = require('express');
const cors = require('cors');
import apiRouter from './routes'

const app = express();
const port:Number = 3333;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, ()=>{
    console.log(`Listening at http://127.0.0.1:${port}`);
});