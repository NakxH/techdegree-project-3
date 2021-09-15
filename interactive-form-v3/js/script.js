
(function(){
  const activitiesFieldset = document.querySelector('#activities');

  function focusFirstInput() {
    const nameInput = document.querySelector('#name');
    nameInput.focus();
  }

  function handleJobRoleOther() {
    const jobRoleInput = document.querySelector('#title');
  
    const otherJobRole = document.querySelector('#other-job-role');
    otherJobRole.style.display = 'none';
  
    jobRoleInput.addEventListener('change', () => {
      if ( jobRoleInput.value === 'other' ) {
        otherJobRole.style.display = 'block';
      } else {
        otherJobRole.style.display = 'none';
      }
    });
  }

  function handleShirtColor() {
    const colorSelectElement = document.querySelector('#shirt-colors');
    colorSelectElement.style.display = 'none';
    
    const tShirtDesign = document.querySelector('#design');
    const colorSelect = document.querySelector('#color');
    
    tShirtDesign.addEventListener('change', (e) => {
      colorSelect.value = '';
    
      const colors = colorSelect.querySelectorAll('option')
    
      for ( let i = 0; i < colors.length; i++ ) {
        if ( colors[i].getAttribute('data-theme') !== e.target.value ) {
          colors[i].style.display = 'none';
        } else {
          colors[i].style.display = 'block';
        }
      }

      colorSelectElement.style.display = 'block';
    });
  }
  
  function handleActivityPrice() {
    let totalCost = 0;
    
    // Here I have used the focusin/focusout events as they bubble up and this means I dont have to loop through all the checkboxes and add 2 event listeners to each one.
    activitiesFieldset.addEventListener('focusin', (e) => handleFocus(e, 'focus'));
    activitiesFieldset.addEventListener('focusout', (e) => handleFocus(e, 'blur'));

    function handleFocus(e, type) {
      const focusElement = document.querySelector('.focus');
      if ( focusElement ) {
        focusElement.classList.remove('focus');
      }

      if ( type === 'focus' ) {
        e.target.parentNode.classList.add('focus');
      }
    }

    activitiesFieldset.addEventListener('change', (e) => {
      let cost = e.target.getAttribute('data-cost');
      let time = e.target.getAttribute('data-day-and-time');
      const matchingTimes = document.querySelectorAll(`[data-day-and-time="${time}"]`);

      for (let i = 0; i < matchingTimes.length; i++) {
        if (matchingTimes[i] !== e.target && e.target.checked) {
          matchingTimes[i].setAttribute('disabled', 'true');
        } else if (matchingTimes[i] !== e.target && !e.target.checked) {
          matchingTimes[i].removeAttribute('disabled');
        }
      }

      if ( e.target.checked ) {
        totalCost += parseInt(cost);
      } else {
        totalCost -= parseInt(cost);
      }
    
      const activitiesCost = document.querySelector('#activities-cost');
      
      activitiesCost.textContent = `Total: $${totalCost}`;
    })
  }

  function handlePaymentMethods() {
    const paymentMethod = document.querySelector('#payment');
    paymentMethod.value = 'credit-card';
    displayPaymentSection(paymentMethod.value);
    
    paymentMethod.addEventListener('change', (e) => {
      displayPaymentSection(e.target.value);
    })
  }

  function displayPaymentSection(method) {
    const creditCard = document.querySelector('#credit-card');
    const paypal = document.querySelector('#paypal');
    const bitcoin = document.querySelector('#bitcoin');
  
    creditCard.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  
    if ( method === 'credit-card' ) {
      creditCard.style.display = 'block';
    } else if ( method === 'paypal' ) {
      paypal.style.display = 'block';
    } else if ( method === 'bitcoin' ) {
      bitcoin.style.display = 'block';
    }
  }

  function handleFieldState(value, notValid, parent, message) {
    const error = parent.querySelector('.hint');

    if (value.length < 1) {
      error.style.display = 'block';
      parent.classList.add('not-valid');
      parent.classList.remove('valid');
      parent.querySelector('.hint').textContent = 'This field is required';
      return 'This field is required';
    }

    if ( notValid ) {
      error.style.display = 'block';
      parent.classList.add('not-valid');
      parent.classList.remove('valid');
      parent.querySelector('.hint').textContent = message;
      return message;
    }
    
    error.style.display = 'none';
    parent.classList.remove('not-valid');
    parent.classList.add('valid');
    
    return null;
  }


  function validateUserName() {
    const input = document.querySelector('#name');
    const notValid = input.value.length < 1;

    return handleFieldState(input.value, notValid, input.parentNode, 'Name field cannot be blank');
  }
  
  function validateUserEmail() {
    const input = document.querySelector('#email');
    const regex = /^[a-zA-z0-9]+\@[a-zA-z0-9]+\.com$/g;
    const notValid = !regex.test(input.value);

    return handleFieldState(input.value, notValid, input.parentNode, 'Email address must be formatted correctly')
  }

  function validateActivities() {
    const activities = activitiesFieldset.getElementsByTagName('input');
    let activityCount = 0;

    for ( let i = 0; i < activities.length; i++ ) {
      if ( activities[i].checked ) {
        activityCount++;
      }
    }

    const notValid = activityCount < 1;

    return handleFieldState(activityCount > 0 ? 'has activities' : '', notValid, activitiesFieldset, 'Choose at least one activity');
  }

  function validateCreditCard() {
    const input = document.querySelector('#payment');
    const errors = {};
    if ( input.value === 'credit-card' ) {
      errors.creditCardNumber = validateCreditCardNumber();
      errors.creditCardZipCode = validateCreditCardZipCode();
      errors.creditCardCvv = validateCreditCardCvv();
    }
    return errors;
  }

  function validateCreditCardNumber() {
    const input = document.querySelector('#cc-num');
    const cardNumRegex = /^[0-9]{13,16}$/g
    const notValid = !cardNumRegex.test(input.value);

    return handleFieldState(input.value, notValid, input.parentNode, 'Credit card number must be between 13 - 16 digits');
  }

  function validateCreditCardZipCode() {
    const input = document.querySelector('#zip');
    const zipCodeRegex = /^[0-9]{5}$/g
    const notValid = !zipCodeRegex.test(input.value);

    return handleFieldState(input.value, notValid, input.parentNode, 'Zip Code must be 5 digits');
  }

  function validateCreditCardCvv() {
    const input = document.querySelector('#cvv')
    const cvvRegex = /^[0-9]{3}$/g
    const notValid = !cvvRegex.test(input.value);

    return handleFieldState(input.value, notValid, input.parentNode, 'CVV must be 3 digits');
  }

  function handleFormSubmission() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      let errors = {};
      errors.userName = validateUserName();
      errors.userEmail = validateUserEmail();
      errors.activities = validateActivities();
      errors = {...errors, ...validateCreditCard()};
      for ( let key in errors ) {
        if ( errors[key] !== null ) {
          e.preventDefault();
          window.scrollTo(0,0);
        }
      }
    })
  }

  function handleRealTimeMessage() {
    const userName = document.querySelector('#name');
    userName.addEventListener('keyup', () => validateUserName());

    const email = document.querySelector('#email');
    email.addEventListener('keyup', () => validateUserEmail());

    const creditCardNumber = document.querySelector('#cc-num');
    creditCardNumber.addEventListener('keyup', () => validateCreditCardNumber());

    const creditCardZipCode = document.querySelector('#zip');
    creditCardZipCode.addEventListener('keyup', () => validateCreditCardZipCode());

    const creditCardCvv = document.querySelector('#cvv');
    creditCardCvv.addEventListener('keyup', () => validateCreditCardCvv());

    // Checkboxes act differently to regular inputs, I have used the change event to capture keyboard and mouse input.
    activitiesFieldset.addEventListener('change', () => validateActivities());
  }

  focusFirstInput();
  handleJobRoleOther();
  handleShirtColor();
  handleActivityPrice();
  handlePaymentMethods();
  handleFormSubmission();
  handleRealTimeMessage();

})()