function f() {
	document.getElementsByClassName('dropdown')[0].classList.toggle('down');
	document.getElementsByClassName('arrow')[0].classList.toggle('gone');
	if (document.getElementsByClassName('dropdown')[0].classList.contains('down')) {
	  setTimeout(function() {
		document.getElementsByClassName('dropdown')[0].style.overflow = 'visible'
	  }, 500)
	} else {
	  document.getElementsByClassName('dropdown')[0].style.overflow = 'hidden'
	}
}

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

	location.reload()
});