const API_URL = "https://student-management-system-v04r.onrender.com";

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

loginForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }
        
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("currentUser", JSON.stringify(data.user))

        window.location.href = 
        data.user.role === "admin" ? "admin.html" : "student.html";

    } catch (error) {
        console.log(error);
        alert("Server error. Make sure backend is running.");
    }
});

signupForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const department = document.getElementById('signupDepartment').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
try {
        const response = await fetch("https://student-management-system-v04r.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                department,
                phone
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            localStorage.setItem("userRole", "student");
            localStorage.setItem("currentUser", JSON.stringify({
                name,
                email,
                department,
                phone,
                role: "student"
            }));

            window.location.href = "student.html";
        }

    } catch (error) {
        console.log(error);
        alert("Server error. Make sure backend is running.");
    }
});