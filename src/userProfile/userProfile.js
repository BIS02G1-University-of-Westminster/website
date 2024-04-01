const sections = [
    {
        id: 0,
        Completed: false,
        Label: "Personal Details",
        Questions: [
            {Label: "Full Name", Value: ""},
            {Label: "Date of Birth (DD/MM/YYYY)", Value: ""},
            {Label: "Country of Residence", Value: ""},
            {Label: "Email address", Value: ""}
        ]
    },
    {
        id: 1,
        Completed: false,
        Label: "Educational Goals",
        Questions: [
            {Label: "University Attended", Value: ""},
            {Label: "Highest Degree", Value: ""},
            {Label: "Area of Study", Value: ""},
            {Label: "Completion Year", Value: ""},
        ]
    },
    {
        id: 2,
        Completed: false,
        Label: "Additional Information",
        Questions: [
            {Label: "Volunteer Experience", Value: ""},
            {Label: "Goal for Joining us", Value: ""},
            {Label: "What changes do you want to see in education?", Value: ""}
        ]
    }
];

let currentSection = 0;
let currentQuestion = 0;
const totalQuestions = sections.reduce((total, section) => total + section.Questions.length, 0);
let answeredQuestions = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    document.getElementById('previousButton').addEventListener('click', () => previousQuestion());
    document.getElementById('nextButton').addEventListener('click', () => nextQuestion());
});

function initializeProfile() {
    console.log('##initializeProfile')
    displayCurrentQuestion();
    generateSectionList(); 
    updatePercentageIndicator();
}

function nextQuestion() {
    console.log('##attempting to load next question');

    const userInput = document.getElementById('userInput').value;
    sections[currentSection].Questions[currentQuestion].Value = userInput;
    answeredQuestions++;

    currentQuestion++;
    if (currentQuestion >= sections[currentSection].Questions.length) {
        currentQuestion = 0;
        sections[currentSection].Completed = true 
        updateSectionProgressIndicator();
        currentSection++;
        if (currentSection >= sections.length) {
            displayProfile();
            return;
        }
    }
    displayCurrentQuestion();
    updatePercentageIndicator();
}

function previousQuestion() {
    console.log('##attempting to load previous question');

    if (currentQuestion > 0) {
        currentQuestion--;
    } else if (currentSection > 0) {
        currentSection--;
        currentQuestion = sections[currentSection].Questions.length - 1; 
    }
    displayCurrentQuestion();
    updatePercentageIndicator();
}

function displayAllQuestions() {
    const allQuestionsDiv = document.getElementById('allQuestions');
    allQuestionsDiv.innerHTML = '';
    sections[currentSection].Questions.forEach((q) => {
        const questionText = document.createElement('p');
        questionText.textContent = `${q.Label}: ${q.Value || ' '}`;
        allQuestionsDiv.appendChild(questionText);
    });
}

function displayCurrentQuestion() {
    console.log('##inside display current Question');
    console.log('##current question index: '+currentQuestion);
    if (0 == currentSection && 0 == currentQuestion) {
        console.log('##trying to make previous button disabled');
        document.getElementById('previousButton').setAttribute('disabled', '');
    } else {
        document.getElementById('previousButton').removeAttribute('disabled', '');
    }

    if (currentSection >= (sections.length - 1) && currentQuestion >= (sections[currentSection].Questions.length - 1)) {
        document.getElementById('nextButton').innerHTML = 'Finish';
    }

    document.getElementById('sectionName').textContent = sections[currentSection].Label;
    document.getElementById('questionText').textContent = `${currentQuestion + 1}/${sections[currentSection].Questions.length}: ${sections[currentSection].Questions[currentQuestion].Label}`;
    document.getElementById('answerOptions').innerHTML = `<input type="text" id="userInput" placeholder="Your answer...">`;

    displayAllQuestions();
}

function generateSectionList() {
    const sectionList = document.getElementById('sectionList');
    sectionList.innerHTML = ''; 
    sections.forEach(section => {
        const listItem = document.createElement('li');
        listItem.textContent = section.Label;
        sectionList.appendChild(listItem);
    });
    console.log('## html section list: ' ,sectionList)
}

function updatePercentageIndicator() {
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    document.getElementById('percentageCompleted').textContent = percentage + '% completed';

}

function updateSectionProgressIndicator() {
    
    const sectionListItems = document.getElementById('sectionList').children;
    
    let i = sections[currentSection].id
    if (sections[currentSection].Completed == true) {
        sectionListItems[i].classList.add('completed');
    } else {
        sectionListItems[i].classList.remove('completed');
    }
}

function displayProfile() {
    console.log('##displayProfile')
    const profileSection = document.createElement('div');
    sections.forEach((section) => {
        const sectionDiv = document.createElement('div');
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.Label;
        sectionDiv.appendChild(sectionTitle);
        section.Questions.forEach((question) => {
            const questionPara = document.createElement('p');
            questionPara.textContent = `${question.Label}: ${question.Value}`;
            sectionDiv.appendChild(questionPara);
        });
        profileSection.appendChild(sectionDiv);
    });
    document.getElementById('userProfileContainer').innerHTML = '';
    document.getElementById('userProfileContainer').appendChild(profileSection);
}

