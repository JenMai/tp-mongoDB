const express = require("express");
const bodyParser = require("body-parser");
const router = require('./router');

const app = express();
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(router)
    .listen(3000, () => {
        console.log('Example app listening on port 3000!');
    });



