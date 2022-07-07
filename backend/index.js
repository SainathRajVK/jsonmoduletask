const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000
const cors = require('cors');
 
let data_json=require('./hello.json')

app.use(cors({ credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get('/getfile', (req, res) => {
    res.status(200).send(data_json);
})

app.post('/savefile', (req, res) => {
    let new_file = req.body.new_file;
    console.log(new_file);
    let fileName = 'hello.json';
    fs.writeFile(fileName, JSON.stringify(new_file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(new_file));
        console.log('For this File :' + fileName);
    });
    res.send({});
})

app.listen(port, () => {
    console.log(` APP Listening on port ${port}`)
})