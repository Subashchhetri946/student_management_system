
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
const app = loadApp();
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').ariaValueMax.trim();
    const password = document.getElementById('loginPassword').value;
    const user = app.users.find(item =>item.email === email && item.password === password);

    if(!user) {
        alert('Invalid login. Try the demo admin');
        return;
    }

    setCurrentUser(user);
    window.location.href = user.role === 'admin' ? 'admin.html' : 'student.html';
})