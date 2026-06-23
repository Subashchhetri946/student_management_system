const user = JSON.parse(localStorage.getItem("currentUser"));
if(!user || user.role !== 'student') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const student = findStudent();

    document.getElementById('loggedUserName').textContent = user.name;
    document.getElementById('loggedUserEmail').textContent = user.email;
    document.getElementById('logoutBtn').addEventListener('click', logout);

    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => showPage(button.dataset.page));
    });

});

function findStudent() {
    return  user;
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
}

function showPage() {

    
}
console.log(localStorage.getItem("currentUser"));