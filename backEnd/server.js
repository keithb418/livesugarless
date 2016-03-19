var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var fs = require('fs');
var expressValidator = require('express-validator');
var util = require('util');
var app = express();
var data = fs.readFileSync('./BackEnd/gmailAuth.json', 'utf-8');
data = JSON.parse(data);

var generator = require('xoauth2').createXOAuth2Generator({
    user: data.user,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    refreshToken: data.refreshToken 
});

var sendMail = function (mailBody, res, successLog) {
    var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                xoauth2: generator
            }
        });
        
    smtpTransport.sendMail(mailBody, function(error, response) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log(successLog);
        }
        
        smtpTransport.close();
        
        res.end();
    });
}

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/contact-me', function(req, res) {
    var schema = {
        name: {
            notEmpty: true,
            matches: {
                options: [/^[\w\s\.]+$/g]
            },
            errorMessage: 'Invalid Name'
        },
        email: {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        subject: {
            notEmpty: true,
            errorMessage: 'Subject is Required'
        },
        message: {
            notEmpty: true,
            errorMessage: 'Message is Required'
        }
    };
    
    req.check(schema);
    
    req.sanitize('subject').blacklist('\<\>\\\&\;');
    req.sanitize('message').blacklist('\<\>\\\&\;');
    
    var errors = req.validationErrors();
    
    if (errors) {
        res.status(400).send("One or more inputs were invalid: " + util.inspect(errors));
        console.log("One or more inputs were invalid: " + util.inspect(errors));
    } else {
        sendMail({
            from: req.body.email,
            to: data.user,
            subject: "Website Email - " + req.body.name + " - " + req.body.subject,
            text: req.body.message + "\n\nFrom:\n" + req.body.name + "\n" + req.body.email
        }, res, "Contact Me message sent from " + req.body.name + " " + req.body.email);
    }
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Take Charge Health listening at http://%s:%s", host, port);

});