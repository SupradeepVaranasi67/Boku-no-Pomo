let timeRemaining;
let timerId = null;
let currentMode = 'work';

// UI elements
const timer = document.getElementById('timer');
const modeDisplay = document.getElementById('modeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Init
function initTimer() {
    timeRemaining = Number(workTimeInput.value) * 60;
    updateDisplay();
}

// Display
function updateDisplay() {
    const min = Math.floor(timeRemaining / 60);
    const sec = timeRemaining % 60;
    timer.textContent =
        `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// Start
function startTimer() {
    if (timerId) return;

    timerId = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            switchMode();
        }
    }, 1000);

    startBtn.disabled = true;
}

// Pause
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
}

// Reset
function resetTimer() {
    pauseTimer();
    currentMode = 'work';
    modeDisplay.textContent = 'Work Time';
    initTimer();
}

// Switch mode
function switchMode() {
    currentMode = currentMode === 'work' ? 'break' : 'work';

    timeRemaining =
        Number(currentMode === 'work'
            ? workTimeInput.value
            : breakTimeInput.value) * 60;

    modeDisplay.textContent =
        currentMode === 'work' ? 'Work Time' : 'Break Time';

    updateDisplay();
    startTimer();
}

// Input change
function handleTimeChange() {
    if (timerId) return;

    timeRemaining =
        Number(currentMode === 'work'
            ? workTimeInput.value
            : breakTimeInput.value) * 60;

    updateDisplay();
}

// Add task
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const item = document.createElement('div');
    item.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = text;

    checkbox.addEventListener('change', () => {
        item.classList.toggle('completed');
    });

    item.appendChild(checkbox);
    item.appendChild(span);
    taskList.appendChild(item);

    taskInput.value = '';
}

// Events
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workTimeInput.addEventListener('input', handleTimeChange);
breakTimeInput.addEventListener('input', handleTimeChange);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Init
initTimer();
