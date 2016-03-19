define((require) => {
    let validator = require('validator');
    let angular = require('angular');
    
    angular.module('validation', [])
        .factory('formValidators', () => {
            return {
                text (text) {
                    return validator.blacklist(text, '\<\>\\\&\;');
                },
                textSpace (text) {
                    return validator.matches(text, /^[\w\s\.]+$/g) ? 
                        false :
                        'Please enter only letters, spaces, or a period.';
                },
                textStrict (text) {
                    return validator.isAlpha(text) ?
                        false : 
                        'Please enter only letters';
                },
                phone (phone) {
                    return validator.matches(phone, /^(\(\d{3}\)\s*\d{3}\-\d{4})$|^(\d{3}\-\d{3}\-\d{4})$/g) ?
                        false : 
                        'Please enter a valid phone number: (xxx) xxx-xxxx or xxx-xxx-xxxx';
                },
                email (email) {
                    return validator.isEmail(email) ?
                        false :
                        'Please enter a valid email: example@example.com';
                },
                numberField (numberInput) {
                    return validator.isNumeric(numberInput) ? 
                        false :
                        'Please enter only numbers';
                }
            }
        })
        .factory('validateForm', (formValidators) => {
            let validators = formValidators;
            
            return (values, config) => {
                let errors;
                
                config.map((item) => {
                    let {name, type, required} = item;
                    let value = values[name];
                    
                    if (!value) {
                        if (required) {
                            errors = errors || {};
                            
                            errors[name] = "This field is required.";
                        }
                    } else if (type) {
                        let response = formValidators[type](value);
                        
                        if (type === "text") {
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