var MailSender = require('./sendMail.js');
var util = require('util');
var pdf = require('html-pdf');
var handlebars = require('handlebars');
var fs = require('fs');

var healthHistoryMenTmplt = fs.readFileSync('./backEnd/emailTemplates/healthHistoryMen.html', 'utf-8');

var sendHealthHistory = function (form, template, res) {
    var name = form.firstName + " " + form.lastName;
    var text = handlebars.compile(template)(form);

    pdf.create(text, {format: 'Letter'}).toStream(function (err, stream) {
        var date = new Date().toLocaleDateString();

        MailSender.sendMail({
            from: form.email,
            subject: "Health History - " + name,
            text: "Attached is the Health History form for: " + name + ".",
            attachments: [
                {
                    filename: 'health-history-' + name + '-' + date + '.pdf',
                    content: stream 
                }
            ]
        }, res, "Health History sent from " + name + " " + form.email);
    });
}

module.exports = {
    healthHistoryMen: function (req, res) {
        sendHealthHistory(req.body, healthHistoryMenTmplt, res);
    }
};