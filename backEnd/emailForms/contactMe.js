var MailSender = require('./sendMail.js')
var util = require('util');

module.exports = {
    contactMe: function (req, res) {
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
            MailSender.sendMail({
                from: req.body.email,
                subject: "Website Email - " + req.body.name + " - " + req.body.subject,
                text: req.body.message + "\n\nFrom:\n" + req.body.name + "\n" + req.body.email
            }, res, "Contact Me message sent from " + req.body.name + " " + req.body.email);
        }
    }
};