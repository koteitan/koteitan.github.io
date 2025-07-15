// Sleep tips data
const sleepTips = [
    "寝る前の1時間はスマートフォンやPCの使用を避けましょう。",
    "寝室の温度は18-22度が理想的です。",
    "カフェインは就寝の6時間前までに摂取を控えましょう。",
    "毎日同じ時刻に寝起きすることで体内時計が整います。",
    "寝る前に軽いストレッチをすると体がリラックスします。",
    "深呼吸を10回行うと心身がリラックスします。",
    "寝室は暗く、静かな環境を保ちましょう。",
    "夕食は就寝の3時間前までに済ませましょう。",
    "入浴は就寝の1-2時間前が理想的です。",
    "日記を書くことで心配事を整理できます。"
];

// State management
let currentAudio = null;
let bedtimeSet = false;
let bedtimeHour = null;
let bedtimeMinute = null;

// DOM elements
const currentTimeElement = document.getElementById('current-time');
const bedtimeInput = document.getElementById('bedtime-input');
const setBedtimeButton = document.getElementById('set-bedtime');
const bedtimeDisplay = document.getElementById('bedtime-display');
const routineChecklist = document.getElementById('routine-checklist');
const soundSelect = document.getElementById('sound-select');
const playButton = document.getElementById('play-sound');
const stopButton = document.getElementById('stop-sound');
const soundStatus = document.getElementById('sound-status');
const sleepTipElement = document.getElementById('sleep-tip');
const newTipButton = document.getElementById('new-tip');

// Update current time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Check if it's bedtime
    if (bedtimeSet && now.getHours() === bedtimeHour && now.getMinutes() === bedtimeMinute && now.getSeconds() === 0) {
        showBedtimeNotification();
    }
}

// Set bedtime
function setBedtime() {
    const time = bedtimeInput.value;
    if (!time) {
        bedtimeDisplay.textContent = '時刻を選択してください';
        return;
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    bedtimeHour = hours;
    bedtimeMinute = minutes;
    bedtimeSet = true;
    
    bedtimeDisplay.textContent = `就寝時刻: ${time} に設定されました`;
    bedtimeDisplay.style.color = 'var(--success-color)';
    
    // Save to localStorage
    localStorage.setItem('bedtime', time);
}

// Show bedtime notification
function showBedtimeNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('おやすみの時間です！', {
            body: '就寝時刻になりました。ゆっくり休んでください。',
            icon: '🌙'
        });
    }
    
    bedtimeDisplay.textContent = '🌙 就寝時刻です！おやすみなさい';
    bedtimeDisplay.style.color = 'var(--accent-color)';
}

// Load saved routines
function loadRoutines() {
    const savedRoutines = localStorage.getItem('routines');
    if (savedRoutines) {
        const routines = JSON.parse(savedRoutines);
        const checkboxes = routineChecklist.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const routine = checkbox.getAttribute('data-routine');
            checkbox.checked = routines[routine] || false;
        });
    }
}

// Save routine state
function saveRoutines() {
    const checkboxes = routineChecklist.querySelectorAll('input[type="checkbox"]');
    const routines = {};
    checkboxes.forEach(checkbox => {
        const routine = checkbox.getAttribute('data-routine');
        routines[routine] = checkbox.checked;
    });
    localStorage.setItem('routines', JSON.stringify(routines));
}

// Create audio for sleep sounds
function createAudio(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch (type) {
        case 'rain':
            return createRainSound(audioContext);
        case 'waves':
            return createWaveSound(audioContext);
        case 'white-noise':
            return createWhiteNoise(audioContext);
        default:
            return null;
    }
}

// Create rain sound
function createRainSound(audioContext) {
    const bufferSize = 4096;
    const brownNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    let lastOut = 0.0;
    
    brownNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 0.5;
        }
    };
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    brownNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { audioContext, nodes: [brownNoise, gainNode] };
}

// Create wave sound
function createWaveSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0.1, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 2);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 4);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    
    // Create repeating wave effect
    setInterval(() => {
        if (currentAudio && currentAudio.type === 'waves') {
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 2);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 4);
        }
    }, 4000);
    
    return { audioContext, nodes: [oscillator, gainNode], type: 'waves' };
}

// Create white noise
function createWhiteNoise(audioContext) {
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    
    whiteNoise.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
            output[i] *= 0.15;
        }
    };
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    whiteNoise.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { audioContext, nodes: [whiteNoise, gainNode] };
}

// Play sound
function playSound() {
    const selectedSound = soundSelect.value;
    if (!selectedSound) {
        soundStatus.textContent = 'サウンドを選択してください';
        return;
    }
    
    if (currentAudio) {
        stopSound();
    }
    
    currentAudio = createAudio(selectedSound);
    if (currentAudio) {
        playButton.disabled = true;
        stopButton.disabled = false;
        soundStatus.textContent = `${soundSelect.options[soundSelect.selectedIndex].text}を再生中...`;
    }
}

// Stop sound
function stopSound() {
    if (currentAudio) {
        currentAudio.audioContext.close();
        currentAudio = null;
    }
    
    playButton.disabled = false;
    stopButton.disabled = true;
    soundStatus.textContent = '';
}

// Show random sleep tip
function showRandomTip() {
    const randomIndex = Math.floor(Math.random() * sleepTips.length);
    sleepTipElement.innerHTML = `<p>${sleepTips[randomIndex]}</p>`;
}

// Initialize
function init() {
    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Load saved data
    const savedBedtime = localStorage.getItem('bedtime');
    if (savedBedtime) {
        bedtimeInput.value = savedBedtime;
        setBedtime();
    }
    
    loadRoutines();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Event listeners
    setBedtimeButton.addEventListener('click', setBedtime);
    
    routineChecklist.addEventListener('change', saveRoutines);
    
    playButton.addEventListener('click', playSound);
    stopButton.addEventListener('click', stopSound);
    
    newTipButton.addEventListener('click', showRandomTip);
    
    // Show initial tip
    showRandomTip();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);