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


