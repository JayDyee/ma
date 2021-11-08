const express = require('express');
const app = express();
const serv = require('http').Server(app);
const fs = require("fs");
const PORT = 80;


app.use('/', express.static(__dirname + '/cli'));
app.use(express.json({ limit: '1mb' }));

app.get('/', function (req, res) {
    console.log('s');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(__dirname + '/cli///');
});


app.post('/calibrate', (data, res) => {
    console.log(data.body);
    fs.writeFile("./cli/config/calibration.js", "function getCalibrationData(){return " + JSON.stringify(data.body) + "}", ['utf8'], (err) => {
        console.log(err);
    })
});
serv.listen(PORT);