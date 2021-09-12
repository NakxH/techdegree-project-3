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
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

creditCard.style.display = 'none';
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';

paymentMethod.addEventListener('change', (e) => {

  if ( paymentMethod.value === 'credit-card' ) {

    creditCard.style.display = 'block';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';

  } else if ( paymentMethod.value === 'paypal' ) {

    creditCard.style.display = 'none';
    paypal.style.display = 'block';
    bitcoin.style.display = 'none';

  } else {

    creditCard.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'block';

  }
})