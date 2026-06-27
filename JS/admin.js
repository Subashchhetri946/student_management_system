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
    document.getElementById('studentForm').addEventListener('submit', saveStudentFromForm);
    showPage("dashboardPage");
    loadStudents();

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
 
function createRollNumber() {
    return "ROLL-" + Date.now();
}
async function saveStudentFromForm(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("studentName").value.trim(),
        email: document.getElementById("studentEmail").value.trim(),
        department: document.getElementById("studentDepartment").value.trim(),
        phone: document.getElementById("studentPhone").value.trim(),
        date: document.getElementById("studentDate").value.trim(),
        roll: createRollNumber()
    };
    const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const result = await response.json();
    if(result.success) {
        alert("Student added successfully!");
        document.getElementById("studentModal").close();
        document.getElementById("studentForm").reset();
    } else {
        alert(result.message);
    }
}

async function loadStudents() {
    const response = await fetch("http://localhost:5000/students");
    const result = await response.json();
    const students = result;
    if(!response.ok) {
        console.error("Load students error: ", result.message);
        alert(result.message);
        return;
    }
    const table = document.getElementById("studentsTable");
    table.innerHTML = students.map(student => `
    <tr>
      <td>${student.name}<br><small>${student.email}</small></td>
      <td><small>${student.roll_no}</small></td>
      <td>${student.department}</td>
      <td>${student.phone}</td>
      <td>${student.enrollment_date}</td>
      <td>
        <button class="icon-btn" onclick="selectForMarks(${student.id})">▤</button>
        <button class="icon-btn" onclick="openEditStudentModal(${student.id})">✎</button>
        <button class="icon-btn danger" onclick="deleteStudent(${student.id})">🗑</button>
      </td>
    </tr>
  `).join('');

}