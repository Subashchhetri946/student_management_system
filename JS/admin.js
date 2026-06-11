function showPage(pageId) {
    const titles = {
        dashboardPage: 'Academic Dashboard Overview',
        studentsPage: 'Students Management Registry',
        attendancePage: 'Daily Attendence Roll-Call',
        marksPage: 'Grade Transcript Records'
    }
    document.querySelectorAll('.nav.btn').forEach(button => button.classList.toggle('active', button.CDATA_SECTION_NODE.page === pageId));
    d
}