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

    showPage("marksPage");

});

function findStudent() {
    return  user;
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
}

function showPage(pageId) {
    const titles = {
        marksPage: 'My Grade Transcript',
        attendancePage: 'My Attendance Records',
        profilePage: 'My Student Profile'
    };
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.page === pageId);
    });
    document.querySelectorAll('.page').forEach(page => {
        page.classList.toggle('active-page', page.id === pageId);
    });
    document.getElementById('pageHeading').textContent = titles[pageId];
}
console.log(localStorage.getItem("currentUser"));