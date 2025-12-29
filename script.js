// word list
const words = ["BARCELONA", "CORK", "PERTH", "ESSEX", "HANOI", "DANANG"];
let currentLevel = 0;
let score = 0;
let word = words[currentLevel];

// confetti function
function launchConfetti() {
  const duration = 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount: particleCount,
      origin: {
        x: randomInRange(0.1, 0.9),
        y: Math.random() - 0.2
      }
    }));
  }, 250);
}

// sounds
const soundCorrect = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");
const soundPlace = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

// hints
const hints = {
  "BARCELONA": "<img src='https://flagcdn.com/w40/es.png'> Spain",
  "CORK": "<img src='https://flagcdn.com/w40/ie.png'> Ireland",
  "PERTH": "<img src='https://flagcdn.com/w40/au.png'> Australia",
  "ESSEX": "<img src='https://flagcdn.com/w40/gb.png'> United Kingdom",
  "HANOI": "<img src='https://flagcdn.com/w40/vn.png'> Vietnam",
  "DANANG": "<img src='https://flagcdn.com/w40/vn.png'> Vietnam"
};

// themes
const cityThemes = {
  "BARCELONA": { bg: "#f4a261", letter: "#264653" },
  "CORK": { bg: "#2a9d8f", letter: "#e9c46a" },
  "PERTH": { bg: "#90e0ef", letter: "#0077b6" },
  "ESSEX": { bg: "#ddbea9", letter: "#6b705c" },
  "HANOI": { bg: "#ef233c", letter: "#f9dcc4" },
  "DANANG": { bg: "#0077b6", letter: "#ff9f1c" }
};

let gameOver = false;
let time = 0;
let timerInterval = null;

const gameArea = document.getElementById("game-area");
const slotsContainer = document.getElementById("slots");

function updateDisplay() {
  document.getElementById("level-display").innerText =
    "Level: " + (currentLevel + 1) + " / " + words.length;
  document.getElementById("score-display").innerText =
    "Score: " + score;
}

function updateTimerDisplay() {
  document.getElementById("timer-display").innerText =
    "Time: " + time + "s";
}

function applyTheme() {
  const theme = cityThemes[word];
  document.body.style.background = theme.bg;
  document.getElementById("hint").innerHTML = hints[word];
  document.querySelectorAll(".letter").forEach(function(l) {
    l.style.background = theme.letter;
  });
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function() {
    time++;
    updateTimerDisplay();
  }, 1000);
}

function createSlots() {
  slotsContainer.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slotsContainer.appendChild(slot);
  }
}

function createLetters() {
  for (let i = 0; i < word.length; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.className = "letter";
    letterDiv.innerText = word[i];
    letterDiv.style.left = Math.random() * 740 + "px";
    letterDiv.style.top = Math.random() * 200 + "px";
    gameArea.appendChild(letterDiv);
  }
}

function setupLevel() {
  word = words[currentLevel];
  createSlots();
  createLetters();
  applyTheme();
  updateDisplay();
  gameOver = false;
  time = 0;
  updateTimerDisplay();
  startTimer();
}

setupLevel();

function moveLetters() {
  if (gameOver) return;
  const letters = document.querySelectorAll(".letter");
  letters.forEach(function(letter) {
    if (letter.dataset.frozen === "true") return;
    let x = parseFloat(letter.style.left);
    let y = parseFloat(letter.style.top);
    x += Math.random() * 6 - 3;
    y += Math.random() * 6 - 3;
    x = Math.max(0, Math.min(740, x));
    y = Math.max(0, Math.min(200, y));
    letter.style.left = x + "px";
    letter.style.top = y + "px";
  });
}
setInterval(moveLetters, 200);

// drag logic
let selectedLetter = null;
let offsetX = 0;
let offsetY = 0;

gameArea.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("letter") && !e.target.dataset.frozen) {
    selectedLetter = e.target;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }
});

document.addEventListener("mousemove", function(e) {
  if (selectedLetter && !gameOver) {
    let x = e.pageX - gameArea.getBoundingClientRect().left - offsetX;
    let y = e.pageY - gameArea.getBoundingClientRect().top - offsetY;
    x = Math.max(0, Math.min(740, x));
    y = Math.max(0, Math.min(350, y));
    selectedLetter.style.left = x + "px";
    selectedLetter.style.top = y + "px";
  }
});

document.addEventListener("mouseup", function() {
  if (!selectedLetter) return;

  const letterRect = selectedLetter.getBoundingClientRect();
  const centerX = letterRect.left + letterRect.width / 2;
  const centerY = letterRect.top + letterRect.height / 2;

  const slots = document.querySelectorAll(".slot");

  slots.forEach(function(slot) {
    const slotRect = slot.getBoundingClientRect();
    if (
      centerX > slotRect.left && centerX < slotRect.right &&
      centerY > slotRect.top && centerY < slotRect.bottom
    ) {
      selectedLetter.dataset.frozen = "true";
      selectedLetter.style.left =
        slotRect.left - gameArea.getBoundingClientRect().left + "px";
      selectedLetter.style.top =
        slotRect.top - gameArea.getBoundingClientRect().top + "px";
      slot.innerText = selectedLetter.innerText;
      slot.classList.add("filled");
      soundPlace.play();
      checkWord();
    }
  });

  selectedLetter = null;
});

function checkWord() {
  const slots = document.querySelectorAll(".slot");
  let attempt = "";
  let filled = true;

  slots.forEach(function(slot) {
    if (slot.innerText === "") filled = false;
    attempt += slot.innerText;
  });

  if (!filled) return;

  if (attempt === word) {
    score += 10;
    currentLevel++;
    clearInterval(timerInterval);
    launchConfetti();
    soundCorrect.play();

    if (currentLevel >= words.length) {
      document.getElementById("message").innerText =
        "All cities completed! Final score: " + score;
      gameOver = true;
      return;
    }

    document.getElementById("message").innerText =
      "Correct! Next city loading...";

    setTimeout(function() {
      document.querySelectorAll(".letter").forEach(function(letter) {
        letter.remove();
      });
      document.getElementById("message").innerText = "";
      setupLevel();
    }, 1500);
  }
}

document.getElementById("reset-btn").addEventListener("click", function() {
  score = 0;
  currentLevel = 0;
  document.getElementById("message").innerText = "";
  document.querySelectorAll(".letter").forEach(function(letter) {
    letter.remove();
  });
  setupLevel();
});
