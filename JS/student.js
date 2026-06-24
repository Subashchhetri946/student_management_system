const user = JSON.parse(localStorage.getItem("currentUser"));
if(!user || user.role !== 'student') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const student = findStudent();

    if(student) {
        renderMarks(student);
    } else {
        console.error("Student not found");
    }
    document.getElementById('loggedUserName').textContent = user.name;
    document.getElementById('loggedUserEmail').textContent = user.email;
    document.getElementById('logoutBtn').addEventListener('click', logout);

    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => showPage(button.dataset.page));
    });

    // showPage("marksPage");

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



const subjects = ["Math", "Science", "English", "Computer", "Social"];
const marks = {
    1: [90, 80, 75, 65, 43]
}

function average(scores) {
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}
function scoreToGpa(score) {
    return (score / 100) * 4;
}
function letterGrade(score) {
    if(score >=90) return "A+";
    if(score >=80) return "A";
    if(score >=70) return "B";
    if(score >=60) return "C";
    return "F";
}
console.log(user);

function renderMarks(student) {
    const scores = marks[student.id] || [0, 0, 0, 0, 0];
    document.getElementById('studentGpa').textContent = scoreToGpa(average(scores)).toFixed(1);
    document.getElementById('marksRows').innerHTML = subjects.map((subject, index) => {
    const score = scores[index] ?? 0;
    return `
      <div class="mark-row readonly-mark">
        <div><strong>${subject}</strong><small>Course Academic ID: EDU-CS-0${index + 1}</small></div>
        <input type="range" min="0" max="100" value="${score}" disabled />
        <div class="mark-score">${score}</div>
        <div>/100</div>
        <div class="grade-badge">${letterGrade(score)}</div>
        <small>${score >= 85 ? 'Outstanding work' : score >= 70 ? 'Good performance' : 'Needs improvement'}</small>
      </div>
    `;
  }).join('');
}