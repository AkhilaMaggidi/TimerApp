const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

const alarmAudio = document.getElementById('alarm-audio');

let timerDuration = 1500; // default 25 minutes in seconds
let timer = null;
let timeRemaining = timerDuration;
let isRunning = false;

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
        hrs.toString().padStart(2, '0'),
        mins.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}

function startTimer() {
    if (isRunning) return;
    if (timeRemaining <= 0) {
        timeRemaining = timerDuration;
    }
    isRunning = true;
    startBtn.disabled = true;
    // pauseBtn.disabled = false; // pause button removed
    stopBtn.disabled = false;
    resetBtn.disabled = false;

    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            // pauseBtn.disabled = true; // pause button removed
            stopBtn.disabled = true;
            alarmAudio.play();
        }
    }, 1000);
}

/* pauseTimer function removed since pause button is removed */


function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = timerDuration;
    updateDisplay();
    startBtn.disabled = false;
    // pauseBtn.disabled = true; // pause button removed
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = timerDuration;
    updateDisplay();
    startBtn.disabled = false;
    // pauseBtn.disabled = true; // pause button removed
}

function switchMode(e) {
    if (isRunning) {
        stopTimer();
    }
    modeButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    timerDuration = parseInt(e.target.getAttribute('data-time'));
    timeRemaining = timerDuration;
    updateDisplay();
}

// Remove pomodoro button logic since it is removed from HTML
// No additional changes needed as the code dynamically handles available mode buttons


startBtn.addEventListener('click', startTimer);
// pauseBtn removed, so no event listener for pauseBtn
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
modeButtons.forEach(btn => btn.addEventListener('click', switchMode));

// Initialize display
updateDisplay();
