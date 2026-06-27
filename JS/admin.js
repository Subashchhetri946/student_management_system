const user = JSON.parse(localStorage.getItem("currentUser"));
let selectedStudentId = null;

if(!user || user.role !== 'admin') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loggedUserName').textContent = user.name;
    document.getElementById('loggedUserEmail').textContent = user.email;
    document.getElementById('attendanceDate').valueAsDate = new Date();
    
    document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.page));
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('closeStrip').addEventListener('click', () => {
        document.querySelector('.mysql-strip').style.display = 'none'
    });

    // for adding student from onboard button
    document.getElementById('openAddStudent').addEventListener('click', openAddStudentModal);

    // remove the popup window
    document.getElementById('cancelStudent').addEventListener('click', () => {
        document.getElementById('studentModal').close()
    });
    document.getElementById()
    showPage("dashboardPage");

});

function showPage(pageId) {
    const titles = {
        dashboardPage: 'Academic Dashboard Overview',
        studentsPage: 'Students Management Registry',
        attendancePage: 'Daily Attendance Roll-Call',
        marksPage: 'Grade Transcript Records'
    };

    document.querySelectorAll('.nav-btn').forEach(button => button.classList.toggle('active', button.dataset.page === pageId));
    document.querySelectorAll('.page').forEach(page => page.classList.toggle('active-page', page.id === pageId));
    document.getElementById('pageHeading').textContent = titles[pageId];
}

function logout() {
     window.location.href = "index.html";
}

function openAddStudentModal() {
    document.getElementById('studentModalTitle').textContent = 'Onboard Student';
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
    document.getElementById('studentDate').valueAsDate = new Date();
    document.getElementById('studentModal').showModal();
}
