let subjects = [];
let certificates = [];

const APP_PASSWORD_HASH = '02216e382eb7455f0622559e724c375a1fd69fa51ad6d0629dfb379c8d97cbbb';

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'study-tracker-salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generatePasswordHash(password) {
    const hash = await hashPassword(password);
    console.log(`Password hash for "${password}": ${hash}`);
    return hash;
}

async function checkPassword() {
    const inputPassword = document.getElementById('password-input').value;
    const errorDiv = document.getElementById('password-error');

    try {
        const inputHash = await hashPassword(inputPassword);

        if (inputHash === APP_PASSWORD_HASH) {
            document.getElementById('password-overlay').style.display = 'none';
            document.getElementById('main-app').style.display = 'block';

            sessionStorage.setItem('study-tracker-authenticated', 'true');

            initializeApp();
        } else {
            errorDiv.textContent = '❌ Incorrect password. Access denied.';
            document.getElementById('password-input').value = '';
            document.getElementById('password-input').focus();
        }
    } catch (error) {
        errorDiv.textContent = '❌ Authentication error. Please try again.';
    }
}

function checkAuthentication() {
    if (sessionStorage.getItem('study-tracker-authenticated') === 'true') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        initializeApp();
    } else {
        document.getElementById('password-input').focus();
    }
}

function initializeApp() {
    loadData();
    updateStats();
    renderSubjects();
    renderCertificates();

    document.getElementById('add-subject-form').addEventListener('submit', handleAddSubject);
}


document.addEventListener('DOMContentLoaded', function () {
    checkAuthentication();

    document.getElementById('password-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});

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
        prerequisites: ['PC101'],
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
        prerequisites: ['PC101', 'PC102'],
        order: 5
    },
    {
        id: 'csepc110',
        code: 'CSEPC110',
        name: 'Introduction to Programming',
        credits: 2,
        status: 'not-started',
        prerequisites: ['PC102'],
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
        prerequisites: ['CSEPC110'],
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
        prerequisites: ['WDD130', 'CSEPC110'],
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
        name: 'Web Frontend Development I',
        credits: 2,
        status: 'not-started',
        prerequisites: ['WDD131'],
        order: 12
    },
    {
        id: 'cse210',
        code: 'CSE210',
        name: 'Programming with Classes',
        credits: 2,
        status: 'not-started',
        prerequisites: ['CSE111'],
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
        prerequisites: {
            type: 'any',
            courses: ['OSH450', 'BUS180', 'ART235', 'FCS340', 'BUS119', 'SPED360', 'WDD230', 'WDD231', 'AUTO332', 'AUTO232', 'PUBH320', 'HS320', 'ME272', 'BUS210', 'ECON150', 'COMM150', 'HTMBC240', 'SMMBC160', 'CSE210', 'FIN102', 'BUS233', 'MCO203A', 'IT235', 'ACC208', 'SCM223', 'GSO223', 'SMM130', 'FHGEN242']
        },
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
        name: 'Web Frontend Development II',
        credits: 3,
        status: 'not-started',
        prerequisites: {
            type: 'any',
            courses: ['WDD230', 'WDD231']
        },
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
        prerequisites: {
            groups: [
                {
                    type: 'any',
                    courses: ['WDD230', 'WDD231', 'CS213']
                },
                {
                    type: 'all',
                    courses: ['ITM111']
                }
            ]
        },
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
        prerequisites: ['CSE340'],
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
        prerequisites: ['WDD330', 'CSE340'],
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
        prerequisites: {
            groups: [
                {
                    type: 'any',
                    courses: ['WRIT101', 'ENG150']
                },
                {
                    type: 'credits',
                    minCredits: 22
                }
            ]
        },
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
        prerequisites: {
            type: 'any',
            courses: ['CSE210']
        },
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
        prerequisites: {
            groups: [
                {
                    type: 'any',
                    courses: ['CSE111', 'CIT124']
                },
                {
                    type: 'all',
                    courses: ['CSE212']
                }
            ]
        },
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
        prerequisites: {
            groups: [
                {
                    type: 'any',
                    courses: ['CSE111', 'CIT124']
                },
                {
                    type: 'all',
                    courses: ['CSE212']
                }
            ]
        },
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
        prerequisites: ['CSE210', 'WDD130', 'WDD430'],
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
        prerequisites: ['CSE310'],
        order: 41
    },
    {
        id: 'cse300',
        code: 'CSE300',
        name: 'Professional Readiness',
        credits: 1,
        status: 'not-started',
        prerequisites: {
            groups: [
                {
                    type: 'all',
                    courses: ['CSE212']
                },
                {
                    type: 'credits',
                    minCredits: 45
                }
            ]
        },
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
        prerequisites: {
            type: 'any',
            courses: ['CSE310', 'CS246']
        },
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
        requiredSubjects: ['PC101', 'PC102', 'PC103', 'CSEPC110'],
        creditRequirements: [
            {
                type: 'religion',
                minCredits: 2,
                description: 'Two Religion Courses'
            }
        ],
        status: 'not-requested' // not-requested, requested, received
    },
    {
        id: 'web-computer-programming',
        name: 'Web & Computer Programming Certificate',
        requiredSubjects: ['CSEPC110', 'WDD130', 'CSE111', 'CSE210', 'WDD131', 'WDD231'],
        status: 'not-requested'
    },
    {
        id: 'web-development',
        name: 'Web Development Certificate',
        requiredSubjects: ['ITM111', 'WDD330', 'CSE340', 'CSE341', 'WDD430'],
        status: 'not-requested'
    },
    {
        id: 'associate-degree',
        name: 'Associate Degree',
        requiredSubjects: [],
        creditRequirements: [
            {
                type: 'pathwayconnect',
                minCredits: 7,
                description: 'PathwayConnect Courses',
                courses: ['PC101', 'PC102', 'PC103']
            },
            {
                type: 'web-computer-programming-cert',
                minCredits: 12,
                description: 'Web & Computer Programming Certificate',
                courses: ['CSEPC110', 'WDD130', 'CSE111', 'CSE210', 'WDD131', 'WDD231']
            },
            {
                type: 'web-development-cert',
                minCredits: 15,
                description: 'Web Development Certificate',
                courses: ['ITM111', 'WDD330', 'CSE340', 'CSE341', 'WDD430']
            },
            {
                type: 'general-education',
                minCredits: 11,
                description: 'General Education Courses',
                courses: ['PC103', 'GS170', 'MATH108X', 'WRIT101', 'BUS301']
            },
            {
                type: 'religion-cornerstone',
                minCredits: 4,
                description: 'Religion Cornerstone Courses',
                courses: ['REL200A', 'REL200B', 'REL225A', 'REL225B', 'REL250A', 'REL250B', 'REL275A', 'REL275B']
            },
            {
                type: 'religion-elective',
                minCredits: 4,
                description: 'Religion Elective Courses',
                courses: ['REL200A', 'REL200B', 'REL225A', 'REL225B', 'REL250A', 'REL250B', 'REL275A', 'REL275B', 'REL280A', 'REL280B', 'REL290A', 'REL290B', 'REL333A', 'REL333B'],
                excludeUsedIn: ['religion-cornerstone']
            }
        ],
        status: 'not-requested'
    },
    {
        id: 'software-development',
        name: 'Software Development Certificate',
        requiredSubjects: ['CSE212', 'CSE270', 'CSE300', 'CSE310', 'CSE325', 'CSE370'],
        status: 'not-requested'
    },
    {
        id: 'bachelor-degree',
        name: "Bachelor's Degree",
        requiredSubjects: ['BUS321', 'CSE499', 'FCS160', 'GESCI110', 'HUM110', 'PUBH132', 'PEACE101'],
        requiredCertificates: ['associate-degree', 'software-development'],
        creditRequirements: [
            {
                type: 'religion-cornerstone',
                minCredits: 8,
                description: 'Religion Cornerstone Courses',
                courses: ['REL200A', 'REL200B', 'REL225A', 'REL225B', 'REL250A', 'REL250B', 'REL275A', 'REL275B']
            },
            {
                type: 'religion-elective',
                minCredits: 6,
                description: 'Religion Elective Courses',
                courses: ['REL200A', 'REL200B', 'REL225A', 'REL225B', 'REL250A', 'REL250B', 'REL275A', 'REL275B', 'REL280A', 'REL280B', 'REL290A', 'REL290B', 'REL333A', 'REL333B'],
                excludeUsedIn: ['religion-cornerstone']
            }
        ],
        status: 'not-requested'
    }
];

function loadData() {
    const savedSubjects = localStorage.getItem('studyTracker-subjects');
    const savedCertificates = localStorage.getItem('studyTracker-certificates');

    if (savedSubjects) {
        subjects = JSON.parse(savedSubjects);
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

function renderSubjects() {
    const container = document.getElementById('subjects-list');
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchSubjects').value.toLowerCase();

    let filteredSubjects = [...subjects];

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
                ${(Array.isArray(subject.prerequisites) && subject.prerequisites.length > 0) || (subject.prerequisites && typeof subject.prerequisites === 'object' && ((subject.prerequisites.courses && subject.prerequisites.courses.length > 0) || (subject.prerequisites.groups && subject.prerequisites.groups.length > 0))) ? `
                    <div class="prereqs">
                        ${prereqsInfo.type === 'groups' ?
                    prereqsInfo.groups.map((group, index) => {
                        if (group.type === 'credits') {
                            return `
                                        <strong>Prerequisite ${index + 1} (Credits):</strong><br>
                                        <span class="prereq-tag ${group.completed ? 'completed' : 'missing'}">
                                            ${group.currentCredits}/${group.minCredits} credits earned
                                        </span>
                                        ${index < prereqsInfo.groups.length - 1 ? '<br><br>' : ''}
                                    `;
                        } else {
                            return `
                                        <strong>Prerequisite ${index + 1} ${group.type === 'any' ? '(ANY of)' : '(ALL of)'}:</strong><br>
                                        ${group.courses.map(prereq => `
                                            <span class="prereq-tag ${prereq.completed ? 'completed' : 'missing'}">
                                                ${prereq.code}
                                            </span>
                                        `).join('')}
                                        ${index < prereqsInfo.groups.length - 1 ? '<br><br>' : ''}
                                    `;
                        }
                    }).join('')
                    : `
                                <strong>Prerequisites ${prereqsInfo.type === 'any' ? '(ANY of)' : '(ALL of)'}:</strong><br>
                                ${prereqsInfo.courses.map(prereq => `
                                    <span class="prereq-tag ${prereq.completed ? 'completed' : 'missing'}">
                                        ${prereq.code}
                                    </span>
                                `).join('')}
                            `
                }
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

function getTotalCompletedCredits() {
    return subjects.reduce((total, subject) => {
        return total + (subject.status === 'completed' ? subject.credits : 0);
    }, 0);
}

function canStartSubject(subject) {
    if (subject.status === 'completed') return true;

    if (Array.isArray(subject.prerequisites)) {
        return subject.prerequisites.every(prereqCode => {
            const prereqSubject = subjects.find(s => s.code === prereqCode);
            return prereqSubject && prereqSubject.status === 'completed';
        });
    }

    if (subject.prerequisites && typeof subject.prerequisites === 'object') {
        if (subject.prerequisites.type) {
            const { type, courses } = subject.prerequisites;
            if (type === 'any') {
                return courses.some(prereqCode => {
                    const prereqSubject = subjects.find(s => s.code === prereqCode);
                    return prereqSubject && prereqSubject.status === 'completed';
                });
            } else if (type === 'all') {
                return courses.every(prereqCode => {
                    const prereqSubject = subjects.find(s => s.code === prereqCode);
                    return prereqSubject && prereqSubject.status === 'completed';
                });
            }
        } else if (subject.prerequisites.groups) {
            return subject.prerequisites.groups.every(group => {
                if (group.type === 'any') {
                    return group.courses.some(prereqCode => {
                        const prereqSubject = subjects.find(s => s.code === prereqCode);
                        return prereqSubject && prereqSubject.status === 'completed';
                    });
                } else if (group.type === 'all') {
                    return group.courses.every(prereqCode => {
                        const prereqSubject = subjects.find(s => s.code === prereqCode);
                        return prereqSubject && prereqSubject.status === 'completed';
                    });
                } else if (group.type === 'credits') {
                    return getTotalCompletedCredits() >= group.minCredits;
                }
                return false;
            });
        }
    }

    return true;
}

function getPrerequisitesInfo(subject) {
    if (Array.isArray(subject.prerequisites)) {
        return {
            type: 'all',
            courses: subject.prerequisites.map(prereqCode => {
                const prereqSubject = subjects.find(s => s.code === prereqCode);
                return {
                    code: prereqCode,
                    completed: prereqSubject ? prereqSubject.status === 'completed' : false
                };
            })
        };
    }

    if (subject.prerequisites && typeof subject.prerequisites === 'object') {
        if (subject.prerequisites.groups) {
            return {
                type: 'groups',
                groups: subject.prerequisites.groups.map(group => {
                    if (group.type === 'credits') {
                        return {
                            type: 'credits',
                            minCredits: group.minCredits,
                            currentCredits: getTotalCompletedCredits(),
                            completed: getTotalCompletedCredits() >= group.minCredits
                        };
                    } else {
                        return {
                            type: group.type,
                            courses: group.courses.map(prereqCode => {
                                const prereqSubject = subjects.find(s => s.code === prereqCode);
                                return {
                                    code: prereqCode,
                                    completed: prereqSubject ? prereqSubject.status === 'completed' : false
                                };
                            })
                        };
                    }
                })
            };
        } else if (subject.prerequisites.type && subject.prerequisites.courses) {
            const { type, courses } = subject.prerequisites;
            return {
                type: type || 'all',
                courses: courses.map(prereqCode => {
                    const prereqSubject = subjects.find(s => s.code === prereqCode);
                    return {
                        code: prereqCode,
                        completed: prereqSubject ? prereqSubject.status === 'completed' : false
                    };
                })
            };
        }
    }

    return { type: 'all', courses: [] };
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

function renderCertificates() {
    const container = document.getElementById('certificates-list');

    container.innerHTML = certificates.map(cert => {
        const progress = getCertificateProgress(cert);
        const canRequest = progress.completed === progress.total && cert.status === 'not-requested';

        return `
            <div class="certificate-card">
                <div class="certificate-header">
                    <span class="certificate-name">${cert.name}</span>
                    <span class="certificate-progress">${progress.completed}/${progress.total} requirements</span>
                </div>
                <div class="certificate-subjects">
                    <h4>Required Subjects:</h4>
                    ${cert.requiredSubjects.map(subjectCode => {
            const subject = subjects.find(s => s.code === subjectCode);
            const isCompleted = subject ? subject.status === 'completed' : false;
            return `<span class="subject-requirement ${isCompleted ? 'completed' : ''}">${subjectCode}</span>`;
        }).join('')}
                    
                    ${progress.requiredCertificates ? `
                        <h4>Required Certificates:</h4>
                        ${progress.requiredCertificates.map(certId => {
            const reqCert = certificates.find(c => c.id === certId);
            if (!reqCert) return '';
            const reqProgress = getCertificateProgress(reqCert);
            const isCompleted = reqProgress.completed === reqProgress.total;
            return `<span class="subject-requirement ${isCompleted ? 'completed' : ''}">${reqCert.name}</span>`;
        }).join('')}
                    ` : ''}
                    
                    ${progress.creditRequirements ? `
                        <h4>Credit Requirements:</h4>
                        ${progress.creditRequirements.map((req, index) => {
            if (req.type === 'religion') {
                const religionCredits = subjects
                    .filter(s => s.code.startsWith('REL') && s.status === 'completed')
                    .reduce((total, s) => total + s.credits, 0);
                const isCompleted = religionCredits >= req.minCredits;
                const displayCredits = Math.min(religionCredits, req.minCredits);
                return `<span class="subject-requirement ${isCompleted ? 'completed' : ''}">${req.description}: ${displayCredits}/${req.minCredits} credits</span>`;
            } else if (req.type === 'religion-cornerstone' || req.type === 'religion-elective' ||
                req.type === 'pathwayconnect' || req.type === 'web-computer-programming-cert' ||
                req.type === 'web-development-cert' || req.type === 'general-education') {

                // Calculate available credits considering exclusions
                const displayUsedCourses = new Set();

                // Process requirements in order to calculate what's available for this specific requirement
                const sortedReqs = progress.creditRequirements.sort((a, b) => {
                    if (a.type === 'religion-cornerstone') return -1;
                    if (b.type === 'religion-cornerstone') return 1;
                    return 0;
                });

                for (let i = 0; i < sortedReqs.length; i++) {
                    const currentReq = sortedReqs[i];
                    if (currentReq === req) break; // Stop when we reach the current requirement

                    if (currentReq.type === 'religion-cornerstone' || currentReq.type === 'religion-elective' ||
                        currentReq.type === 'pathwayconnect' || currentReq.type === 'web-computer-programming-cert' ||
                        currentReq.type === 'web-development-cert' || currentReq.type === 'general-education') {

                        const prevAvailableSubjects = subjects.filter(s =>
                            currentReq.courses.includes(s.code) &&
                            s.status === 'completed' &&
                            !displayUsedCourses.has(s.code)
                        );

                        const prevCreditsEarned = prevAvailableSubjects.reduce((total, s) => total + s.credits, 0);

                        // Always allocate available credits to higher priority requirements, even if not fully satisfied
                        if (prevCreditsEarned > 0) {
                            let creditsToTake = Math.min(prevCreditsEarned, currentReq.minCredits);
                            prevAvailableSubjects.forEach(s => {
                                if (creditsToTake > 0) {
                                    displayUsedCourses.add(s.code);
                                    creditsToTake -= s.credits;
                                }
                            });
                        }
                    }
                }

                // Now calculate available credits for current requirement
                const availableSubjects = subjects.filter(s =>
                    req.courses.includes(s.code) &&
                    s.status === 'completed' &&
                    !displayUsedCourses.has(s.code)
                );
                const creditsEarned = availableSubjects.reduce((total, s) => total + s.credits, 0);
                const isCompleted = creditsEarned >= req.minCredits;
                const displayCredits = Math.min(creditsEarned, req.minCredits);

                // Show which courses are being used for religion requirements
                let courseDetails = '';
                if (req.type === 'religion-cornerstone' || req.type === 'religion-elective') {
                    const usedCourses = [];
                    let creditsToTake = Math.min(creditsEarned, req.minCredits);
                    availableSubjects.forEach(s => {
                        if (creditsToTake > 0) {
                            usedCourses.push(s.code);
                            creditsToTake -= s.credits;
                        }
                    });
                    if (usedCourses.length > 0) {
                        courseDetails = `<br><small style="color: #fff;">Using: ${usedCourses.join(', ')}</small>`;
                    } else if (availableSubjects.length === 0 && req.type === 'religion-elective') {
                        courseDetails = `<br><small style="color: #fff;">No remaining courses (all allocated to cornerstone)</small>`;
                    }
                }

                return `<span class="subject-requirement ${isCompleted ? 'completed' : ''}">${req.description}: ${displayCredits}/${req.minCredits} credits${courseDetails}</span>`;
            }
            return '';
        }).join('')}
                    ` : ''}
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
    const courseTotal = certificate.requiredSubjects.length;
    const courseCompleted = certificate.requiredSubjects.filter(subjectCode => {
        const subject = subjects.find(s => s.code === subjectCode);
        return subject && subject.status === 'completed';
    }).length;

    let certTotal = 0;
    let certCompleted = 0;

    if (certificate.requiredCertificates) {
        certTotal = certificate.requiredCertificates.length;
        certCompleted = certificate.requiredCertificates.filter(certId => {
            const cert = certificates.find(c => c.id === certId);
            if (!cert) return false;
            const progress = getCertificateProgress(cert);
            return progress.completed === progress.total;
        }).length;
    }

    let creditTotal = 0;
    let creditCompleted = 0;
    const usedCourses = new Set();

    if (certificate.creditRequirements) {
        creditTotal = certificate.creditRequirements.length;

        // Process requirements in order: cornerstone first, then electives
        const sortedReqs = certificate.creditRequirements.sort((a, b) => {
            if (a.type === 'religion-cornerstone') return -1;
            if (b.type === 'religion-cornerstone') return 1;
            return 0;
        });

        creditCompleted = sortedReqs.filter(req => {
            if (req.type === 'religion') {
                const religionCredits = subjects
                    .filter(s => s.code.startsWith('REL') && s.status === 'completed')
                    .reduce((total, s) => total + s.credits, 0);
                return religionCredits >= req.minCredits;
            } else if (req.type === 'religion-cornerstone' || req.type === 'religion-elective' ||
                req.type === 'pathwayconnect' || req.type === 'web-computer-programming-cert' ||
                req.type === 'web-development-cert' || req.type === 'general-education') {

                const availableSubjects = subjects.filter(s =>
                    req.courses.includes(s.code) &&
                    s.status === 'completed' &&
                    !usedCourses.has(s.code)
                );

                const creditsEarned = availableSubjects.reduce((total, s) => total + s.credits, 0);

                // Always allocate available credits to higher priority requirements, even if not fully satisfied
                if (creditsEarned > 0) {
                    let creditsToTake = Math.min(creditsEarned, req.minCredits);
                    availableSubjects.forEach(s => {
                        if (creditsToTake > 0) {
                            usedCourses.add(s.code);
                            creditsToTake -= s.credits;
                        }
                    });
                    return creditsEarned >= req.minCredits; // Only count as completed if fully satisfied
                }
            }
            return false;
        }).length;
    }

    const totalRequirements = courseTotal + certTotal + creditTotal;
    const completedRequirements = courseCompleted + certCompleted + creditCompleted;

    return {
        completed: completedRequirements,
        total: totalRequirements,
        courseCompleted,
        courseTotal,
        certCompleted,
        certTotal,
        creditCompleted,
        creditTotal,
        creditRequirements: certificate.creditRequirements,
        requiredCertificates: certificate.requiredCertificates
    };
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