
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => switchAuthTab('login'));
signupTab.addEventListener('click', () => switchAuthTab('signup'));

function switchAuthTab(tabName) {
    loginTab.classList.toggle('active', tabName === 'login');
    signupTab.classList.toggle('active', tabName === 'signup');
    loginForm.classList.toggle('hidden', tabName !== 'login');
    signupForm.classList.toggle('hidden', tabName !== 'signup');
}

