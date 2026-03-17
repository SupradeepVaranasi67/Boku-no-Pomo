let timeRemaining;
let timerId = null;
let currentMode = 'work';
let totalTime = 0;

// UI
const timer = document.getElementById('timer');
const modeDisplay = document.getElementById('modeDisplay');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

// progress ring
const circle = document.querySelector('.progress-ring-circle');
const radius = 90;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

// init
function initTimer() {
    totalTime = workTimeInput.value * 60;
    timeRemaining = totalTime;
    updateDisplay();
    updateProgress();
}

function updateDisplay() {
    const m = Math.floor(timeRemaining / 60);
    const s = timeRemaining % 60;
    timer.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function updateProgress() {
    const percent = timeRemaining / totalTime;
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = offset;
}

// start
function startTimer() {
    if (timerId) return;

    timerId = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
            updateProgress();
        } else {
            clearInterval(timerId);
            timerId = null;
            switchMode();
        }
    }, 1000);
}

// pause
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

// reset
function resetTimer() {
    pauseTimer();
    currentMode = 'work';
    modeDisplay.textContent = 'Work Time';
    initTimer();
}

// switch
function switchMode() {
    currentMode = currentMode === 'work' ? 'break' : 'work';

    totalTime = (currentMode === 'work' ? workTimeInput.value : breakTimeInput.value) * 60;
    timeRemaining = totalTime;

    modeDisplay.textContent = currentMode === 'work' ? 'Work Time' : 'Break Time';

    updateDisplay();
    updateProgress();
    startTimer();
}

// input change
function handleTimeChange() {
    if (timerId) return;

    totalTime = (currentMode === 'work' ? workTimeInput.value : breakTimeInput.value) * 60;
    timeRemaining = totalTime;

    updateDisplay();
    updateProgress();
}

// tasks
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const item = document.createElement('div');
    item.className = 'task-item';

    const check = document.createElement('input');
    check.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = text;

    check.addEventListener('change', () => {
        item.classList.toggle('completed');
    });

    item.appendChild(check);
    item.appendChild(span);
    taskList.appendChild(item);

    taskInput.value = '';
}

// theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

// events
document.getElementById('startBtn').onclick = startTimer;
document.getElementById('pauseBtn').onclick = pauseTimer;
document.getElementById('resetBtn').onclick = resetTimer;

workTimeInput.addEventListener('input', handleTimeChange);
breakTimeInput.addEventListener('input', handleTimeChange);

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

// init
initTimer();
