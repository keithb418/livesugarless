var MailSender = require('./sendMail.js')
var util = require('util');

var validateAvail = function (availReq) {
    return availReq && 
        (availReq.wedAM || availReq.wedPM || 
        availReq.thursAM || availReq.thursPM || 
        availReq.friAM || availReq.friPM) ?
        "" :
        "Availability is Required"
};

var getAvailability = function (availReq) {
    var availability = "";
    
    availability += availReq.wedAM ? "Wednesday 9am - 12pm\t" : "";
    availability += availReq.wedPM ? "Wednesday 1pm - 5pm\t" : "";
    availability += availReq.thursAM ? "Thursday 9am - 12pm\t" : "";
    availability += availReq.thursPM ? "Thursday 1pm - 5pm\t" : "";
    availability += availReq.friAM ? "Friday 9am - 12pm\t" : "";
    availability += availReq.friPM ? "Friday 1pm - 5pm" : "";
    
    return availability;
}

module.exports = {
    freeConsultation: function (req, res) {
        var schema = {
            firstName: {
                notEmpty: true,
                isAlpha: true,
                errorMessage: 'Invalid First Name'
            },
            middleName: {
                optional: true,
                isAlpha: true,
                errorMessage: 'Invalid Middle Initial'
            },
            lastName: {
                notEmpty: true,
                isAlpha: true,
                errorMessage: 'Invalid Last Name'
            },
            nickname: {
                optional: true,
                isAlpha: true,
                errorMessage: 'Invalid Nickname'
            },
            email: {
                notEmpty: true,
                isEmail: {
                    errorMessage: 'Invalid Email'
                }
            },
            phone: {
                notEmpty: true,
                matches: {
                    options: [/^(\(\d{3}\)\s*\d{3}\-\d{4})$|^(\d{3}\-\d{3}\-\d{4})$/g]
                },
                errorMessage: 'Invalid Phone Number'
            }
        };
        
        req.check(schema);
        
        req.sanitize('comments').blacklist('\<\>\\\&\;');
        
        var invalidAvail = validateAvail(req.body.availability);
        var errors = req.validationErrors();
        
        if (errors || invalidAvail) {
            res.status(400).send("One or more inputs were invalid: " + util.inspect(errors) + "\n" + invalidAvail);
            console.log("One or more inputs were invalid: " + util.inspect(errors) + "\n" + invalidAvail);
        } else {
            var availability = getAvailability(req.body.availability);
            
            var name = req.body.firstName + " " + req.body.lastName;
            var text =  "First Name: " + req.body.firstName + "\n" +
                        "Middle Initial: " + (req.body.middleName || "") + "\n" +
                        "Last Name: " + req.body.lastName + "\n" +
                        "Preferred / Nickname: " + (req.body.nickname || "") + "\n" + 
                        "Email: " + req.body.email + "\n" +
                        "Phone: " + req.body.phone + "\n" +
                        "Availability: " + availability + "\n" +
                        "Comments: " + (req.body.comments || "");
                        
            
            MailSender.sendMail({
                from: req.body.email,
                subject: "Free Consultation - " + name,
                text: text + "\n\nFrom:\n" + name + "\n" + req.body.email
            }, res, "Free Consultation sent from " + name + " " + req.body.email);
        }
    }
};