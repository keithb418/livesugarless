var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var data = fs.readFileSync('./BackEnd/gmailAuth.json', 'utf-8');
data = JSON.parse(data);

var generator = require('xoauth2').createXOAuth2Generator({
    user: data.user,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    refreshToken: data.refreshToken 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/contact-me', function(req, res) {
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: generator
        }
    });
    
    smtpTransport.sendMail({
        from: req.body.email,
        to: data.user,
        subject: "Website Email - " + req.body.name + " - " + req.body.subject,
        text: req.body.message + "\n\nFrom:\n" + req.body.name + "\n" + req.body.email
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        
        smtpTransport.close();
        
        res.end();
    });
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Take Charge Health listening at http://%s:%s", host, port);

});