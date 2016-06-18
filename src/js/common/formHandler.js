define((require) => {
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    return class {
        constructor(dependencies, captchaId) {
            angular.extend(this, dependencies, {
                captchaId,
                showCaptcha: this.showCaptcha.bind(this),
                submit: this.submit.bind(this)
            });
        }

        showCaptcha() {
            let width = angular.element(this.$window).outerWidth();
            let size = width < 370 ? 'compact' : 'normal';

            this.captcha = grecaptcha.render(this.captchaId, {
                'sitekey': apiData.captchaKey,
                size
            });
        }

        restrictTo(maxLength, value = '') {
            value = `${value}`;

            if (value.length > maxLength) {
                value = value.substr(0, maxLength);
            } else if (value[value.length - 1] === ".") {
                value = value.substr(0, value.length - 1);
            }

            return parseInt(value);
        }

        disableAllInputs() {
            angular.element('input, button, textarea').attr('disabled', 'disabled');
        }

        submit(form = {}, url = '', formConfig, messageOpts) {
            angular.extend(form, { captcha: this.captcha });

            let errors = this.validateForm(form, formConfig);

            if (errors) {
                return errors;
            }

            this.disableAllInputs();

            this.$http.post(url, form, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.showMessage(angular.extend({icon: 'fa-check'}, messageOpts));
            }, () => {
                this.showMessage({
                    title: 'Error Submitting Form',
                    message: "There was an error submitting your form.  Please try again later or contact me directly if it's still an issue: teribrown1015@gmail.com",
                    icon: 'fa-warning'
                });
            });

            return;
        }
    }
});