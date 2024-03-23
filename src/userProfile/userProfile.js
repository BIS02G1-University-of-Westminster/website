// userProfile.js
const sections = [
    {
        Label: "Personal Details",
        Questions: [
            {Label: "What's your name?", Value: ""},
            {Label: "What's your date of birth?", Value: ""},
            {Label: "What's your email address?", Value: ""}
        ]
    },
    {
        Label: "Educational Goals",
        Questions: [
            {Label: "What's your highest educational attainment?", Value: ""},
            {Label: "What field of study are you interested in?", Value: ""},
            {Label: "What educational goal are you aiming for this year?", Value: ""}
        ]
    },
    {
        Label: "Other Information",
        Questions: [
            {Label: "What are your hobbies?", Value: ""},
            {Label: "What skills would you like to learn?", Value: ""},
            {Label: "Any other details you want to share?", Value: ""}
        ]
    }
];

let currentSection = 0;
let currentQuestion = 0;
let totalQuestions = sections.reduce((total, section) => total + section.Questions.length, 0);
let answeredQuestions = 0;

/// Function to initialize the profile creation process
function initializeProfile() {
    displayCurrentQuestion();
    updateProgressIndicator();
}

// Update the nextQuestion function to also update all questions display
function nextQuestion() {
    console.log('##attempting to load next question');

    const userInput = document.getElementById('userInput').value;
    sections[currentSection].Questions[currentQuestion].Value = userInput;
    answeredQuestions++;

    currentQuestion++;
    if (currentQuestion >= sections[currentSection].Questions.length) {
        currentQuestion = 0;
        currentSection++;
        if (currentSection >= sections.length) {
            alert('You have completed all sections.');
            displayProfile(); // Function to display completed profile
            return;
        }
    }
    displayCurrentQuestion();
    updateProgressIndicator();
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
    updateProgressIndicator();
}

// New function to display all questions and their current answers for the current section
function displayAllQuestions() {
    const allQuestionsDiv = document.getElementById('allQuestions');
    allQuestionsDiv.innerHTML = ''; // Clear previous content
    sections[currentSection].Questions.forEach((q) => {
        const questionText = document.createElement('p');
        questionText.textContent = `${q.Label}: ${q.Value || ' '}`; // Show the label and value, or a placeholder if no value
        allQuestionsDiv.appendChild(questionText);
    });
}

// Function to display current question and update UI elements
function displayCurrentQuestion() {
    console.log('##inside display current Question');
    console.log('##current question index: '+currentQuestion);
    if (currentSection < sections.length) {
        if (0 == currentSection && 0 == currentQuestion) {
            console.log('##trying to make previous button disabled');
            document.getElementById('previousButton').setAttribute('disabled', '');
        } else {
            document.getElementById('previousButton').removeAttribute('disabled', '');
        }

        document.getElementById('sectionName').textContent = sections[currentSection].Label;
        document.getElementById('questionText').textContent = `${currentQuestion + 1}/${totalQuestions}: ${sections[currentSection].Questions[currentQuestion].Label}`;
        document.getElementById('answerOptions').innerHTML = `<input type="text" id="userInput" placeholder="Your answer...">`;


        displayAllQuestions(); // Call to new function to display all questions
    }
}

// Function to update the progress bar and section list
function updateProgressIndicator() {
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    document.getElementById('percentageCompleted').textContent = percentage + '% completed';
    const sectionList = document.getElementById('sectionList');
    sectionList.innerHTML = '';
    sections.forEach((section, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = section.Label;
        if (index < currentSection || (index === currentSection && currentQuestion === 0 && answeredQuestions > 0)) {
            listItem.classList.add('completed');
        }
        sectionList.appendChild(listItem);
    });
}

// Function to display completed user profile
function displayProfile() {
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

// Add event listeners for the Next and Skip buttons
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    console.log('##listening for clicks');
    document.getElementById('previousButton').addEventListener('click', () => previousQuestion());
    document.getElementById('nextButton').addEventListener('click', () => nextQuestion());
});
