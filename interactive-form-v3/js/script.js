// Job Selection

const nameInput = document.querySelector('#name');
nameInput.focus();

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

// Shirt Colors

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

// Activities

const activeField = document.querySelector('#activities');
let  totalCost = 0;

activeField.addEventListener('change', (e) => {

  let cost = e.target.getAttribute('data-cost');

  if ( e.target.checked ) {

    totalCost += parseInt(cost);

  } else {

    totalCost -= parseInt(cost);

  }

  console.log(totalCost);

  const activitiesCost = document.querySelector('#activities-cost');
  
  activitiesCost.textContent = `Total: $${totalCost}`;

})


// Payment Method

const paymentMethod = document.querySelector('#payment');

displayPaymentSection(paymentMethod.value);

paymentMethod.addEventListener('change', (e) => {
  displayPaymentSection(e.target.value);
})

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

const form = document.querySelector('form');
let errors = {};
const rules = {
  'user-name': (value) => {
    if ( value.length < 1 ) {
      return 'The "Name" field cannot be blank or empty.'
    }
    return null;
  },
  'user-email': (value) => {
    const regex = /^[a-zA-z0-9]+\@[a-zA-z0-9]+\.com$/g;
    if ( !regex.test(value) ) {
      return 'The "Email Address" field must contain a validly formatted email address.'
    }
    return null;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event

form.addEventListener('submit', (e) => {

  e.preventDefault();
  // Construct a FormData object, which fires the formdata event.
  new FormData(e.target);

})

form.addEventListener('formdata', (e) => {
  errors = {};
  // Get the form data from the event object.
  let data = e.formData;
  for (var key of data.keys()) {
    const rule = rules[key];
    if ( rule ) {
      const response = rule(data.get(key));
      if (response) {
        errors[key] = response;
      }
    }
  }

  const activities = activeField.getElementsByTagName('input');
  let activityCount = 0;
  for ( let i = 0; i < activities.length; i++ ) {
    if ( activities[i].checked ) activityCount++;
  }
  if ( activityCount < 1 ) {
    errors['activities'] = 'The "Register for Activities" section must have at least one activity selected.'
  }

  if ( data.get('user-payment') === 'credit-card' ) {
    const cardNumRegex = /^[0-9]{13,16}$/g
    if ( !cardNumRegex.test(data.get('user-cc-num')) ) {
      errors['user-cc-num'] = 'The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces.';
    }
    const zipCodeRegex = /^[0-9]{5}$/g
    if ( !zipCodeRegex.test(data.get('user-zip')) ) {
      errors['user-zip'] ='The "Zip code" field must contain a 5 digit number.';
    }
    const cvvRegex = /^[0-9]{3}$/g
    if ( !cvvRegex.test(data.get('user-cvv')) ) {
      errors['user-cvv'] ='The "CVV" field must contain a 3 digit number.';
    }
  }

  console.log(errors);
  console.log(Object.keys(errors).length);
  
  // if ( Object.keys(errors).length > 0 ) {

  //   e.preventDefault();

  // }
});