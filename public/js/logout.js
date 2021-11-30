// add logout event
const logout = async () => {
  // make POST request to end session
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // if logged out go to login page
    document.location.replace('/');
  } else {
    alert('Your are not logged out.');
  }
};

// add listener for linking logout to view pages
document.querySelector('#logout').addEventListener('click', logout);