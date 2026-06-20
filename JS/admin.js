const user = getCurrentUser();
let selectedStudentId = app.students[0]?.id || null;

if(!user || user.role !== 'admin') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loggedUserName').textContent = user.name;
    document.
})