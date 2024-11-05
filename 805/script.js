// Questions pool
const questions = [
  { type: "text", question: "What is your name?" },
  { type: "text", question: "Where do you live?" },
  { type: "radio", question: "Do you enjoy coding?", options: ["Yes", "No"] },
  { type: "select", question: "What is your favorite programming language?", options: ["JavaScript", "Python", "Java", "C++"] },
  { type: "textarea", question: "Describe your dream job." },
  { type: "text", question: "What is your favorite book?" },
  { type: "radio", question: "Do you like sports?", options: ["Yes", "No"] },
  { type: "text", question: "What is your favorite food?" }
];

// Select 5 random questions
function getRandomQuestions() {
  let selectedQuestions = [];
  while (selectedQuestions.length < 5) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    if (!selectedQuestions.includes(question)) {
      selectedQuestions.push(question);
    }
  }
  return selectedQuestions;
}

// Render questions and form elements dynamically
function displayQuestions() {
  const questionContainer = document.getElementById("questionContainer");
  const selectedQuestions = getRandomQuestions();

  selectedQuestions.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Create question label
    const label = document.createElement("label");
    label.innerText = `${index + 1}. ${item.question}`;
    questionDiv.appendChild(label);

    // Create form element based on question type
    if (item.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.required = true;
      input.name = `q${index}`;
      questionDiv.appendChild(input);
    } else if (item.type === "radio") {
      item.options.forEach(option => {
        const radioLabel = document.createElement("label");
        radioLabel.style.display = "block";
        
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `q${index}`;
        radio.value = option;
        radio.required = true;
        
        radioLabel.appendChild(radio);
        radioLabel.append(option);
        questionDiv.appendChild(radioLabel);
      });
    } else if (item.type === "select") {
      const select = document.createElement("select");
      select.required = true;
      select.name = `q${index}`;
      
      item.options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.innerText = option;
        select.appendChild(opt);
      });
      
      questionDiv.appendChild(select);
    } else if (item.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.required = true;
      textarea.name = `q${index}`;
      textarea.rows = 3;
      questionDiv.appendChild(textarea);
    }

    questionContainer.appendChild(questionDiv);
  });
}

// Update progress bar
function updateProgressBar() {
  const form = document.getElementById("surveyForm");
  const progressBar = document.getElementById("progressBar");
  const totalFields = form.querySelectorAll("input, select, textarea").length;
  const filledFields = Array.from(form.elements).filter(input => input.value.trim()).length;
  const progress = (filledFields / totalFields) * 100;
  
  progressBar.style.width = `${progress}%`;
}

// Handle form submission
document.getElementById("surveyForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const answers = Array.from(formData.entries()).map(([key, value]) => value);
  document.getElementById("result").innerText = "Thank you for completing the survey!";
  console.log("User Answers:", answers); // Here you could send answers to a server
});

// Initialize form and progress
displayQuestions();
document.getElementById("surveyForm").addEventListener("input", updateProgressBar);
