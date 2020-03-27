const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const engines = require('consolidate');
const path = require('path');

//Routes
const paymentsRoute = require('./src/routes/paymentsRoute');

//Load environment
// require('./src/config/getEnv')()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//For render views
app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");

//Payments route
app.use('/payments', paymentsRoute);
app.use('/', (req, res) => {
    res.send('teste')
})

app.listen(3333, function (err) {
    console.log("executando")
});