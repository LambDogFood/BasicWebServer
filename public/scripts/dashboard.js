const profileDropdown = document.querySelector('.profile .dropdown');

window.addEventListener('click', (event) => {
  if (event.target !== profileDropdown && !profileDropdown.contains(event.target)) {
    profileDropdown.style.display = 'none';
  }
});

const avatarImg = document.querySelector('.avatar img');

//
const logoutBtn = document.getElementById('logout-btn') ;

logoutBtn.addEventListener('click', function() {
    fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logout: true })
    })
    .then(response => response.json())
    .then(data => {
        // Will handle this later
      })
    .catch(err => {
        console.error(err);
    });
});