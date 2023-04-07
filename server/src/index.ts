const express = require('express');
const cors = require('cors');

const app = express();
const port = 3333;

app.use(cors());

app.get('/', (req, res)=>{
    res.json({
        msg:"Hello",
        dia: new Date()
    })
});

app.listen(port, ()=>{
    console.log(`Listening at http://127.0.0.1:${port}`);
});