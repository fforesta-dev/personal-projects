// Application state
let subjects = [];
let certificates = [];

// Default data with placeholder subjects and certificates
const defaultSubjects = [
    {
        id: 'pc101',
        code: 'PC101',
        name: 'Life Skills',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 1
    },
    {
        id: 'rel250a',
        code: 'REL250A',
        name: 'Jesus Christ & His Everlasting Gospel',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 2
    },
    {
        id: 'pc102',
        code: 'PC102',
        name: 'Professional Skills',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 3
    },
    {
        id: 'rel250b',
        code: 'REL250B',
        name: 'Jesus Christ & His Everlasting Gospel',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 4
    },
    {
        id: 'pc103',
        code: 'PC103',
        name: 'University Skills',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 5
    },
    {
        id: 'csepc110',
        code: 'CSEPC110',
        name: 'Introduction to Programming',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 6
    },
    {
        id: 'rel275a',
        code: 'REL275A',
        name: 'Teachings and Doctrine of the Book of Mormon',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 7
    },
    {
        id: 'cse111',
        code: 'CSE111',
        name: 'Programming with Functions',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 8
    },
    {
        id: 'wdd130',
        code: 'WDD130',
        name: 'Web Fundamentals',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 9
    },
    {
        id: 'wdd131',
        code: 'WDD131',
        name: 'Dynamic Web Fundamentals',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 10
    },
    {
        id: 'rel275b',
        code: 'REL275B',
        name: 'Teachings and Doctrine of the Book of Mormon',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 11
    },
    {
        id: 'wdd231',
        code: 'WDD231',
        name: 'Web Frontend Development 1',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 12
    },
    {
        id: 'cse210',
        code: 'CSE210',
        name: 'Programming with Classes',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 13
    },
    {
        id: 'math108x',
        code: 'MATH108X',
        name: 'Math for the Real World',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 14
    },
    {
        id: 'gs170',
        code: 'GS170',
        name: 'Career Development',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 15
    },
    {
        id: 'rel225a',
        code: 'REL225A',
        name: 'Foundations of the Restoration',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 16
    },
    {
        id: 'itm111',
        code: 'ITM111',
        name: 'Introduction to Databases',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 17
    },
    {
        id: 'rel225b',
        code: 'REL225B',
        name: 'Foundations of the Restoration',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 18
    },
    {
        id: 'wdd330',
        code: 'WDD330',
        name: 'Web Frontend Development 2',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 19
    },
    {
        id: 'rel200a',
        code: 'REL200A',
        name: 'The Eternal Family',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 20
    },
    {
        id: 'cse340',
        code: 'CSE340',
        name: 'Web Backend Development',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 21
    },
    {
        id: 'writ101',
        code: 'WRIT101',
        name: 'Writing in Professional Contexts',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 22
    },
    {
        id: 'cse341',
        code: 'CSE341',
        name: 'Web Services',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 23
    },
    {
        id: 'rel200b',
        code: 'REL200B',
        name: 'The Eternal Family',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 24
    },
    {
        id: 'wdd430',
        code: 'WDD430',
        name: 'Web Full-Stack Development',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 25
    },
    {
        id: 'rel333a',
        code: 'REL333A',
        name: 'Teachings of the Living Prophets',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 26
    },
    {
        id: 'pubh132',
        code: 'PUBH132',
        name: 'Personal Health & Wellness',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 27
    },
    {
        id: 'bus301',
        code: 'BUS301',
        name: 'Advanced Writing in Professional Contexts',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 28
    },
    {
        id: 'fcs160',
        code: 'FCS160',
        name: 'Family Leadership & Resource Management',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 29
    },
    {
        id: 'rel333b',
        code: 'REL333B',
        name: 'Teachings of the Living Prophets',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 30
    },
    {
        id: 'cse212',
        code: 'CSE212',
        name: 'Programming with Data Structures',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 31
    },
    {
        id: 'bus321',
        code: 'BUS321',
        name: 'Organizational Leadership',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 32
    },
    {
        id: 'cse270',
        code: 'CSE270',
        name: 'Software Testing',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 33
    },
    {
        id: 'rel290a',
        code: 'REL290A',
        name: 'The Divine Gift of Forgiveness',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 34
    },
    {
        id: 'cse310',
        code: 'CSE310',
        name: 'Applied Programming',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 35
    },
    {
        id: 'hum110',
        code: 'HUM110',
        name: 'Discovery & Discernment Through the Arts',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 36
    },
    {
        id: 'cse325',
        code: 'CSE325',
        name: '.NET Software Development',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 37
    },
    {
        id: 'rel290b',
        code: 'REL290B',
        name: 'The Divine Gift of Forgiveness',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 38
    },
    {
        id: 'gesci110',
        code: 'GESCI110',
        name: 'Sustaining Human Life',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 39
    },
    {
        id: 'rel280a',
        code: 'REL280A',
        name: 'Answering My Gospel Questions',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 40
    },
    {
        id: 'cse370',
        code: 'CSE370',
        name: 'Software Engineering Principles',
        credits: 2,
        status: 'not-started',
        prerequisites: [],
        order: 41
    },
    {
        id: 'cse300',
        code: 'CSE300',
        name: 'Professional Readiness',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 42
    },
    {
        id: 'rel280b',
        code: 'REL280B',
        name: 'Answering My Gospel Questions',
        credits: 1,
        status: 'not-started',
        prerequisites: [],
        order: 43
    },
    {
        id: 'cse499',
        code: 'CSE499',
        name: 'Senior Project',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 44
    },
    {
        id: 'peace101',
        code: 'PEACE101',
        name: 'Conflict and Peace',
        credits: 3,
        status: 'not-started',
        prerequisites: [],
        order: 45
    }
];

const defaultCertificates = [
    {
        id: 'pathway-connect',
        name: 'PathwayConnect Certificate',
        requiredSubjects: ['PC101', 'REL250A', 'MATH110', 'ENG111'],
        status: 'not-requested' // not-requested, requested, received
    },
    {
        id: 'web-computer-programming',
        name: 'Web & Computer Programming Certificate',
        requiredSubjects: ['CS111', 'WEB170', 'WEB230'],
        status: 'not-requested'
    },
    {
        id: 'web-development',
        name: 'Web Development Certificate',
        requiredSubjects: ['WEB170', 'WEB230', 'WEB330', 'WEB340'],
        status: 'not-requested'
    },
    {
        id: 'associate-degree',
        name: 'Associate Degree',
        requiredSubjects: ['PC101', 'REL250A', 'MATH110', 'ENG111', 'CS111', 'WEB170', 'WEB230', 'WEB330'],
        status: 'not-requested'
    },
    {
        id: 'software-development',
        name: 'Software Development Certificate',
        requiredSubjects: ['CS111', 'WEB170', 'WEB230', 'WEB330', 'WEB340', 'WEB430'],
        status: 'not-requested'
    },
    {
        id: 'bachelor-degree',
        name: "Bachelor's Degree",
        requiredSubjects: ['PC101', 'REL250A', 'MATH110', 'ENG111', 'CS111', 'WEB170', 'WEB230', 'WEB330', 'WEB340', 'WEB430'],
        status: 'not-requested'
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    loadData();
    updateStats();
    renderSubjects();
    renderCertificates();

    // Add form event listener
    document.getElementById('add-subject-form').addEventListener('submit', handleAddSubject);
});

// Data management functions
function loadData() {
    // Try to load from localStorage first (for backward compatibility)
    const savedSubjects = localStorage.getItem('studyTracker-subjects');
    const savedCertificates = localStorage.getItem('studyTracker-certificates');

    if (savedSubjects) {
        subjects = JSON.parse(savedSubjects);
        // Add order property if it doesn't exist
        subjects.forEach((subject, index) => {
            if (subject.order === undefined) {
                subject.order = index + 1;
            }
        });
    } else {
        subjects = [...defaultSubjects];
    }

    if (savedCertificates) {
        certificates = JSON.parse(savedCertificates);
    } else {
        certificates = [...defaultCertificates];
    }

    saveData();
}

function saveData() {
    localStorage.setItem('studyTracker-subjects', JSON.stringify(subjects));
    localStorage.setItem('studyTracker-certificates', JSON.stringify(certificates));
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Statistics functions
function updateStats() {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const earnedCredits = subjects
        .filter(subject => subject.status === 'completed')
        .reduce((sum, subject) => sum + subject.credits, 0);
    const inProgressCredits = subjects
        .filter(subject => subject.status === 'in-progress')
        .reduce((sum, subject) => sum + subject.credits, 0);

    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('earnedCredits').textContent = earnedCredits;
    document.getElementById('inProgressCredits').textContent = inProgressCredits;
}

// Subject functions
function renderSubjects() {
    const container = document.getElementById('subjects-list');
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchSubjects').value.toLowerCase();

    let filteredSubjects = [...subjects];

    // Apply status filter
    if (statusFilter !== 'all') {
        filteredSubjects = filteredSubjects.filter(subject => subject.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
        filteredSubjects = filteredSubjects.filter(subject =>
            subject.code.toLowerCase().includes(searchTerm) ||
            subject.name.toLowerCase().includes(searchTerm)
        );
    }

    // Always sort by custom order
    filteredSubjects.sort((a, b) => {
        return (a.order || 999) - (b.order || 999);
    });

    container.innerHTML = filteredSubjects.map(subject => {
        const canStart = canStartSubject(subject);
        const prereqsInfo = getPrerequisitesInfo(subject);

        return `
            <div class="subject-card ${subject.status} ${!canStart ? 'blocked' : ''}" onclick="toggleSubjectStatus('${subject.id}')">
                <div class="subject-header">
                    <span class="subject-code">${subject.code}</span>
                    <span class="subject-credits">${subject.credits} ${subject.credits === 1 ? 'credit' : 'credits'}</span>
                </div>
                <div class="subject-name">${subject.name}</div>
                <div class="subject-status">
                    <div class="status-buttons">
                        <button class="status-btn not-started ${subject.status === 'not-started' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); setSubjectStatus('${subject.id}', 'not-started')">
                            Not Started
                        </button>
                        <button class="status-btn in-progress ${subject.status === 'in-progress' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); setSubjectStatus('${subject.id}', 'in-progress')"
                                ${!canStart ? 'disabled' : ''}>
                            In Progress
                        </button>
                        <button class="status-btn completed ${subject.status === 'completed' ? 'active' : ''}" 
                                onclick="event.stopPropagation(); setSubjectStatus('${subject.id}', 'completed')">
                            Completed
                        </button>
                    </div>
                </div>
                ${subject.prerequisites.length > 0 ? `
                    <div class="prereqs">
                        <strong>Prerequisites:</strong><br>
                        ${prereqsInfo.map(prereq => `
                            <span class="prereq-tag ${prereq.completed ? 'completed' : 'missing'}">
                                ${prereq.code}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                ${!canStart ? `
                    <div class="blocked-message">
                        Complete prerequisites before starting this subject.
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function canStartSubject(subject) {
    if (subject.status === 'completed') return true;

    return subject.prerequisites.every(prereqCode => {
        const prereqSubject = subjects.find(s => s.code === prereqCode);
        return prereqSubject && prereqSubject.status === 'completed';
    });
}

function getPrerequisitesInfo(subject) {
    return subject.prerequisites.map(prereqCode => {
        const prereqSubject = subjects.find(s => s.code === prereqCode);
        return {
            code: prereqCode,
            completed: prereqSubject ? prereqSubject.status === 'completed' : false
        };
    });
}

function setSubjectStatus(subjectId, status) {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Check if subject can be started
    if ((status === 'in-progress' || status === 'completed') && !canStartSubject(subject)) {
        alert('You must complete the prerequisites before starting this subject.');
        return;
    }

    subject.status = status;
    saveData();
    updateStats();
    renderSubjects();
    renderCertificates(); // Update certificates as well
}

function toggleSubjectStatus(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(subject.status);
    let nextIndex = (currentIndex + 1) % statusOrder.length;

    // Skip in-progress if prerequisites aren't met
    if (statusOrder[nextIndex] === 'in-progress' && !canStartSubject(subject)) {
        nextIndex = (nextIndex + 1) % statusOrder.length;
    }

    setSubjectStatus(subjectId, statusOrder[nextIndex]);
}

function filterSubjects() {
    renderSubjects();
}

// Certificate functions
function renderCertificates() {
    const container = document.getElementById('certificates-list');

    container.innerHTML = certificates.map(cert => {
        const progress = getCertificateProgress(cert);
        const canRequest = progress.completed === progress.total && cert.status === 'not-requested';

        return `
            <div class="certificate-card">
                <div class="certificate-header">
                    <span class="certificate-name">${cert.name}</span>
                    <span class="certificate-progress">${progress.completed}/${progress.total} subjects</span>
                </div>
                <div class="certificate-subjects">
                    <h4>Required Subjects:</h4>
                    ${cert.requiredSubjects.map(subjectCode => {
            const subject = subjects.find(s => s.code === subjectCode);
            const isCompleted = subject ? subject.status === 'completed' : false;
            return `<span class="subject-requirement ${isCompleted ? 'completed' : ''}">${subjectCode}</span>`;
        }).join('')}
                </div>
                <div class="certificate-actions">
                    ${cert.status === 'not-requested' ? `
                        <button class="cert-btn" ${!canRequest ? 'disabled' : ''} 
                                onclick="requestCertificate('${cert.id}')">
                            Request Certificate
                        </button>
                    ` : ''}
                    ${cert.status === 'requested' ? `
                        <button class="cert-btn requested" onclick="receiveCertificate('${cert.id}')">
                            Mark as Received
                        </button>
                        <button class="cert-btn" onclick="cancelCertificateRequest('${cert.id}')">
                            Cancel Request
                        </button>
                    ` : ''}
                    ${cert.status === 'received' ? `
                        <button class="cert-btn received" disabled>
                            ✓ Certificate Received
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function getCertificateProgress(certificate) {
    const total = certificate.requiredSubjects.length;
    const completed = certificate.requiredSubjects.filter(subjectCode => {
        const subject = subjects.find(s => s.code === subjectCode);
        return subject && subject.status === 'completed';
    }).length;

    return { completed, total };
}

function requestCertificate(certId) {
    const certificate = certificates.find(c => c.id === certId);
    if (!certificate) return;

    certificate.status = 'requested';
    saveData();
    renderCertificates();
}

function receiveCertificate(certId) {
    const certificate = certificates.find(c => c.id === certId);
    if (!certificate) return;

    certificate.status = 'received';
    saveData();
    renderCertificates();
}

function cancelCertificateRequest(certId) {
    const certificate = certificates.find(c => c.id === certId);
    if (!certificate) return;

    certificate.status = 'not-requested';
    saveData();
    renderCertificates();
}

// Add subject functionality
function handleAddSubject(event) {
    event.preventDefault();

    const code = document.getElementById('subjectCode').value.trim().toUpperCase();
    const name = document.getElementById('subjectName').value.trim();
    const credits = parseInt(document.getElementById('subjectCredits').value);
    const prereqsText = document.getElementById('subjectPrereqs').value.trim();

    // Check if subject code already exists
    if (subjects.find(s => s.code === code)) {
        alert('A subject with this code already exists!');
        return;
    }

    // Parse prerequisites
    const prerequisites = prereqsText ?
        prereqsText.split(',').map(p => p.trim().toUpperCase()).filter(p => p) :
        [];

    // Validate prerequisites exist
    const invalidPrereqs = prerequisites.filter(prereqCode =>
        !subjects.find(s => s.code === prereqCode)
    );

    if (invalidPrereqs.length > 0) {
        alert(`The following prerequisite subjects don't exist: ${invalidPrereqs.join(', ')}`);
        return;
    }

    // Create new subject
    const newSubject = {
        id: code.toLowerCase().replace(/\s+/g, '-'),
        code: code,
        name: name,
        credits: credits,
        status: 'not-started',
        prerequisites: prerequisites,
        order: subjects.length + 1
    };

    subjects.push(newSubject);
    saveData();
    updateStats();
    renderSubjects();

    // Reset form
    document.getElementById('add-subject-form').reset();

    alert('Subject added successfully!');
}

// Data import/export functions
function exportData() {
    const data = {
        subjects: subjects,
        certificates: certificates,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

function importData() {
    document.getElementById('import-file').click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.subjects && data.certificates) {
                if (confirm('This will replace all your current data. Are you sure?')) {
                    subjects = data.subjects;
                    certificates = data.certificates;
                    saveData();
                    updateStats();
                    renderSubjects();
                    renderCertificates();
                    alert('Data imported successfully!');
                }
            } else {
                alert('Invalid backup file format!');
            }
        } catch (error) {
            alert('Error reading backup file!');
        }
    };

    reader.readAsText(file);
}

function resetData() {
    if (confirm('This will delete ALL your data and reset to default. Are you sure?')) {
        if (confirm('This action cannot be undone. Are you absolutely sure?')) {
            localStorage.removeItem('studyTracker-subjects');
            localStorage.removeItem('studyTracker-certificates');
            loadData();
            updateStats();
            renderSubjects();
            renderCertificates();
            alert('Data has been reset to default.');
        }
    }
}

// New file-based storage functions
function saveToFile() {
    const data = {
        subjects: subjects,
        certificates: certificates,
        saveDate: new Date().toISOString(),
        version: '2.0'
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    alert('Data saved to file successfully!');
}

function loadFromFile() {
    document.getElementById('load-file').click();
}

function handleLoadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.subjects && data.certificates) {
                if (confirm('This will replace your current progress with the loaded data. Are you sure?')) {
                    subjects = data.subjects;
                    certificates = data.certificates;

                    // Ensure all subjects have order property
                    subjects.forEach((subject, index) => {
                        if (subject.order === undefined) {
                            subject.order = index + 1;
                        }
                    });

                    saveData();
                    updateStats();
                    renderSubjects();
                    renderCertificates();
                    alert('Data loaded successfully!');
                }
            } else {
                alert('Invalid file format!');
            }
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    };

    reader.readAsText(file);
    // Clear the file input
    event.target.value = '';
}

// Placeholder management functions
function showPlaceholderHelp() {
    const helpText = `📝 HOW TO EDIT DEFAULT SUBJECTS:

1. Open script.js file in any text editor
2. Find the "defaultSubjects" array (around line 6-70)
3. Each subject has these properties:
   • id: unique identifier (lowercase, no spaces)
   • code: subject code (e.g., "CS111")
   • name: full subject name
   • credits: number of credits (1-10)
   • prerequisites: array of prerequisite codes
   • order: number for custom sorting

4. Example subject format:
   {
       id: 'math120',
       code: 'MATH120',
       name: 'Statistics',
       credits: 3,
       status: 'not-started',
       prerequisites: ['MATH110'],
       order: 11
   }

5. Save the file and refresh the app
6. Use "Reset to Default Subjects" to load your changes

⚠️ IMPORTANT:
- Keep the same structure and format
- Make sure prerequisite codes exist as subjects
- Don't break the JavaScript syntax
- Always backup your data first!`;

    alert(helpText);
}

function resetToDefaults() {
    if (confirm('This will reset all subjects to the default ones defined in script.js. Your current progress will be lost. Are you sure?')) {
        if (confirm('This action cannot be undone. Make sure you have exported your data first!')) {
            // Reset subjects to defaults while preserving any progress
            const backupProgress = {};
            subjects.forEach(subject => {
                if (subject.status !== 'not-started') {
                    backupProgress[subject.code] = subject.status;
                }
            });

            // Load default subjects
            subjects = JSON.parse(JSON.stringify(defaultSubjects));

            // Restore progress for subjects that still exist
            subjects.forEach(subject => {
                if (backupProgress[subject.code]) {
                    subject.status = backupProgress[subject.code];
                }
            });

            // Reset certificates to defaults but preserve requests/received status
            const backupCertStatus = {};
            certificates.forEach(cert => {
                if (cert.status !== 'not-requested') {
                    backupCertStatus[cert.id] = cert.status;
                }
            });

            certificates = JSON.parse(JSON.stringify(defaultCertificates));
            certificates.forEach(cert => {
                if (backupCertStatus[cert.id]) {
                    cert.status = backupCertStatus[cert.id];
                }
            });

            saveData();
            updateStats();
            renderSubjects();
            renderCertificates();
            alert('Subjects reset to defaults. Your progress has been preserved where possible.');
        }
    }
}