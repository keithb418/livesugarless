var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var data = fs.readFileSync('./BackEnd/gmailAuth.json', 'utf-8');
data = JSON.parse(data);

var mailUser = data.user;
var mailPass = data.pass;

console.log(mailUser);
console.log(mailPass);

var smtpTransport = nodemailer.createTransport("smtps://" + mailUser + ":" + mailPass + "@smtp.gmail.com");

app.post('/contact-me', function(req, res) {
    smtpTransport.sendMail({
        from: req.body.email,
        to: mailUser,
        subject: "Website Email - " + req.body.name + " - " + req.body.subject,
        text: req.body.message + "\n\nFrom:\n" + req.body.name + "\n" + req.body.email 
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        
        res.end();
    });
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Take Charge Health listening at http://%s:%s", host, port);

});