
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
});

signupForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const department = document.getElementById('signupDepartment').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();

    if(app.users.some(user => user.email === email)) {
        alert('this email is already registered.');
    }

    const student = {
        id: Date.now(), 
        name, 
        email,
        department,
        phone,
        roll: createRollNumber(),
        date: new Date().toISOString().slice(0, 10)
    };

    const user = {
        name,
        email,
        password,
        role: 'student',
        studentId: student.id
    };

    app.students.push(student);
    app.users.push(user);

    app.marks[student.id] = [92, 88, 85, 90, 95];
    app.attendence[student.id] = 'Present';

    saveApp(app);
    setCurrentUser(user);
    window.location.href = 'student.html'
})