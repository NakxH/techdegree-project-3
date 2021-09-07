const nameInput = document.querySelector('#name');
nameInput.focus();

const jobRoleInput = document.querySelector('#title');

const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = 'none';


jobRoleInput.addEventListener('change', () => {

  if ( jobRoleInput.value === 'other') {

    otherJobRole.style.display = 'block';

  } else {

    otherJobRole.style.display = 'none';

  }

})


