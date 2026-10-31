const quizData = {
    easy: [
        { question: "What does a red traffic light mean?", options: ["Go", "Stop", "Speed up", "Turn left"], answer: 1 },
        { question: "In India, vehicles generally drive on which side of the road?", options: ["Right", "Left", "Middle", "Any side"], answer: 1 },
        { question: "What is a zebra crossing used for?", options: ["Parking", "Pedestrians crossing", "Overtaking", "Cycling"], answer: 1 },
        { question: "What should a two-wheeler rider wear?", options: ["Cap", "Helmet", "Scarf", "Sunglasses only"], answer: 1 },
        { question: "What does a green traffic light mean?", options: ["Stop", "Wait", "Proceed if safe", "Reverse"], answer: 2 },
        { question: "What should you do before crossing a road?", options: ["Run quickly", "Look both ways", "Use your phone", "Close your eyes"], answer: 1 },
        { question: "What should car passengers wear?", options: ["Seat belt", "Helmet", "Gloves", "Cap"], answer: 0 },
        { question: "Which vehicle should be given priority when using emergency signals?", options: ["Private car", "Delivery van", "Ambulance", "Motorcycle"], answer: 2 },
        { question: "What does a STOP sign instruct drivers to do?", options: ["Slow down only", "Stop completely", "Speed up", "Park"], answer: 1 },
        { question: "Is using a mobile phone while driving safe?", options: ["Yes", "No", "Only at turns", "Only at night"], answer: 1 }
    ],
    medium: [
        { question: "What does a yellow traffic light generally indicate?", options: ["Speed up", "Prepare to stop", "Reverse", "Park"], answer: 1 },
        { question: "When should you use indicators?", options: ["While turning or changing lanes", "Only at night", "Only on highways", "Never"], answer: 0 },
        { question: "Why should you maintain a safe distance from the vehicle ahead?", options: ["To overtake", "To allow safe braking", "To save fuel", "To block traffic"], answer: 1 },
        { question: "What should you check before changing lanes?", options: ["Only the speedometer", "Mirrors and blind spots", "Only the horn", "The radio"], answer: 1 },
        { question: "What shape is commonly used for warning signs?", options: ["Triangle", "Circle", "Rectangle", "Oval"], answer: 0 },
        { question: "What should you do while driving in heavy rain?", options: ["Increase speed", "Reduce speed and increase distance", "Use high speed", "Brake suddenly"], answer: 1 },
        { question: "What is a blind spot?", options: ["A damaged mirror", "An area not easily visible to the driver", "A road sign", "A traffic signal"], answer: 1 },
        { question: "What should drivers do near a school zone?", options: ["Drive faster", "Slow down and watch for children", "Use the horn continuously", "Overtake"], answer: 1 },
        { question: "What do road lane markings help drivers understand?", options: ["Vehicle colour", "Lane boundaries and road movement", "Fuel level", "Engine condition"], answer: 1 },
        { question: "What should you do if your vehicle starts skidding?", options: ["Brake harshly", "Stay calm and steer carefully", "Accelerate suddenly", "Close your eyes"], answer: 1 }
    ],
    hard: [
        { question: "Is overtaking near a blind turn safe?", options: ["Yes, always", "No, visibility is limited", "Only at night", "Only with a horn"], answer: 1 },
        { question: "What should you do at an uncontrolled intersection?", options: ["Rush through", "Slow down and give way according to right-of-way rules", "Ignore other vehicles", "Stop in the middle"], answer: 1 },
        { question: "What is defensive driving?", options: ["Driving aggressively", "Anticipating hazards and driving carefully", "Driving at maximum speed", "Ignoring road signs"], answer: 1 },
        { question: "Why should you avoid staying in a heavy vehicle's blind spot?", options: ["It uses more fuel", "Its driver may not see your vehicle", "It blocks the road", "It changes colour"], answer: 1 },
        { question: "What should you do at an unmanned railway crossing?", options: ["Cross without checking", "Stop, look and listen before crossing", "Race the train", "Park on the tracks"], answer: 1 },
        { question: "Why is correct tyre pressure important?", options: ["It improves safety and vehicle control", "It changes the vehicle colour", "It removes road signs", "It increases traffic"], answer: 0 },
        { question: "What is the safest approach when driving in dense fog?", options: ["Use high speed", "Reduce speed and use suitable lights", "Follow closely", "Switch off all lights"], answer: 1 },
        { question: "What is tailgating?", options: ["Driving too close behind another vehicle", "Parking correctly", "Using indicators", "Driving in a lane"], answer: 0 },
        { question: "How should you drive downhill?", options: ["Use a suitable lower gear and control speed", "Switch off the engine", "Accelerate continuously", "Drive in neutral"], answer: 0 },
        { question: "What should you do if you feel sleepy while driving?", options: ["Increase speed", "Stop somewhere safe and rest", "Play loud music and continue", "Ignore it"], answer: 1 }
    ]
};
let currentLevel = "";
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
function hideAllSections() {
    document.querySelectorAll("body > section").forEach(section => {
        section.style.display = "none";
    });
}
function showDifficulty() {
    hideAllSections();
    document.getElementById("difficulty").style.display = "block";
    window.scrollTo(0, 0);
}
function startQuiz(level) {
    currentLevel = level;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    hideAllSections();
    document.getElementById("quiz").style.display = "block";
    showQuestion();
    window.scrollTo(0, 0);
}
function showQuestion() {
    const questionData = quizData[currentLevel][currentQuestion];
    selectedAnswer = null;
    document.getElementById("level-name").textContent =
        currentLevel.toUpperCase() + " LEVEL";
    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) + " of 10";
    document.getElementById("progress-bar").style.width =
        ((currentQuestion + 1) / 10) * 100 + "%";
    document.getElementById("question").textContent =
        questionData.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.onclick = function () {
            selectedAnswer = index;
            document.querySelectorAll(".option-button").forEach(btn => {
                btn.classList.remove("selected");
            });
            button.classList.add("selected");
        };
        optionsContainer.appendChild(button);
    });
    document.getElementById("next-button").textContent =
        currentQuestion === 9 ? "Finish Quiz" : "Next";
}
function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an answer first!");
        return;
    }
    const questionData = quizData[currentLevel][currentQuestion];
    if (selectedAnswer === questionData.answer) {
        score++;
    }
    userAnswers.push({
        question: questionData.question,
        selected: questionData.options[selectedAnswer],
        correct: questionData.options[questionData.answer],
        isCorrect: selectedAnswer === questionData.answer
    });
    currentQuestion++;
    if (currentQuestion < 10) {
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    hideAllSections();
    document.getElementById("result").style.display = "block";
    document.getElementById("final-score").textContent =
        "Your Score: " + score + " / 10";
    let feedback = "";
    if (score >= 9) {
        feedback = "Excellent! You have a very good understanding of traffic rules.";
    } else if (score >= 7) {
        feedback = "Great job! Keep learning and practising.";
    } else if (score >= 5) {
        feedback = "Good effort! Revise the traffic rules and try again.";
    } else {
        feedback = "Keep practising! Learning traffic rules helps everyone stay safe.";
    }
    document.getElementById("feedback").textContent = feedback;
    const reviewContainer = document.getElementById("answer-review");
    reviewContainer.innerHTML = "";
    const wrongAnswers = userAnswers.filter(answer => !answer.isCorrect);
    if (wrongAnswers.length === 0) {
        reviewContainer.textContent = "Perfect! You answered every question correctly.";
    } else {
        wrongAnswers.forEach(answer => {
            const item = document.createElement("div");
            item.className = "review-item";
            const question = document.createElement("p");
            question.textContent = answer.question;
            const yourAnswer = document.createElement("p");
            yourAnswer.textContent = "Your answer: " + answer.selected;
            const correctAnswer = document.createElement("p");
            correctAnswer.textContent = "Correct answer: " + answer.correct;
            item.appendChild(question);
            item.appendChild(yourAnswer);
            item.appendChild(correctAnswer);

            reviewContainer.appendChild(item);
        });
    }
    window.scrollTo(0, 0);
}
hideAllSections();
document.getElementById("home").style.display = "flex";