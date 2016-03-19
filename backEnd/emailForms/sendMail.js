var nodemailer = require('nodemailer');
var fs = require('fs');
var data = fs.readFileSync('./BackEnd/gmailAuth.json', 'utf-8');
data = JSON.parse(data);

var generator = require('xoauth2').createXOAuth2Generator({
    user: data.user,
    clientId: data.clientId,
    clientSecret: data.clientSecret,
    refreshToken: data.refreshToken 
});

module.exports = {
    sendMail: function (mailBody, res, successLog) {
        mailBody.to = data.user;
        
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
};