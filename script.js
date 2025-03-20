// Timer state variables
let timeRemaining;
let timerId = null;
let currentMode = 'work'; // 'work' or 'break'

// Get UI elements
const timer = document.getElementById('timer');
const modeDisplay = document.getElementById('modeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Initialize timer
function initTimer() {
    timeRemaining = workTimeInput.value * 60;
    updateTimerDisplay();
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start timer
function startTimer() {
    if (timerId !== null) return;
    timerId = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            playNotification();
            switchMode();
        }
    }, 1000);
    startBtn.disabled = true;
}

// Pause timer
function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
}

// Reset timer
function resetTimer() {
    pauseTimer();
    currentMode = 'work';
    modeDisplay.textContent = 'Work Time';
    initTimer();
}

// Switch mode
function switchMode() {
    currentMode = currentMode === 'work' ? 'break' : 'work';
    timeRemaining = (currentMode === 'work' ? workTimeInput.value : breakTimeInput.value) * 60;
    modeDisplay.textContent = currentMode === 'work' ? 'Work Time' : 'Break Time';
    updateTimerDisplay();
    startTimer();
}

// Play notification
function playNotification() {
    new Audio('https://www.soundjay.com/button/beep-07.wav').play();
}

// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `<input type="checkbox" class="task-checkbox"><span>${taskText}</span>`;
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

// Initialize
initTimer();
