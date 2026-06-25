const user = JSON.parse(localStorage.getItem("currentUser"));
if(!user || user.role !== 'student') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const student = findStudent();

    if(student) {
        console.log(student);
        renderMarks(student);
        renderAttendance(student);    
        renderProfile(student);
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
const students = [
    {
        id: 1, 
        name: "Sarah Jenkins",
        email: "moi@student.edu",
        roll: "C5001",
        department: "Computer Science",
        phone: "9805645834",
        date: "2024-01-15",
        marks: [21, 88, 85, 90, 95],
        attendance: "Present"
    },
    {
        id: 4, 
        name: "Srijan Poudel",
        email: "srijan@student.edu",
        roll: "C5001",
        department: "Computer Science",
        phone: "9805645834",
        date: "2024-01-15",
        marks: [65, 72, 68, 80, 77],
        attendance: "Absent"
    }
]
const marks = {
    1: [90, 80, 75,88, 95]
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
    const scores = marks[student.studentId] || [0, 0, 0, 0, 0];
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


const attendance = {
    4: "Present"
}
function renderAttendance(student) {
  const status = attendance[student.id || student.studentId] || 'Not Recorded';

  document.getElementById('attendanceTable').innerHTML = `
    <tr>
      <td><strong>${student.name}</strong><small>${student.department || ''}</small></td>
      <td><small>${student.roll || 'N/A'}</small></td>
      <td><span class="status-pill ${status.toLowerCase().replace(' ', '-')}">${status}</span></td>
      <td><input class="remark-input" value="${status === 'Absent' ? 'Needs follow-up' : 'Scheduled Session'}" readonly></td>
    </tr>
  `;
}


function renderProfile(student) {
  document.getElementById('studentProfile').innerHTML = `
    <div class="profile-grid">
      <p><strong>Name</strong><span>${student.name || 'N/A'}</span></p>
      <p><strong>Email</strong><span>${student.email || 'N/A'}</span></p>
      <p><strong>Roll Number</strong><span>${student.roll || 'N/A'}</span></p>
      <p><strong>Department</strong><span>${student.department || 'N/A'}</span></p>
      <p><strong>Phone</strong><span>${student.phone || 'N/A'}</span></p>
      <p><strong>Enrollment Date</strong><span>${student.date || 'N/A'}</span></p>
    </div>
  `;
}
