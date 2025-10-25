// ===== WEATHER APP =====
async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("weather-result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "462fddb4c940783008d9d541e49ae05a"; // OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>City not found. Try again.</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p>Error fetching data.</p>`;
  }
}

// ===== QUIZ APP =====
const quizData = [
  { question: "What does HTML stand for?", a: "Hyperlinks and Text Markup Language", b: "Home Tool Markup Language", c: "Hyper Text Markup Language", correct: "c" },
  { question: "Which language is used for styling web pages?", a: "CSS", b: "HTML", c: "Python", correct: "a" },
  { question: "Inside which HTML element do we put JavaScript?", a: "<javascript>", b: "<script>", c: "<js>", correct: "b" },
  { question: "Which company developed Java?", a: "Microsoft", b: "Sun Microsystems", c: "Google", correct: "b" },
  { question: "Which keyword is used to define a constant in JavaScript?", a: "let", b: "var", c: "const", correct: "c" }
];

let currentQuiz = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const submitBtn = document.getElementById("submit");

loadQuiz();

function loadQuiz() {
  selectedAnswer = null;
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  options[0].innerText = currentQuizData.a;
  options[1].innerText = currentQuizData.b;
  options[2].innerText = currentQuizData.c;

  options.forEach(option => {
    option.classList.remove("selected", "correct", "wrong");
    option.disabled = false;
  });
}

// Option click
options.forEach(option => {
  option.addEventListener("click", () => {
    selectedAnswer = option.id;
    options.forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");
  });
});

// Submit
submitBtn.addEventListener("click", () => {
  if (!selectedAnswer) return;

  const currentQuizData = quizData[currentQuiz];

  options.forEach(option => {
    if (option.id === currentQuizData.correct) option.classList.add("correct");
    if (option.id === selectedAnswer && selectedAnswer !== currentQuizData.correct) option.classList.add("wrong");
    option.disabled = true;
  });

  if (selectedAnswer === currentQuizData.correct) score++;

  setTimeout(() => {
    currentQuiz++;
    if (currentQuiz < quizData.length) loadQuiz();
    else {
      document.getElementById("quiz").innerHTML = `
        <h2>You answered ${score}/${quizData.length} correctly 🎉</h2>
        <button onclick="location.reload()">Restart Quiz</button>
      `;
    }
  }, 800);
});





