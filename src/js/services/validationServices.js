define((require) => {
    let validator = require('validator');
    let angular = require('angular');

    class FormValidators {
        text (text) {
            return validator.blacklist(text, '\<\>\\\&\;');
        }
        textSpace (text) {
            return validator.matches(text, /^[\w\s\.\-]+$/g) ? 
                false :
                'Please enter only letters, spaces, dashes, or a period.';
        }
        textStrict (text) {
            return validator.isAlpha(text) ?
                false : 
                'Please enter only letters';
        }
        phone (phone) {
            return validator.matches(phone, /^(\(\d{3}\)\s*\d{3}\-\d{4})$|^(\d{3}\-\d{3}\-\d{4})$/g) ?
                false : 
                'Please enter a valid phone number: (xxx) xxx-xxxx or xxx-xxx-xxxx';
        }
        email (email) {
            return validator.isEmail(email) ?
                false :
                'Please enter a valid email: example@example.com';
        }
        numberField (numberInput) {
            return validator.isNumeric(numberInput) ? 
                false :
                'Please enter only numbers';
        }
        date (date) {
            let error = false;

            if (!validator.matches(date, /^\d{2}\/\d{2}\/\d{4}$/g)) {
                error = "Date must be in the following format: MM/DD/YYYY";
            } else if (!validator.isDate(date)) {
                error = "Please enter a valid date";
            } else if (!validator.isBefore(date, new Date())) {
                error = "Plese enter a date in the past";
            }

            return error;
        }
    }
    
    angular.module('validation', [])
        .service('formValidators', FormValidators)
        .factory('validateForm', (formValidators) => {
            return (values, config) => {
                let errors;
                
                if (typeof values.captcha !== undefined) {
                    let success = grecaptcha.getResponse(values.captcha);
                    
                    if (!success) {
                        errors = {captcha: 'Please complete the reCAPTCHA to continue.'};
                    }
                }
                
                config.map((item) => {
                    let {name, type, required, validator} = item;
                    let value = values[name];
                    
                    if (!value) {
                        if (required) {
                            errors = errors || {};
                            
                            errors[name] = 'This field is required.';
                        }
                    } else if (type) {
                        let response = type === "custom" && typeof validator === "function" ? 
                            validator(value) : 
                            formValidators[type](value);
                        
                        if (type === 'text') {
                            values[name] = response;
                        } else if (response) {
                            errors = errors || {};
                            
                            errors[name] = response;
                        }
                    }
                });
                
                return errors;
            }
        });
});