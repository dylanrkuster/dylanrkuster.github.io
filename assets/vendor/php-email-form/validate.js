/**
* PHP Email Form Validation - v3.8
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');
  let previousEmailAddress = '';

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");
      let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }
      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      const formData = new FormData(thisForm);
      const signupEmail = formData.get('email');
      const device = formData.get('device');

      if (signupEmail !== previousEmailAddress) {
        previousEmailAddress = signupEmail;
        Email.send({
          SecureToken: 'cb270cb2-4d8c-4a96-ac1b-2fbb6d120416',
          To : 'dylan@getsafestop.com',
          From : 'dylanrkuster@gmail.com',
          Subject : 'Woohoo! SafeStop Sign Up!',
          Body : `${signupEmail} has signed up for SafeStop with ${device}!`
        }).then(_ => {
          setTimeout(() => {
            thisForm.querySelector(".loading").classList.remove("d-block");
            thisForm.querySelector(".sent-message").classList.add("d-block");
          }, 2000);
        });
      } else {
        thisForm.querySelector(".loading").classList.remove("d-block");
        thisForm.querySelector(".error-message").classList.add("d-block");
        thisForm.querySelector(".sent-message").classList.remove("d-block");
      }
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
