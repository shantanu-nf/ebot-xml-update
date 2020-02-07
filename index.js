const path = require('path');
const config = require(path.join(__dirname + '/config.js'));
const xml_handler = require(path.join(__dirname + '/xml_handler.js'));
const util = require(path.join(__dirname + '/util.js'));
const url = require('url');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.static('public'));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.get('/', (req, res) => {
    if (req.query.up) {
        xml_handler.readBotXml(req.query.fn, function (err, result) {
            res.download(__dirname + '/uploads/' + req.query.fn);
        });
    } else {
        res.sendFile(__dirname + '/index.html');
    }

});

app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Please select a file and try uploading again.');
    }

    util.moveFileToUploads(req.files.sampleFile, function (err, result) {
        if (err)
            return res.status(500).send(err);
        else {
            res.redirect(url.format({
                pathname: "/",
                query: {
                    "up": true,
                    "fn": req.files.sampleFile.name
                }
            }));
        }
    });
});

app.listen(process.env.port || 3000);
