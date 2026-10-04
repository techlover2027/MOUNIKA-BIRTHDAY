/**
 * Happy Birthday Mounika — Cinematic Experience & Guardian Gate
 * By Aaryan, Geethika & Agastya
 */

// ==========================================
// CONFIGURATION: ACCEPTED PASSWORDS
// ==========================================
// Mounika's favourite Cadbury flavour: OREO
const ACCEPTED_PASSWORDS = [
  "oreo",
  "silk oreo",
  "cadbury oreo",
  "cadbury silk oreo",
  "oreos"
];

// State
let currentSceneIndex = 1;
const TOTAL_SCENES = 7;
let isAudioPlaying = false;
let audioContext = null;
let bgMusicInterval = null;
let isCandlesReadyToBlow = false;
let areCandlesBlown = false;

// DOM Elements
const startOverlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");
const musicBtn = document.getElementById("music-btn");
const musicText = musicBtn.querySelector(".music-text");
const scenes = document.querySelectorAll(".scene");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev-scene-btn");
const nextBtn = document.getElementById("next-scene-btn");
const blackoutCurtain = document.getElementById("blackout-curtain");
const guardianScreen = document.getElementById("guardian-screen");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const inputWrapper = document.getElementById("input-wrapper");
const errorMsg = document.getElementById("error-msg");
const hintBox = document.getElementById("hint-box");
const catsTrio = document.getElementById("cats-trio") || document.getElementById("pandas-trio");

// Cake Stage DOM Elements
const cakeScreen = document.getElementById("cake-screen");
const cakeBadge = document.getElementById("cake-badge");
const cakeMainTitle = document.getElementById("cake-main-title");
const cakeStatusMsg = document.getElementById("cake-status-msg");
const cakeStage = document.getElementById("cake-stage");
const candleHalo = document.getElementById("candle-halo");
const partRosewoodTable = document.getElementById("part-rosewood-table");
const partStepBase = document.getElementById("part-step-base");
const partBaseToppings = document.getElementById("part-base-toppings");
const partStepMiddle = document.getElementById("part-step-middle");
const partStepTop = document.getElementById("part-step-top");
const partCandles = document.getElementById("part-candles");
const blowBanner = document.getElementById("blow-banner");
const postBlowCard = document.getElementById("post-blow-card");
const candleItems = document.querySelectorAll(".candle-item");
const nextSurpriseBtn = document.getElementById("next-surprise-btn");
const relightBtn = document.getElementById("relight-btn");

// Cake Cutting DOM Elements
const cakeServer = document.getElementById("cake-server");
const crumbBurst = document.getElementById("crumb-burst");
const cutBanner = document.getElementById("cut-banner");
const servedSliceContainer = document.getElementById("served-slice-container");
const recutBtn = document.getElementById("recut-btn");
let isKnifeReadyToCut = false;
let isCakeCut = false;

// 2.5D Animated Characters DOM Elements
const charMounika = document.getElementById("char-mounika");
const charAaryan = document.getElementById("char-aaryan");
const charGeethika = document.getElementById("char-geethika");
const charAgastya = document.getElementById("char-agastya");
const cameraFlashBulb = document.getElementById("camera-flash-bulb");
const cameraFlashOverlay = document.getElementById("camera-flash-overlay");
const instantPolaroidCard = document.getElementById("instant-polaroid-card");
const animeCutContainer = document.getElementById("anime-cut-container");
const mounikaHeldKnife = document.getElementById("mounika-held-knife");

// Microphone Breath Blow Detection DOM Elements & State
const micStatusBox = document.getElementById("mic-status-box");
const micStatusText = document.getElementById("mic-status-text");
const micBreathFill = document.getElementById("mic-breath-fill");
const micIconPulse = document.getElementById("mic-icon-pulse");

let micStream = null;
let micAnalyser = null;
let micDataArray = null;
let micAnimationId = null;
let isMicListening = false;
let breathExceedCount = 0;

// ==========================================
// JAPANESE AESTHETIC CANVAS (SAKURA PETALS & GOLDEN EMBERS)
// ==========================================
const canvas = document.getElementById("ambient-canvas");
const ctx = canvas.getContext("2d");
let sakuraPetals = [];
let goldenEmbers = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth || window.innerWidth;
  canvas.height = canvas.offsetHeight || window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Floating Sakura (Cherry Blossom) Petal
class SakuraPetal {
  constructor() {
    this.reset(true);
  }
  reset(init = false) {
    this.x = Math.random() * (canvas.width + 100) - 50;
    this.y = init ? Math.random() * canvas.height : -20;
    this.size = Math.random() * 8 + 9;
    this.speedY = Math.random() * 0.9 + 0.6; // gentle drift downwards
    this.speedX = Math.random() * 0.8 + 0.3; // gentle breeze to the right
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    this.opacity = Math.random() * 0.45 + 0.35;
    // Delicate Sakura soft pink gradients
    this.color1 = "255, 192, 203";
    this.color2 = "255, 140, 175";
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.wobble) * 0.5;
    this.rotation += this.rotationSpeed;
    this.wobble += this.wobbleSpeed;

    if (this.y > canvas.height + 30 || this.x > canvas.width + 50) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(Math.cos(this.wobble), 1);

    // Draw Japanese Sakura Petal shape
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.8, this.size * 0.8, 0, this.size);
    ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.8, -this.size * 0.8, -this.size * 0.8, 0, -this.size);

    const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
    grad.addColorStop(0, `rgba(${this.color1}, ${this.opacity})`);
    grad.addColorStop(1, `rgba(${this.color2}, ${this.opacity * 0.75})`);
    ctx.fillStyle = grad;
    ctx.shadowColor = `rgba(255, 182, 193, 0.4)`;
    ctx.shadowBlur = 4;
    ctx.fill();
    ctx.restore();
  }
}

// Glowing Japanese Lantern Ember / Firefly
class GoldenEmber {
  constructor() {
    this.reset(true);
  }
  reset(init = false) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : canvas.height + 15;
    this.size = Math.random() * 2 + 1;
    this.speedY = -(Math.random() * 0.45 + 0.15);
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.7 + 0.2;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.03 + 0.015;
    // Warm amber & gold lantern lights
    const colors = ["255, 209, 102", "255, 150, 60", "255, 235, 160", "255, 112, 166"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.pulse += this.pulseSpeed;
    this.currentOpacity = Math.max(0.1, this.opacity + Math.sin(this.pulse) * 0.25);

    if (this.y < -15 || this.x < -15 || this.x > canvas.width + 15) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.currentOpacity})`;
    ctx.shadowBlur = this.size * 4;
    ctx.shadowColor = `rgba(${this.color}, 0.85)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < 35; i++) {
  sakuraPetals.push(new SakuraPetal());
}
for (let i = 0; i < 45; i++) {
  goldenEmbers.push(new GoldenEmber());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  goldenEmbers.forEach(e => {
    e.update();
    e.draw();
  });
  sakuraPetals.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// GENTLE WEB AUDIO SYNTHESIZED SOUNDTRACK
// (Plays a warm, soothing birthday chime melody)
// ==========================================
function initAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

// Gentle birthday chime notes (C4, D4, E4, F4, G4, A4, B4, C5)
// ==========================================
// FEATURE 6: TELUGU MUSIC PLAYLIST & WEB AUDIO PLAYER
// ==========================================
const bgAudioPlayer = document.getElementById("bg-audio-player");
const customSongFileInput = document.getElementById("custom-song-file-input");

const NOTE_FREQS = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
};

// Choti Choti Baatein iconic melodic notes for synthesizer fallback
const CHOTI_CHOTI_MELODY = [
  { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'B4', dur: 0.5 }, { note: 'C5', dur: 0.7 },
  { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
  { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'B4', dur: 0.7 },
  { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.9 },
  { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.6 }, { note: 'G4', dur: 0.6 },
  { note: 'A4', dur: 0.5 }, { note: 'B4', dur: 0.7 }, { note: 'A4', dur: 1.1 }
];

const PLAYLIST_TRACKS = [
  {
    id: 0,
    name: "Choti Choti Baatein",
    type: "audio",
    src: "audio/choti_choti_baatein.m4a"
  },
  {
    id: 1,
    name: "O My Friend",
    type: "audio",
    src: "audio/o_my_friend.m4a"
  },
  {
    id: 2,
    name: "Custom Song",
    type: "custom"
  },
  {
    id: 3,
    name: "Celestial Chimes",
    type: "synth",
    melody: CHOTI_CHOTI_MELODY,
    tempo: 750
  }
];

let activeTrackIdx = 0;
let melodyStep = 0;

function playNextMelodyNote() {
  if (!isAudioPlaying || !audioContext) return;
  const currentTrack = PLAYLIST_TRACKS[3];
  const item = currentTrack.melody[melodyStep % currentTrack.melody.length];
  
  playChimeTone(NOTE_FREQS[item.note] || 440, item.dur * 0.95);
  melodyStep++;
  const nextDelay = item.dur * currentTrack.tempo;
  bgMusicInterval = setTimeout(playNextMelodyNote, nextDelay);
}

function playChimeTone(freq, duration) {
  if (!audioContext) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    // Warm soft bell envelope
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.error(e);
  }
}

function playWrongBuzzer() {
  if (!audioContext) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, audioContext.currentTime);
    osc.frequency.linearRampToValueAtTime(110, audioContext.currentTime + 0.25);

    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.25);
  } catch(e) {}
}

function playSuccessChime() {
  if (!audioContext) return;
  const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
  chords.forEach((freq, idx) => {
    setTimeout(() => {
      playChimeTone(freq, 0.8);
    }, idx * 120);
  });
}

const musicMainPill = document.querySelector(".music-main-pill");
const musicPlaylistToggleBtn = document.getElementById("music-playlist-toggle-btn");
const musicPlaylistDropdown = document.getElementById("music-playlist-dropdown");
const playlistCloseBtn = document.getElementById("playlist-close-btn");
const playlistItems = document.querySelectorAll(".playlist-item");

function startTrackPlayback(idx) {
  const track = PLAYLIST_TRACKS[idx] || PLAYLIST_TRACKS[0];
  activeTrackIdx = idx;
  if (bgMusicInterval) clearTimeout(bgMusicInterval);

  if (track.type === "audio") {
    if (bgAudioPlayer) {
      if (!bgAudioPlayer.src.endsWith(track.src) && !track.src.startsWith("blob:")) {
        bgAudioPlayer.src = track.src;
      }
      bgAudioPlayer.play().then(() => {
        isAudioPlaying = true;
        if (musicText) musicText.textContent = `Music: ${track.name}`;
        if (musicMainPill) musicMainPill.classList.add("playing");
      }).catch(err => {
        console.warn("Audio autoplay policy or format issue, using synth fallback:", err);
        isAudioPlaying = true;
        if (musicText) musicText.textContent = `Music: ${track.name}`;
        if (musicMainPill) musicMainPill.classList.add("playing");
        melodyStep = 0;
        playNextMelodyNote();
      });
    }
  } else if (track.type === "synth") {
    if (bgAudioPlayer) bgAudioPlayer.pause();
    initAudio();
    isAudioPlaying = true;
    if (musicText) musicText.textContent = `Music: ${track.name}`;
    if (musicMainPill) musicMainPill.classList.add("playing");
    melodyStep = 0;
    playNextMelodyNote();
  }
}

function pausePlayback() {
  isAudioPlaying = false;
  if (bgAudioPlayer) bgAudioPlayer.pause();
  if (bgMusicInterval) clearTimeout(bgMusicInterval);
  if (musicText) musicText.textContent = "Music: Off";
  if (musicMainPill) musicMainPill.classList.remove("playing");
}

function toggleMusic() {
  initAudio();
  if (isAudioPlaying) {
    pausePlayback();
  } else {
    startTrackPlayback(activeTrackIdx);
  }
}

function updatePlaylistUI(trackIdx, customTitle) {
  playlistItems.forEach((item, idx) => {
    if (idx === trackIdx) {
      item.classList.add("active");
      const indicator = item.querySelector(".pl-indicator");
      if (indicator) indicator.textContent = "▶";
      if (customTitle && idx === 2) {
        const titleEl = item.querySelector(".pl-item-title");
        if (titleEl) titleEl.textContent = customTitle;
      }
    } else {
      item.classList.remove("active");
      const indicator = item.querySelector(".pl-indicator");
      if (indicator) indicator.textContent = "";
    }
  });
}

function selectTrack(trackIdx) {
  if (trackIdx === 2) {
    if (customSongFileInput) customSongFileInput.click();
    if (musicPlaylistDropdown) musicPlaylistDropdown.classList.remove("open");
    return;
  }

  activeTrackIdx = trackIdx;
  updatePlaylistUI(trackIdx);
  startTrackPlayback(trackIdx);
  if (musicPlaylistDropdown) musicPlaylistDropdown.classList.remove("open");
}

if (customSongFileInput) {
  customSongFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && bgAudioPlayer) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      const shortName = fileName.length > 18 ? fileName.substring(0, 16) + "…" : fileName;
      PLAYLIST_TRACKS[2].name = shortName;
      PLAYLIST_TRACKS[2].src = fileUrl;
      PLAYLIST_TRACKS[2].type = "audio";
      activeTrackIdx = 2;
      updatePlaylistUI(2, shortName);
      if (bgMusicInterval) clearTimeout(bgMusicInterval);
      bgAudioPlayer.src = fileUrl;
      bgAudioPlayer.play().then(() => {
        isAudioPlaying = true;
        if (musicText) musicText.textContent = `Music: ${shortName}`;
        if (musicMainPill) musicMainPill.classList.add("playing");
      }).catch(() => {});
    }
  });
}

if (musicBtn) musicBtn.addEventListener("click", toggleMusic);

if (musicPlaylistToggleBtn && musicPlaylistDropdown) {
  musicPlaylistToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    musicPlaylistDropdown.classList.toggle("open");
  });
}

if (playlistCloseBtn && musicPlaylistDropdown) {
  playlistCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    musicPlaylistDropdown.classList.remove("open");
  });
}

playlistItems.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    selectTrack(idx);
  });
});

document.addEventListener("click", (e) => {
  if (musicPlaylistDropdown && !e.target.closest("#music-player-hub")) {
    musicPlaylistDropdown.classList.remove("open");
  }
});

// ==========================================
// SCENE MANAGEMENT & NAVIGATION
// ==========================================
function updateScenes() {
  scenes.forEach(scene => {
    const sceneNum = parseInt(scene.dataset.scene, 10);
    if (sceneNum === currentSceneIndex) {
      scene.classList.add("active");
    } else {
      scene.classList.remove("active");
    }
  });

  dots.forEach((dot, idx) => {
    if (idx + 1 === currentSceneIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Previous button visibility
  if (currentSceneIndex === 1) {
    prevBtn.style.opacity = "0.3";
    prevBtn.style.pointerEvents = "none";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.pointerEvents = "auto";
  }

  // Next button text
  if (currentSceneIndex === TOTAL_SCENES) {
    nextBtn.textContent = "Enter The Vault 🔐";
  } else {
    nextBtn.textContent = "Next ›";
  }

  // Scene 6 Brief Pause handling
  if (currentSceneIndex === 6) {
    // Automatically advance after brief pause if user doesn't click
    clearTimeout(window.scene6Timer);
    window.scene6Timer = setTimeout(() => {
      if (currentSceneIndex === 6) {
        goToScene(7);
      }
    }, 2800);
  }
}

function goToScene(index) {
  if (index >= 1 && index <= TOTAL_SCENES) {
    currentSceneIndex = index;
    updateScenes();
  } else if (index > TOTAL_SCENES) {
    triggerBlackoutTransition();
  }
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentSceneIndex > 1) {
    goToScene(currentSceneIndex - 1);
  }
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goToScene(currentSceneIndex + 1);
});

// Click anywhere on cinematic container to advance to next scene
const cinematicContainer = document.getElementById("cinematic-container");
if (cinematicContainer) {
  cinematicContainer.addEventListener("click", (e) => {
    // If clicking nav buttons, audio button, or form inputs, ignore
    if (e.target.closest("#prev-scene-btn") || e.target.closest("#next-scene-btn") || e.target.closest(".top-nav") || e.target.closest("button") || e.target.closest("input")) {
      return;
    }
    if (currentSceneIndex <= TOTAL_SCENES) {
      goToScene(currentSceneIndex + 1);
    }
  });
}

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (startOverlay.classList.contains("active")) return;
  if (guardianScreen.classList.contains("active")) return;

  if (e.key === "ArrowRight" || e.key === " ") {
    goToScene(currentSceneIndex + 1);
  } else if (e.key === "ArrowLeft") {
    if (currentSceneIndex > 1) {
      goToScene(currentSceneIndex - 1);
    }
  }
});

// Start journey handler (Supports pointerdown, touchstart, and click on button or anywhere on overlay)
function handleStartJourney(e) {
  if (e) e.stopPropagation();
  if (!startOverlay || !startOverlay.classList.contains("active")) return;
  startOverlay.classList.remove("active");
  try {
    initAudio();
    startTrackPlayback(0);
  } catch (err) {
    console.warn("Audio start:", err);
  }
  goToScene(1);
}

if (startBtn) {
  startBtn.addEventListener("pointerdown", handleStartJourney);
  startBtn.addEventListener("click", handleStartJourney);
}

if (startOverlay) {
  startOverlay.addEventListener("click", (e) => {
    // Only if clicking on background of overlay
    if (e.target === startOverlay) {
      handleStartJourney(e);
    }
  });
}

// ==========================================
// CINEMATIC TRANSITION TO BLACKOUT & GUARDIANS
// ==========================================
function triggerBlackoutTransition() {
  // 1. Fade to black
  blackoutCurtain.classList.add("blackout");

  // 2. Hide cinematic wrapper in background
  setTimeout(() => {
    document.getElementById("cinematic-container").style.display = "none";
    document.querySelector(".top-nav").style.display = "none";

    // 3. Prepare Guardians screen
    guardianScreen.classList.add("active");

    // 4. Reveal from black
    setTimeout(() => {
      blackoutCurtain.classList.remove("blackout");
      passwordInput.focus();
    }, 800);
  }, 1600);
}

// ==========================================
// PASSWORD GATE VALIDATION & HINT
// ==========================================
function normalizeString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function checkPassword() {
  const entered = normalizeString(passwordInput.value);

  if (!entered) return;

  const isCorrect = ACCEPTED_PASSWORDS.some(pass => {
    const normalizedTarget = normalizeString(pass);
    return entered === normalizedTarget || entered.includes(normalizedTarget) || normalizedTarget.includes(entered);
  });

  if (isCorrect) {
    // SUCCESS!
    handlePasswordSuccess();
  } else {
    // WRONG PASSWORD!
    handlePasswordFailure();
  }
}

function handlePasswordFailure() {
  playWrongBuzzer();

  // Shake input wrapper
  inputWrapper.classList.add("shake-card");
  setTimeout(() => inputWrapper.classList.remove("shake-card"), 600);

  // Shake cats trio & show meme crying waterfall tears
  if (catsTrio) {
    catsTrio.classList.add("cats-shake");
    setTimeout(() => catsTrio.classList.remove("cats-shake"), 1200);
  }

  // Show error message & hint
  errorMsg.style.display = "block";
  hintBox.classList.add("show");

  // Re-focus and select
  passwordInput.select();
}

function handlePasswordSuccess() {
  playSuccessChime();

  // Happy dance celebration for cats trio
  if (catsTrio) {
    catsTrio.classList.add("cats-cheer");
  }
  errorMsg.style.display = "none";

  // Transition to Luxury Oreo Cake Stage
  setTimeout(() => {
    guardianScreen.classList.remove("active");
    cakeScreen.classList.add("active");
    startCakeAssembly();
  }, 1300);
}

// ==========================================
// SOUND EFFECTS GENERATOR (WEB AUDIO)
// ==========================================
function playDropThudSound(freq = 150) {
  if (!audioContext) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, audioContext.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.2);
  } catch(e) {}
}

function playCandleIgniteSound() {
  if (!audioContext) return;
  try {
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((f, i) => {
      setTimeout(() => playChimeTone(f, 0.5), i * 80);
    });
  } catch(e) {}
}

function playBlowWindSound() {
  if (!audioContext) return;
  try {
    // White noise / breath puff sound
    const bufferSize = audioContext.sampleRate * 0.45;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, audioContext.currentTime);
    filter.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.45);

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.45);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    whiteNoise.start();
  } catch(e) {}
}

function playVictoryFanfare() {
  if (!audioContext) return;
  const notes = [
    { f: 523.25, d: 0.25 }, // C5
    { f: 659.25, d: 0.25 }, // E5
    { f: 783.99, d: 0.35 }, // G5
    { f: 1046.50, d: 0.8 }  // C6
  ];
  let accumulated = 0;
  notes.forEach(n => {
    setTimeout(() => {
      playChimeTone(n.f, n.d);
    }, accumulated);
    accumulated += n.d * 750;
  });
}

// ==========================================
// SEQUENTIAL FALLING OREO CAKE CHOREOGRAPHY
// ==========================================
function startCakeAssembly() {
  isCandlesReadyToBlow = false;
  areCandlesBlown = false;

  const layers = [
    { el: partRosewoodTable, status: "Setting the Handcrafted Rosewood Table... 🪵✨", delay: 700 },
    { el: partStepBase, status: "Step 1: Rich Chocolate Base with Oreo Toppings... 🍪🍫", delay: 850 },
    { el: partBaseToppings, status: "Lining Golden Cream Rosettes & Crunchy Oreo Cookies... 🍪🧡", delay: 800 },
    { el: partStepMiddle, status: "Step 2: Velvety Chocolate Tier with Candy Sprinkles... 🍬🤤", delay: 850 },
    { el: partStepTop, status: "Step 3: Dedicated Tier: 'Happy birthday Mouni... akka...' 💖🎂", delay: 900 },
    { el: partCandles, status: "Final Touch: 3 Birthday Candles: Red, Royal Blue & Yellow! 🕯️🕯️🕯️", delay: 1000 }
  ];

  // Reset elements
  layers.forEach(l => l.el.classList.remove("dropped"));
  candleHalo.classList.remove("lit");
  candleItems.forEach(c => c.classList.remove("extinguished"));
  blowBanner.classList.remove("show");
  cutBanner.classList.remove("show");
  if (mounikaHeldKnife) mounikaHeldKnife.classList.remove("show", "cutting", "ready", "hidden");
  if (cakeServer) cakeServer.classList.remove("sliding");
  if (crumbBurst) crumbBurst.classList.remove("pop");
  if (servedSliceContainer) servedSliceContainer.classList.remove("served");
  if (cakeStage) cakeStage.classList.remove("is-cut");
  postBlowCard.classList.remove("show");
  cakeMainTitle.textContent = "Crafting DIII's Special Cake... 🎂";
  cakeBadge.textContent = "✨ CHEF'S MASTERPIECE IN PROGRESS ✨";
  isCandlesReadyToBlow = false;
  areCandlesBlown = false;
  isKnifeReadyToCut = false;
  isCakeCut = false;

  let accumulatedDelay = 400;

  layers.forEach((layer, idx) => {
    accumulatedDelay += layer.delay;

    setTimeout(() => {
      layer.el.classList.add("dropped");
      cakeStatusMsg.textContent = layer.status;
      playDropThudSound(180 - idx * 18);

      // When final layer (Candles) lands
      if (idx === layers.length - 1) {
        setTimeout(() => {
          candleHalo.classList.add("lit");
          playCandleIgniteSound();
          cakeBadge.textContent = "🎂 CAKE IS READY!";
          cakeMainTitle.textContent = "Make A Wish, DIII! ✨";
          cakeStatusMsg.textContent = "Blow into your microphone 🌬️ (or tap button to blow)";
          blowBanner.classList.add("show");
          const candleDim = document.getElementById("candle-wishing-dim");
          if (candleDim) candleDim.classList.add("active");
          isCandlesReadyToBlow = true;
          initMicrophoneDetection();
        }, 800);
      }
    }, accumulatedDelay);
  });
}

// ==========================================
// MICROPHONE BLOW DETECTION (WEB AUDIO ANALYSER)
// ==========================================
async function initMicrophoneDetection() {
  if (isMicListening) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (micStatusText) micStatusText.textContent = "Tap anywhere to blow candles 🌬️";
    return;
  }

  try {
    initAudio();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    micStream = stream;
    const source = audioContext.createMediaStreamSource(stream);
    micAnalyser = audioContext.createAnalyser();
    micAnalyser.fftSize = 512;
    micAnalyser.smoothingTimeConstant = 0.3;
    source.connect(micAnalyser);

    micDataArray = new Uint8Array(micAnalyser.frequencyBinCount);
    isMicListening = true;
    breathExceedCount = 0;
    if (micStatusText) micStatusText.textContent = "Mic active: Blow into mic! 🌬️";
    startBreathPolling();
  } catch (err) {
    console.warn("Microphone access not granted or unavailable:", err);
    if (micStatusText) micStatusText.textContent = "Tap anywhere to blow candles 🌬️";
    if (micBreathFill) micBreathFill.style.width = "0%";
  }
}

function startBreathPolling() {
  if (!isMicListening || !micAnalyser) return;

  function poll() {
    if (!isMicListening || areCandlesBlown) {
      if (micAnimationId) cancelAnimationFrame(micAnimationId);
      return;
    }

    if (isCandlesReadyToBlow) {
      micAnalyser.getByteFrequencyData(micDataArray);

      // Low frequency turbulence (characteristic of breath/blowing on mic: 40Hz - 400Hz)
      let lowSum = 0;
      const lowCount = 7;
      for (let i = 0; i < lowCount; i++) {
        lowSum += micDataArray[i];
      }
      const avgLow = lowSum / lowCount;

      // General volume average
      let totalSum = 0;
      for (let i = 0; i < micDataArray.length; i++) {
        totalSum += micDataArray[i];
      }
      const avgTotal = totalSum / micDataArray.length;

      // Weighted breath intensity
      const breathStrength = (avgLow * 1.6 + avgTotal * 0.4) / 255;
      const displayPercent = Math.min(Math.round(breathStrength * 160), 100);

      if (micBreathFill) {
        micBreathFill.style.width = displayPercent + "%";
      }

      // If user blows into mic with moderate to strong intensity
      if (breathStrength > 0.32 || displayPercent > 65) {
        breathExceedCount++;
        if (breathExceedCount >= 4) {
          if (micBreathFill) micBreathFill.style.width = "100%";
          if (micStatusText) micStatusText.textContent = "Candles Blown Out! 🎂✨";
          blowOutCandles();
          stopMicrophoneDetection();
          return;
        }
      } else {
        breathExceedCount = Math.max(0, breathExceedCount - 1);
      }
    }

    micAnimationId = requestAnimationFrame(poll);
  }

  poll();
}

function stopMicrophoneDetection() {
  isMicListening = false;
  if (micAnimationId) {
    cancelAnimationFrame(micAnimationId);
    micAnimationId = null;
  }
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
}

// ==========================================
// SOUND EFFECTS: ANIME SLASH, KNIFE SLICE, SHUTTER, CLAPPING & PLATE CLINK
// ==========================================
function playAnimeSlashSound() {
  if (!audioContext) return;
  try {
    const t0 = audioContext.currentTime;

    // 1. High energy charging laser / whoosh sweep (2400Hz -> 320Hz)
    const oscSweep = audioContext.createOscillator();
    const gainSweep = audioContext.createGain();
    oscSweep.type = "sawtooth";
    oscSweep.frequency.setValueAtTime(2400, t0);
    oscSweep.frequency.exponentialRampToValueAtTime(320, t0 + 0.28);
    gainSweep.gain.setValueAtTime(0.2, t0);
    gainSweep.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
    oscSweep.connect(gainSweep);
    gainSweep.connect(audioContext.destination);
    oscSweep.start(t0);
    oscSweep.stop(t0 + 0.28);

    // 2. Metallic "SCHWING" blade resonant impact (1760Hz shimmer)
    const oscBlade = audioContext.createOscillator();
    const gainBlade = audioContext.createGain();
    oscBlade.type = "sine";
    oscBlade.frequency.setValueAtTime(1760, t0 + 0.05);
    oscBlade.frequency.exponentialRampToValueAtTime(880, t0 + 0.35);
    gainBlade.gain.setValueAtTime(0.001, t0);
    gainBlade.gain.setValueAtTime(0.3, t0 + 0.05);
    gainBlade.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);
    oscBlade.connect(gainBlade);
    gainBlade.connect(audioContext.destination);
    oscBlade.start(t0 + 0.05);
    oscBlade.stop(t0 + 0.35);

    // 3. Cinematic Sub-bass impact thud (110Hz -> 45Hz boom)
    const oscSub = audioContext.createOscillator();
    const gainSub = audioContext.createGain();
    oscSub.type = "sine";
    oscSub.frequency.setValueAtTime(110, t0 + 0.04);
    oscSub.frequency.exponentialRampToValueAtTime(45, t0 + 0.4);
    gainSub.gain.setValueAtTime(0.35, t0 + 0.04);
    gainSub.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
    oscSub.connect(gainSub);
    gainSub.connect(audioContext.destination);
    oscSub.start(t0 + 0.04);
    oscSub.stop(t0 + 0.4);
  } catch (e) {
    console.error("Anime slash sound error:", e);
  }
}

function playKnifeSliceSound() {
  if (!audioContext) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.35);

    gain.gain.setValueAtTime(0.25, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.35);
  } catch(e) {}
}

function playCameraShutterSound() {
  if (!audioContext) return;
  try {
    const t0 = audioContext.currentTime;

    // 1. Mirror reflex transient click
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(1400, t0);
    osc1.frequency.exponentialRampToValueAtTime(120, t0 + 0.04);
    gain1.gain.setValueAtTime(0.25, t0);
    gain1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.04);
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.start(t0);
    osc1.stop(t0 + 0.04);

    // 2. High-frequency click noise burst
    const bufferSize = Math.floor(audioContext.sampleRate * 0.035);
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.2, t0);
    noise.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    noise.start(t0);

    // 3. Shutter curtain snap ~60ms later
    const t1 = t0 + 0.06;
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(950, t1);
    osc2.frequency.exponentialRampToValueAtTime(80, t1 + 0.05);
    gain2.gain.setValueAtTime(0.3, t1);
    gain2.gain.exponentialRampToValueAtTime(0.001, t1 + 0.05);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.start(t1);
    osc2.stop(t1 + 0.05);

    // 4. Subtle camera motor whir after snap
    const t2 = t1 + 0.05;
    const oscWhir = audioContext.createOscillator();
    const gainWhir = audioContext.createGain();
    oscWhir.type = "sawtooth";
    oscWhir.frequency.setValueAtTime(320, t2);
    oscWhir.frequency.linearRampToValueAtTime(220, t2 + 0.14);
    gainWhir.gain.setValueAtTime(0.04, t2);
    gainWhir.gain.linearRampToValueAtTime(0.001, t2 + 0.14);
    oscWhir.connect(gainWhir);
    gainWhir.connect(audioContext.destination);
    oscWhir.start(t2);
    oscWhir.stop(t2 + 0.14);
  } catch(e) {}
}

function playCheeringClapSound() {
  if (!audioContext) return;
  try {
    const clapTimes = [0, 0.14, 0.28, 0.44, 0.60, 0.78, 0.98, 1.18];
    clapTimes.forEach((delay, idx) => {
      setTimeout(() => {
        if (!audioContext) return;
        const clapLen = Math.floor(audioContext.sampleRate * 0.05);
        const b = audioContext.createBuffer(1, clapLen, audioContext.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < clapLen; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (clapLen * 0.25));
        }
        const src = audioContext.createBufferSource();
        src.buffer = b;
        const filter = audioContext.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 1000 + (idx % 3) * 300;
        filter.Q.value = 2.0;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.18 + Math.random() * 0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        src.start();
      }, delay * 1000);
    });
  } catch(e) {}
}

function playPlateClinkSound() {
  if (!audioContext) return;
  try {
    playChimeTone(1318.51, 0.35);
    setTimeout(() => playChimeTone(1760.00, 0.45), 70);
  } catch(e) {}
}

// ==========================================
// SECRET BIRTHDAY WISH & SILENT EMAIL DELIVERY
// ==========================================
// Insert your email address here to receive Mounika's secret wish directly in your inbox:
const SECRET_WISH_RECIPIENT_EMAIL = "techlover2027@gmail.com"; 

const secretWishModalOverlay = document.getElementById("secret-wish-modal-overlay");
const secretWishInput = document.getElementById("secret-wish-input");
const sealWishBtn = document.getElementById("seal-wish-btn");
const skipWishBtn = document.getElementById("skip-wish-btn");

function openSecretWishModal() {
  if (secretWishModalOverlay) {
    secretWishModalOverlay.classList.add("active");
    if (secretWishInput) {
      secretWishInput.value = "";
      setTimeout(() => secretWishInput.focus(), 350);
    }
    playSuccessChime();
  }
}

function proceedToCakeCut() {
  if (secretWishModalOverlay) secretWishModalOverlay.classList.remove("active");

  // Show Celestial Wish Toast Announcement
  const wishAnnouncement = document.getElementById("wish-whispered-announcement");
  if (wishAnnouncement) {
    wishAnnouncement.classList.add("show");
    playSuccessChime();
    setTimeout(() => {
      wishAnnouncement.classList.remove("show");
    }, 2400);
  }

  cakeStatusMsg.textContent = "✨ Wish captured and locked into the stars! ✨";

  // After candles are out & wish is locked, present the knife in Mounika's hands!
  setTimeout(() => {
    cakeMainTitle.textContent = "Time to Cut the Cake! 🎂🔪";
    cakeStatusMsg.textContent = "Tap Mounika or her knife to cut the first slice! 🍰";
    if (mounikaHeldKnife) {
      mounikaHeldKnife.classList.remove("cutting", "hidden");
      mounikaHeldKnife.classList.add("ready", "show");
    }
    if (cutBanner) {
      cutBanner.classList.add("show");
    }
    isKnifeReadyToCut = true;
  }, 1200);
}

async function sendWishSilentlyToEmail(wish) {
  const wishContent = wish || "(Mounika kept her wish silent in her heart 🤫)";
  const timestamp = new Date().toLocaleString();

  // 1. Always back up to localStorage
  try {
    localStorage.setItem("mounika_secret_wish", wishContent);
    localStorage.setItem("mounika_secret_wish_time", timestamp);
    console.log("%c🌟 MOUNIKA'S SECRET BIRTHDAY WISH SAVED:", "color: #ffd700; font-weight: bold; font-size: 14px;", wishContent);
  } catch (e) {}

  // 2. Silently send via FormSubmit AJAX without any redirect or notification to her
  if (SECRET_WISH_RECIPIENT_EMAIL && !SECRET_WISH_RECIPIENT_EMAIL.includes("example.com")) {
    try {
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SECRET_WISH_RECIPIENT_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "🎂 Mounika Diii's Secret Birthday Wish Has Arrived! ✨",
          _template: "table",
          _captcha: "false",
          "Birthday Girl": "Mounika Diii 👑",
          "Secret Birthday Wish": wishContent,
          "Recorded At": timestamp
        })
      }).catch(() => {});
    } catch (err) {
      console.warn("Silent wish delivery:", err);
    }

    // 3. Dual Guarantee: Also dispatch via hidden iframe form (ensures delivery even when opened from local files or strict CORS)
    try {
      const hiddenField = document.getElementById("silent-wish-hidden-field");
      const hiddenTime = document.getElementById("silent-wish-hidden-time");
      const silentForm = document.getElementById("silent-wish-form");
      if (silentForm && hiddenField) {
        hiddenField.value = wishContent;
        if (hiddenTime) hiddenTime.value = timestamp;
        silentForm.submit();
      }
    } catch (err) {
      console.warn("Silent iframe form dispatch:", err);
    }
  }
}

if (sealWishBtn) {
  sealWishBtn.addEventListener("click", () => {
    const wish = secretWishInput ? secretWishInput.value.trim() : "";
    sendWishSilentlyToEmail(wish);
    triggerConfettiExplosion();
    proceedToCakeCut();
  });
}

if (skipWishBtn) {
  skipWishBtn.addEventListener("click", () => {
    sendWishSilentlyToEmail("(Mounika kept her wish silent in her heart 🤫)");
    proceedToCakeCut();
  });
}

// ==========================================
// CANDLE BLOWOUT INTERACTION
// ==========================================
function blowOutCandles() {
  if (!isCandlesReadyToBlow || areCandlesBlown) return;
  isCandlesReadyToBlow = false;
  areCandlesBlown = true;

  stopMicrophoneDetection();
  if (micBreathFill) micBreathFill.style.width = "100%";
  if (micStatusText) micStatusText.textContent = "Candles blown! ✨";

  playBlowWindSound();

  const candleDim = document.getElementById("candle-wishing-dim");
  if (candleDim) candleDim.classList.remove("active");

  // Extinguish candle flames and trigger smoke wisps
  candleItems.forEach(candle => {
    candle.classList.add("extinguished");
  });

  candleHalo.classList.remove("lit");
  blowBanner.classList.remove("show");

  // Open the Secret Birthday Wish Box so she can write her wish!
  setTimeout(() => {
    openSecretWishModal();
  }, 750);
}

// ==========================================
// CAKE CUTTING INTERACTION (AUTHENTIC 3D CHARACTER CAKE CUT)
// ==========================================
function cutTheCake() {
  if (!isKnifeReadyToCut || isCakeCut) return;
  isKnifeReadyToCut = false;
  isCakeCut = true;

  // 1. Play Epic Anime Slash & Knife Slice Sound
  playAnimeSlashSound();
  playKnifeSliceSound();

  // 2. Camera Dynamic Zoom-In & Impact Screen Shake
  if (cakeStage) {
    cakeStage.classList.add("anime-focus", "screen-shake");
    setTimeout(() => cakeStage.classList.remove("screen-shake"), 320);
  }
  if (mounikaHeldKnife) {
    mounikaHeldKnife.classList.remove("ready");
    mounikaHeldKnife.classList.add("cutting");
  }
  if (cutBanner) cutBanner.classList.remove("show");
  cakeStatusMsg.textContent = "⚔️ ズバッ! DIII performs the 3D Birthday Slice! 🍰✨";

  // 3. Trigger Anime Speedlines & Glowing Slash Beam Arc
  if (animeCutContainer) {
    animeCutContainer.classList.add("slashing");
    setTimeout(() => animeCutContainer.classList.remove("slashing"), 750);
  }

  // 4. Mounika steps forward and executes 3D downward slice animation!
  if (charMounika) {
    charMounika.classList.remove("cutting-3d-active", "cutting-active");
    void charMounika.offsetWidth; // Reflow to guarantee instant re-trigger
    charMounika.classList.add("cutting-3d-active", "cutting-active");
  }

  // 5. Aaryan aims camera, snaps picture with flash burst & shutter sound
  setTimeout(() => {
    if (charAaryan) {
      charAaryan.classList.add("snapping");
    }
    playCameraShutterSound();

    // Fullscreen camera flash bloom
    if (cameraFlashOverlay) {
      cameraFlashOverlay.classList.add("flashing");
      setTimeout(() => cameraFlashOverlay.classList.remove("flashing"), 150);
    }
  }, 260);

  // 6. Geethika and Agastya jump and cheer with clapping audio
  setTimeout(() => {
    playCheeringClapSound();
    if (charGeethika) charGeethika.classList.add("cheering");
    if (charAgastya) charAgastya.classList.add("cheering");
  }, 340);

  // 7. 3D Triangular Slice slides out onto porcelain plate with spatula and crumbs
  setTimeout(() => {
    if (crumbBurst) {
      crumbBurst.classList.add("pop");
      setTimeout(() => crumbBurst.classList.remove("pop"), 800);
    }
    if (cakeServer) {
      cakeServer.classList.add("sliding");
    }
  }, 420);

  setTimeout(() => {
    if (cakeStage) cakeStage.classList.add("is-cut");
    if (servedSliceContainer) servedSliceContainer.classList.add("served");
    playPlateClinkSound();
    cakeStatusMsg.textContent = "🍰 First slice served for the Birthday Queen DIII! ❤️";

    // Cleanly remove the knife after the cut is complete
    if (mounikaHeldKnife) {
      mounikaHeldKnife.classList.remove("cutting", "ready", "show");
      mounikaHeldKnife.classList.add("hidden");
    }

    // 8. Eject Instant Polaroid Photo Card!
    setTimeout(() => {
      if (instantPolaroidCard) {
        instantPolaroidCard.classList.add("show");
      }
    }, 300);

    // 9. Grand celebration fireworks & post-blow celebration card
    setTimeout(() => {
      triggerConfettiExplosion();
      playVictoryFanfare();
      postBlowCard.classList.add("show");
      if (cakeStage) cakeStage.classList.remove("anime-focus");

      // Auto-transition directly to Balloon Pop Game (no choosing options!)
      startCakeToBalloonCountdown();
    }, 700);
  }, 750);
}

// Auto Countdown: Cake Cut to Balloon Pop Game
let cakeToBalloonTimer = null;
let cakeCountdownInterval = null;

function startCakeToBalloonCountdown() {
  stopCakeCountdown();

  let seconds = 3;
  const secEl = document.getElementById("cake-countdown-sec");
  if (secEl) secEl.textContent = seconds;

  cakeCountdownInterval = setInterval(() => {
    seconds--;
    if (secEl) secEl.textContent = seconds;
    if (seconds <= 0) {
      stopCakeCountdown();
      openBalloonGame();
    }
  }, 1000);
}

function stopCakeCountdown() {
  if (cakeCountdownInterval) {
    clearInterval(cakeCountdownInterval);
    cakeCountdownInterval = null;
  }
  if (cakeToBalloonTimer) {
    clearTimeout(cakeToBalloonTimer);
    cakeToBalloonTimer = null;
  }
}

// Knife & Cut Banner click & pointerdown listeners
if (mounikaHeldKnife) {
  const onKnifeAction = (e) => {
    e.stopPropagation();
    cutTheCake();
  };
  mounikaHeldKnife.addEventListener("pointerdown", onKnifeAction);
  mounikaHeldKnife.addEventListener("click", onKnifeAction);
}

if (charMounika) {
  const onMounikaAction = (e) => {
    if (isKnifeReadyToCut) {
      e.stopPropagation();
      cutTheCake();
    }
  };
  charMounika.addEventListener("pointerdown", onMounikaAction);
  charMounika.addEventListener("click", onMounikaAction);
}

if (cutBanner) {
  const onBannerAction = (e) => {
    e.stopPropagation();
    cutTheCake();
  };
  cutBanner.addEventListener("pointerdown", onBannerAction);
  cutBanner.addEventListener("click", onBannerAction);
}

// Click / Tap anywhere on cake screen to blow or cut
const handleCakeInteraction = (e) => {
  if (e.target.closest("#post-blow-card") || e.target.closest(".post-actions") || e.target.closest("button")) return;

  if (isCandlesReadyToBlow) {
    blowOutCandles();
  } else if (isKnifeReadyToCut) {
    cutTheCake();
  }
};
cakeScreen.addEventListener("pointerdown", handleCakeInteraction);
cakeScreen.addEventListener("click", handleCakeInteraction);

const interactiveBlowBtn = document.getElementById("interactive-blow-btn");
if (interactiveBlowBtn) {
  interactiveBlowBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    blowOutCandles();
  });
}

// Recut slice button
if (recutBtn) {
  recutBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stopCakeCountdown();
    isCakeCut = false;
    if (cakeStage) {
      cakeStage.classList.remove("is-cut", "anime-focus", "screen-shake");
    }
    if (animeCutContainer) animeCutContainer.classList.remove("slashing");
    if (servedSliceContainer) servedSliceContainer.classList.remove("served");
    if (cakeServer) cakeServer.classList.remove("sliding");
    if (crumbBurst) crumbBurst.classList.remove("pop");
    if (charMounika) charMounika.classList.remove("cutting-3d-active", "cutting-active");
    if (charAaryan) charAaryan.classList.remove("snapping");
    if (charGeethika) charGeethika.classList.remove("cheering");
    if (charAgastya) charAgastya.classList.remove("cheering");
    if (instantPolaroidCard) instantPolaroidCard.classList.remove("show");
    if (mounikaHeldKnife) {
      mounikaHeldKnife.classList.remove("cutting", "hidden");
      mounikaHeldKnife.classList.add("ready", "show");
    }
    postBlowCard.classList.remove("show");
    if (cutBanner) cutBanner.classList.add("show");
    cakeStatusMsg.textContent = "Tap Mounika or her knife to cut the first slice! 🍰";
    isKnifeReadyToCut = true;
  });
}

// Relight candles button (resets candles, knife, characters and starts mic)
relightBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  stopCakeCountdown();
  areCandlesBlown = false;
  isCakeCut = false;
  isKnifeReadyToCut = false;

  if (cakeStage) {
    cakeStage.classList.remove("is-cut", "anime-focus", "screen-shake");
  }
  if (animeCutContainer) animeCutContainer.classList.remove("slashing");
  if (servedSliceContainer) servedSliceContainer.classList.remove("served");
  if (cakeServer) cakeServer.classList.remove("sliding");
  if (crumbBurst) crumbBurst.classList.remove("pop");
  if (charMounika) charMounika.classList.remove("cutting-3d-active", "cutting-active");
  if (charAaryan) charAaryan.classList.remove("snapping");
  if (charGeethika) charGeethika.classList.remove("cheering");
  if (charAgastya) charAgastya.classList.remove("cheering");
  if (instantPolaroidCard) instantPolaroidCard.classList.remove("show");
  if (mounikaHeldKnife) mounikaHeldKnife.classList.remove("show", "cutting", "ready", "hidden");
  if (cutBanner) cutBanner.classList.remove("show");

  candleItems.forEach(c => c.classList.remove("extinguished"));
  candleHalo.classList.add("lit");
  playCandleIgniteSound();
  postBlowCard.classList.remove("show");
  blowBanner.classList.add("show");
  cakeStatusMsg.textContent = "Blow into your microphone 🌬️ (or tap anywhere on screen)";
  isCandlesReadyToBlow = true;
  initMicrophoneDetection();
});

// Next surprise button: launches Memory Balloon Pop Game
if (nextSurpriseBtn) {
  nextSurpriseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stopCakeCountdown();
    triggerConfettiExplosion();
    openBalloonGame();
  });
}

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkPassword();
});

// ==========================================
// CONFETTI CELEBRATION
// ==========================================
function triggerConfettiExplosion() {
  if (typeof confetti === "function") {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#ffd166', '#ff4d8d', '#06d6a0', '#ffffff', '#ff70a6', '#f4a261']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#ffd166', '#ff4d8d', '#06d6a0', '#ffffff', '#ff70a6', '#f4a261']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

// ==========================================
// SCENE 9: MEMORY BALLOON POP GAME
// ==========================================
const balloonGameScreen = document.getElementById("balloon-game-screen");
const balloonSkyArena = document.getElementById("balloon-sky-arena");
const trackerCountEl = document.getElementById("tracker-count");
const unlockedCountEl = document.getElementById("unlocked-count");
const memoryGemPills = document.querySelectorAll(".gem-pill");
const memoryModalOverlay = document.getElementById("memory-modal-overlay");
const modalMemoryArt = document.getElementById("modal-memory-art");
const modalMemoryImg = document.getElementById("modal-memory-img");
const modalMemoryEmoji = document.getElementById("modal-memory-emoji");
const modalMemoryLoc = document.getElementById("modal-memory-loc");
const modalMemorySquad = document.getElementById("modal-memory-squad");
const modalMemoryCaption = document.getElementById("modal-memory-caption");
const modalMemoryTitle = document.getElementById("modal-memory-title");
const modalMemoryStory = document.getElementById("modal-memory-story");
const modalMemoryAuthor = document.getElementById("modal-memory-author");
const collectMemoryBtn = document.getElementById("collect-memory-btn");
const closeModalX = document.getElementById("close-modal-x");
const allCompletedModal = document.getElementById("all-completed-modal");
const memoryGalleryModal = document.getElementById("memory-gallery-modal");
const galleryCardsGrid = document.getElementById("gallery-cards-grid");
const viewUnlockedGalleryBtn = document.getElementById("view-unlocked-gallery-btn");
const openGalleryAllBtn = document.getElementById("open-gallery-all-btn");
const closeGalleryBtn = document.getElementById("close-gallery-btn");
const backToCakeBtn = document.getElementById("back-to-cake-btn");
const restartBalloonsBtn = document.getElementById("restart-balloons-btn");
const balloonReplayStoryBtn = document.getElementById("balloon-replay-story-btn");
const replayAllBtn = document.getElementById("replay-all-btn");

// ==============================================================================
// 💖 SQUAD MEMORIES CONFIGURATION (CUSTOMIZE YOUR PHOTOS & MESSAGES HERE!)
// ==============================================================================
// How to add your own photos:
// 1. Put your photos inside the 'images' folder (e.g. images/memory1.jpg)
// 2. Or paste an image URL or base64 into the 'image' property below!
// 3. If 'image' is left empty (""), it automatically shows the cute emoji & gradient!
// ==============================================================================
const SQUAD_MEMORIES = [
  {
    id: 0,
    image: "images/memory1_foodie.jpg",
    position: "center 25%",
    emoji: "🍛",
    title: "The Undisputed Foodie Queen 🍛😋",
    caption: "Feast Mode • Pure Delicious Joy",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #2d124d 0%, #78290f 50%, #ff7b00 100%)",
    story: "Look at that pure focus and happiness eating like a true connoisseur! Some things never change — from devouring festive feasts with zero regrets to late-night cravings, dining with you is always pure joy, DIII!",
    author: "— Certified Foodie Partner, Agastya 😂"
  },
  {
    id: 1,
    image: "images/memory4_childhood.jpg",
    position: "center 20%",
    emoji: "✨",
    title: "Born to Pose & Rule the World ✨👸",
    caption: "Little Diva • Signature Smile",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #3d1635 0%, #b5179e 50%, #f72585 100%)",
    story: "The hand on the chin, the glittering bangles, and that charming confident smile — you were already a superstar from day one! Even back then, you had that special spark and radiance that brightens up every room.",
    author: "— Adored forever by Geethika 🎀"
  },
  {
    id: 2,
    image: "images/memory3_trophy_cropped.jpg",
    position: "center top",
    emoji: "🏆",
    title: "Our Golden Champion & Squad's Pride 🏆🌟",
    caption: "Trophy Winner • Hard Work & Glory",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #1b263b 0%, #415a77 50%, #d4af37 100%)",
    story: "Seeing you hold that golden trophy with that glowing smile made all of us swell with immense pride! Smart, hardworking, and destined for brilliance — you inspire us every single day to dream bigger and aim higher.",
    author: "— Your #1 Cheering Squad, Aaryan & Agastya 🎓"
  },
  {
    id: 3,
    image: "images/memory5_queen.jpg",
    position: "center 20%",
    emoji: "🌸",
    title: "Grace, Poise & A Heart of Pure Gold 🌸💖",
    caption: "Blessed Vibes • Gentle & Wise",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #2b0938 0%, #5a189a 50%, #9d4edd 100%)",
    story: "Gentle, wise, and grounded — you carry yourself with so much poise and kindness. You are the emotional anchor of our squad, the sister who always listens without judgment, and the friend who makes everyone feel cherished.",
    author: "— Forever grateful, Geethika & Aaryan 🫶"
  },
  {
    id: 4,
    image: "images/memory2_traditional_cropped.jpg",
    position: "center top",
    emoji: "👗",
    title: "The Traditional Queen & Showstopper 👗✨",
    caption: "Golden Elegance • Festival Radiance",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #3c096c 0%, #7b2cbf 50%, #ffb703 100%)",
    story: "Pure grace, stunning elegance, and that iconic million-dollar smile! Whenever you dress up in traditional attire, you completely steal the spotlight. You make every festival and every gathering feel ten times more magical just by being there.",
    author: "— Certified Showstopper by Geethika & The Boys 📸"
  },
  {
    id: 5,
    image: "images/memory6_coaching_squad.jpg",
    position: "center 25%",
    emoji: "🎒",
    title: "The Coaching Gang & Post-Class Chaos 🎒🧡",
    caption: "Orange & Black Squad • Coaching Days",
    location: "",
    squad: "",
    gradient: "linear-gradient(135deg, #78290f 0%, #d97706 50%, #ffb703 100%)",
    story: "Between heavy lectures, doubt-clearing marathons, and exam stress, having you around made every single day unforgettable! Remember the endless gossip outside the center and laughing until our stomachs hurt? Coaching days wouldn't have been half as fun without our DIII!",
    author: "— Your Front-Bench Partners in Crime 🧡"
  },
  {
    id: 6,
    image: "images/memory7_night_selfie.jpg",
    position: "center 30%",
    emoji: "📸",
    title: "One Favourite Place, Infinite Memories 📸✨",
    caption: "Our Post-College Hangout • Where Time Stood Still",
    location: "Our Favourite Spot After College 🏫✨",
    squad: "The Chit-Chat Squad & DIII 💖",
    gradient: "linear-gradient(135deg, #590d22 0%, #a4133c 50%, #ff4d6d 100%)",
    story: "One photo at our absolute favourite place after college — the single spot where we always gathered for our endless conversations. That single place holds so many of our laughs, heart-to-hearts, silly roasts, and unforgettable memories with you. No matter where life takes us, that corner will always be special because of all the moments we shared together with our DIII!",
    author: "— With all our love, Aaryan, Geethika & Agastya 💌"
  },
  {
    id: 7,
    image: "images/memory8_childhood_purple.jpg",
    position: "center 20%",
    emoji: "💜",
    title: "Little Purple Butterfly & Timeless Cuteness 💜🦋",
    caption: "Baby Mounika • Pure Charm & Innocence",
    location: "Cherished Childhood Vault 📸",
    squad: "Baby DIII 👑",
    gradient: "linear-gradient(135deg, #4a154b 0%, #7209b7 50%, #b5179e 100%)",
    story: "Look at this tiny, adorable baby Mounika rocking the purple dress and striped sleeves with those big curious eyes! Even as a little girl, you had that natural charm, gentle smile, and sweetness that everyone falls in love with. Time flies and years pass, but that pure golden heart inside you has never changed. You'll always be our precious DIII! 💜✨",
    author: "— Adored forever by Geethika, Aaryan & Agastya 🎀"
  },
  {
    id: 8,
    image: "images/memory9_childhood_red.jpg",
    position: "center 15%",
    emoji: "🧸",
    title: "Little Boss Queen & Her Teddy Bear 🧸👑",
    caption: "Born Leader • Little Diva in Red",
    location: "Royal Memories Vault ✨",
    squad: "The Queen from Day One 👑",
    gradient: "linear-gradient(135deg, #6a040f 0%, #d00000 50%, #ffba08 100%)",
    story: "Look at that confident pose and cute little pointing finger — ruling her kingdom with her favourite teddy bear from day one! Born to be a queen, full of style in red and white, and already giving main-character energy. No wonder you lead our Chit-Chat squad today with so much love, chaos, and authority! 👑❤️",
    author: "— Certified Boss Queen by The 3 Idiots 🧸✨"
  }
];

let unlockedMemories = new Set();
let balloonSpawnTimer = null;
let isBalloonGameActive = false;
let completedModalShown = false;

// Synthesize Realistic Balloon Pop Audio (Safe Web Audio API)
function playBalloonPopSound() {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (!audioContext) return;
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
    const t = audioContext.currentTime;

    // Pop impulse
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(460, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

    gain.gain.setValueAtTime(0.75, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(t);
    osc.stop(t + 0.1);

    // Sparkle chime
    const chime = audioContext.createOscillator();
    const chimeGain = audioContext.createGain();
    chime.type = "sine";
    chime.frequency.setValueAtTime(987, t + 0.03);
    chime.frequency.exponentialRampToValueAtTime(1318, t + 0.25);

    chimeGain.gain.setValueAtTime(0.35, t + 0.03);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    chime.connect(chimeGain);
    chimeGain.connect(audioContext.destination);
    chime.start(t + 0.03);
    chime.stop(t + 0.32);
  } catch (err) {
    // Graceful fallback if Web Audio is restricted
    console.warn("Pop audio:", err);
  }
}

// Particle Pop Burst Effect
function createBalloonPopParticles(x, y, theme) {
  if (!balloonSkyArena) return;
  const burst = document.createElement("div");
  burst.className = "balloon-pop-burst";
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;

  const colors = {
    "b-pink": ["#ff4d8d", "#ff8fab", "#ffffff", "#ffd166"],
    "b-gold": ["#ffd166", "#fff7ad", "#ff8533", "#ffffff"],
    "b-purple": ["#9d4edd", "#c77dff", "#ffffff", "#ffd166"],
    "b-cyan": ["#48cae4", "#00b4d8", "#ffffff", "#ffd166"],
    "b-coral": ["#ff7b00", "#ff4d6d", "#ffffff", "#ffd166"],
    "b-mint": ["#52b788", "#70e000", "#ffffff", "#ffd166"]
  };
  const colorPalette = colors[theme] || ["#ffd166", "#ff4d8d", "#ffffff"];

  for (let i = 0; i < 14; i++) {
    const frag = document.createElement("div");
    frag.className = "pop-fragment";
    const angle = (i / 14) * 2 * Math.PI + (Math.random() - 0.5);
    const dist = 35 + Math.random() * 55;
    const fx = Math.cos(angle) * dist;
    const fy = Math.sin(angle) * dist;
    frag.style.setProperty("--fx", `${fx}px`);
    frag.style.setProperty("--fy", `${fy}px`);
    frag.style.setProperty("--fr", `${Math.random() * 360}deg`);
    frag.style.backgroundColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const size = 5 + Math.random() * 6;
    frag.style.width = `${size}px`;
    frag.style.height = `${size}px`;
    burst.appendChild(frag);
  }

  balloonSkyArena.appendChild(burst);
  setTimeout(() => burst.remove(), 700);
}

// Spawn a single floating balloon rising from down to up
function spawnFloatingBalloon() {
  if (!isBalloonGameActive || !balloonSkyArena) return;

  const currentBalloons = balloonSkyArena.querySelectorAll(".floating-balloon");
  if (currentBalloons.length >= 8) return;

  const balloon = document.createElement("div");
  const themes = ["b-pink", "b-gold", "b-purple", "b-cyan", "b-coral", "b-mint"];
  const chosenTheme = themes[Math.floor(Math.random() * themes.length)];
  balloon.className = `floating-balloon ${chosenTheme}`;

  const leftPercent = 6 + Math.random() * 82; // 6% to 88%
  const duration = 8.5 + Math.random() * 4.5; // 8.5s to 13s
  const swayDuration = 2.4 + Math.random() * 1.5;

  balloon.style.left = `${leftPercent}%`;
  balloon.style.animation = `balloonRiseFloat ${duration}s linear forwards, balloonSway ${swayDuration}s ease-in-out infinite alternate`;

  const icons = ["💖", "✨", "🎁", "🍜", "🎀", "📸", "👑", "🍰", "💌", "💜", "🧸"];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  balloon.innerHTML = `
    <div class="balloon-body">
      <div class="balloon-shine"></div>
      <span class="balloon-icon">${randomIcon}</span>
      <div class="balloon-knot"></div>
    </div>
    <div class="balloon-string"></div>
  `;

  // Instant Click / Pointerdown / Touch to pop
  const handleBalloonPop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    popBalloon(balloon, chosenTheme);
  };

  balloon.addEventListener("pointerdown", handleBalloonPop);
  balloon.addEventListener("touchstart", handleBalloonPop, { passive: false });
  balloon.addEventListener("click", handleBalloonPop);

  balloonSkyArena.appendChild(balloon);

  // Auto clean up after floating past top
  setTimeout(() => {
    if (balloon.parentNode === balloonSkyArena) {
      balloon.remove();
    }
  }, duration * 1000 + 500);
}

// Global Event Delegation on Arena for 100% reliable click/tap capture
if (balloonSkyArena) {
  const onArenaTap = (e) => {
    const targetBalloon = e.target.closest(".floating-balloon");
    if (targetBalloon && !targetBalloon._isPopped) {
      e.stopPropagation();
      e.preventDefault();
      const theme = Array.from(targetBalloon.classList).find(c => c.startsWith("b-")) || "b-pink";
      popBalloon(targetBalloon, theme);
    }
  };
  balloonSkyArena.addEventListener("pointerdown", onArenaTap);
  balloonSkyArena.addEventListener("touchstart", onArenaTap, { passive: false });
  balloonSkyArena.addEventListener("click", onArenaTap);
}

function startBalloonSpawner() {
  stopBalloonSpawner();
  isBalloonGameActive = true;
  // Initial staggered spawn
  for (let i = 0; i < 4; i++) {
    setTimeout(spawnFloatingBalloon, i * 450);
  }
  balloonSpawnTimer = setInterval(spawnFloatingBalloon, 1400);
}

function stopBalloonSpawner() {
  isBalloonGameActive = false;
  if (balloonSpawnTimer) {
    clearInterval(balloonSpawnTimer);
    balloonSpawnTimer = null;
  }
}

// Pop a balloon and reveal a memory
function popBalloon(balloonEl, theme) {
  if (!balloonEl || balloonEl._isPopped) return;
  balloonEl._isPopped = true;

  const rect = balloonEl.getBoundingClientRect();
  const arenaRect = balloonSkyArena ? balloonSkyArena.getBoundingClientRect() : { left: 0, top: 0 };
  const x = (rect.left - arenaRect.left) + rect.width / 2;
  const y = (rect.top - arenaRect.top) + rect.height / 3;

  playBalloonPopSound();
  createBalloonPopParticles(x, y, theme);
  balloonEl.remove();

  // Find uncollected memories first
  const uncollected = [];
  for (let i = 0; i < SQUAD_MEMORIES.length; i++) {
    if (!unlockedMemories.has(i)) uncollected.push(i);
  }

  let memoryIndexToShow;
  if (uncollected.length > 0) {
    // Show next uncollected memory in order
    memoryIndexToShow = uncollected[0];
    unlockedMemories.add(memoryIndexToShow);
    updateMemoryTracker();
  } else {
    // All already unlocked, pick a random favorite
    memoryIndexToShow = Math.floor(Math.random() * SQUAD_MEMORIES.length);
  }

  showMemoryModal(SQUAD_MEMORIES[memoryIndexToShow]);
}

// Update the live tracker UI
function updateMemoryTracker() {
  const count = unlockedMemories.size;
  const total = SQUAD_MEMORIES.length;
  if (trackerCountEl) trackerCountEl.textContent = `${count} / ${total}`;
  if (unlockedCountEl) unlockedCountEl.textContent = count;

  const currentPills = document.querySelectorAll(".gem-pill");
  currentPills.forEach((pill) => {
    const idx = parseInt(pill.getAttribute("data-idx"));
    if (unlockedMemories.has(idx)) {
      pill.classList.add("unlocked");
    } else {
      pill.classList.remove("unlocked");
    }
  });

  // Check if all unlocked
  if (count === total && !completedModalShown) {
    setTimeout(() => {
      triggerConfettiExplosion();
      playVictoryFanfare();
    }, 600);
  }
}

// Display the Memory Reveal Modal
function showMemoryModal(mem) {
  if (!memoryModalOverlay) return;

  if (modalMemoryImg) {
    if (mem.image && mem.image.trim() !== "") {
      modalMemoryImg.src = mem.image;
      modalMemoryImg.style.display = "block";
      modalMemoryImg.style.objectPosition = mem.position || "center 20%";
      if (modalMemoryEmoji) modalMemoryEmoji.style.display = "none";
    } else {
      modalMemoryImg.style.display = "none";
      modalMemoryImg.src = "";
      if (modalMemoryEmoji) modalMemoryEmoji.style.display = "block";
    }
  }

  if (modalMemoryArt) modalMemoryArt.style.background = mem.gradient;
  if (modalMemoryEmoji) modalMemoryEmoji.textContent = mem.emoji;
  if (modalMemoryLoc) modalMemoryLoc.textContent = mem.location;
  if (modalMemorySquad) modalMemorySquad.textContent = mem.squad;
  if (modalMemoryCaption) modalMemoryCaption.textContent = mem.caption;
  if (modalMemoryTitle) modalMemoryTitle.textContent = mem.title;
  if (modalMemoryStory) modalMemoryStory.textContent = mem.story;
  if (modalMemoryAuthor) modalMemoryAuthor.textContent = mem.author;

  memoryModalOverlay.classList.add("active");
}

let balloonToGiftsInterval = null;

function startBalloonToGiftsCountdown() {
  stopBalloonCountdown();
  let seconds = 60;
  const secEl = document.getElementById("balloon-countdown-sec");
  if (secEl) secEl.textContent = seconds;

  balloonToGiftsInterval = setInterval(() => {
    seconds--;
    if (secEl) secEl.textContent = seconds;
    if (seconds <= 0) {
      stopBalloonCountdown();
      if (allCompletedModal) allCompletedModal.classList.remove("active");
      openGiftsScreen();
    }
  }, 1000);
}

function stopBalloonCountdown() {
  if (balloonToGiftsInterval) {
    clearInterval(balloonToGiftsInterval);
    balloonToGiftsInterval = null;
  }
}

function hideMemoryModal() {
  if (memoryModalOverlay) {
    memoryModalOverlay.classList.remove("active");
  }

  // If all unlocked and completed modal not shown yet, reveal it!
  if (unlockedMemories.size === SQUAD_MEMORIES.length && !completedModalShown) {
    completedModalShown = true;
    setTimeout(() => {
      if (allCompletedModal) allCompletedModal.classList.add("active");
      triggerConfettiExplosion();
      startBalloonToGiftsCountdown();
    }, 400);
  }
}

// Open the Balloon Game Screen from Cake scene
function openBalloonGame() {
  stopMicrophoneDetection();
  stopCakeCountdown();
  stopBalloonCountdown();
  if (cakeScreen) cakeScreen.classList.remove("active");
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  if (balloonGameScreen) balloonGameScreen.classList.add("active");
  startBalloonSpawner();
}

// Return to Cake Screen
function returnToCake() {
  stopBalloonSpawner();
  stopCakeCountdown();
  stopBalloonCountdown();
  if (balloonGameScreen) balloonGameScreen.classList.remove("active");
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  if (cakeScreen) cakeScreen.classList.add("active");
}

// Render the Memory Album Gallery
function renderMemoryGallery() {
  if (!galleryCardsGrid) return;
  galleryCardsGrid.innerHTML = "";

  SQUAD_MEMORIES.forEach((mem, idx) => {
    const isUnlocked = unlockedMemories.has(idx);
    const card = document.createElement("div");
    card.className = `gallery-polaroid-card ${isUnlocked ? "" : "locked"}`;
    card.innerHTML = `
      <div class="g-photo" style="${isUnlocked && !mem.image ? `background: ${mem.gradient};` : ''}">
        ${isUnlocked ? (mem.image ? `<img src="${mem.image}" class="g-thumb" style="object-position: ${mem.position || 'center 20%'};" alt="${mem.title}"/>` : mem.emoji) : "🔒"}
      </div>
      <div class="g-title">${isUnlocked ? mem.title : `Secret Memory #${idx + 1}`}</div>
      <div class="g-snippet">
        ${isUnlocked ? mem.story : "Pop more balloons in the sky to unlock this memory!"}
      </div>
    `;

    if (isUnlocked) {
      card.addEventListener("click", () => {
        if (memoryGalleryModal) memoryGalleryModal.classList.remove("active");
        showMemoryModal(mem);
      });
    }

    galleryCardsGrid.appendChild(card);
  });
}

// Modal and Navigation Event Listeners
if (collectMemoryBtn) collectMemoryBtn.addEventListener("click", hideMemoryModal);
if (closeModalX) closeModalX.addEventListener("click", hideMemoryModal);
if (backToCakeBtn) backToCakeBtn.addEventListener("click", returnToCake);

if (viewUnlockedGalleryBtn) {
  viewUnlockedGalleryBtn.addEventListener("click", () => {
    renderMemoryGallery();
    if (memoryGalleryModal) memoryGalleryModal.classList.add("active");
  });
}

if (openGalleryAllBtn) {
  openGalleryAllBtn.addEventListener("click", () => {
    stopBalloonCountdown();
    if (allCompletedModal) allCompletedModal.classList.remove("active");
    renderMemoryGallery();
    if (memoryGalleryModal) memoryGalleryModal.classList.add("active");
  });
}

if (closeGalleryBtn) {
  closeGalleryBtn.addEventListener("click", () => {
    if (memoryGalleryModal) memoryGalleryModal.classList.remove("active");
  });
}

if (restartBalloonsBtn) {
  restartBalloonsBtn.addEventListener("click", () => {
    stopBalloonCountdown();
    if (allCompletedModal) allCompletedModal.classList.remove("active");
  });
}

// Full Replay Functionality
function resetAllToStart() {
  unlockedMemories.clear();
  completedModalShown = false;
  updateMemoryTracker();
  stopMicrophoneDetection();
  stopBalloonSpawner();
  stopCakeCountdown();
  stopBalloonCountdown();
  if (balloonSkyArena) balloonSkyArena.innerHTML = "";
  if (balloonGameScreen) balloonGameScreen.classList.remove("active");
  if (allCompletedModal) allCompletedModal.classList.remove("active");
  if (memoryModalOverlay) memoryModalOverlay.classList.remove("active");
  if (memoryGalleryModal) memoryGalleryModal.classList.remove("active");
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  rewrapAllGifts();
  cakeScreen.classList.remove("active");
  guardianScreen.classList.remove("active");
  if (cakeStage) {
    cakeStage.classList.remove("is-cut", "anime-focus", "screen-shake");
  }
  if (animeCutContainer) animeCutContainer.classList.remove("slashing");
  if (charMounika) charMounika.classList.remove("cutting-3d-active", "cutting-active");
  if (mounikaHeldKnife) mounikaHeldKnife.classList.remove("show", "cutting", "ready", "hidden");
  if (charAaryan) charAaryan.classList.remove("snapping");
  if (charGeethika) charGeethika.classList.remove("cheering");
  if (charAgastya) charAgastya.classList.remove("cheering");
  if (instantPolaroidCard) instantPolaroidCard.classList.remove("show");
  document.getElementById("cinematic-container").style.display = "flex";
  document.querySelector(".top-nav").style.display = "flex";
  hintBox.classList.remove("show");
  errorMsg.style.display = "none";
  passwordInput.value = "";
  goToScene(1);
}

// Replay buttons
const replayBtn = document.getElementById("replay-btn");
if (replayBtn) replayBtn.addEventListener("click", resetAllToStart);
if (balloonReplayStoryBtn) balloonReplayStoryBtn.addEventListener("click", resetAllToStart);
if (replayAllBtn) replayAllBtn.addEventListener("click", resetAllToStart);

// ==========================================================================
// SCENE: 3 SURPRISE GIFTS FROM THE SQUAD (AARYAN, GEETHIKA, AGASTYA)
// ==========================================================================
const giftsScreen = document.getElementById("gifts-screen");
const unwrapAllGiftsBtn = document.getElementById("unwrap-all-gifts-btn");
const rewrapAllGiftsBtn = document.getElementById("rewrap-all-gifts-btn");
const cakeToGiftsBtn = document.getElementById("cake-to-gifts-btn");
const balloonHeaderGiftsBtn = document.getElementById("balloon-header-gifts-btn");
const balloonToGiftsBtn = document.getElementById("balloon-to-gifts-btn");
const giftsBackToBalloonsBtn = document.getElementById("gifts-back-to-balloons-btn");
const giftsBackToCakeBtn = document.getElementById("gifts-back-to-cake-btn");
const giftsReplayAllBtn = document.getElementById("gifts-replay-all-btn");

// Squad Gifts Configuration
const SQUAD_GIFTS = {
  aaryan: {
    sender: "aaryan",
    name: "Aaryan",
    colors: ["#00f5d4", "#4cc9f0", "#4361ee", "#ffffff", "#ffd166"]
  },
  geethika: {
    sender: "geethika",
    name: "Geethika",
    colors: ["#ff4d6d", "#ff758f", "#f72585", "#ffffff", "#ffd166"]
  },
  agastya: {
    sender: "agastya",
    name: "Agastya",
    colors: ["#ffbe0b", "#fb8500", "#ff006e", "#ffffff", "#ffeaa7"]
  }
};

// Synthesize Joyful Gift Unwrap Audio Chime (Safe Web Audio API)
function playGiftUnwrapSound() {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (!audioContext) return;
    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    const t = audioContext.currentTime;

    // Harmonic chime arpeggio: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const startTime = t + (idx * 0.07);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.28, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.48);
    });
  } catch (err) {
    console.warn("Gift unwrap audio error:", err);
  }
}

// Unwrap a single gift box
function unwrapGift(senderKey) {
  const card = document.getElementById(`gift-card-${senderKey}`);
  if (!card) return;

  if (!card.classList.contains("is-unwrapped")) {
    card.classList.add("is-unwrapped");
    playGiftUnwrapSound();

    const giftConfig = SQUAD_GIFTS[senderKey];
    const colors = giftConfig ? giftConfig.colors : ["#ffd166", "#ff4d6d", "#00f5d4"];

    if (typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.58 },
        colors: colors
      });
    }
  }
}

// Rewrap a single gift box
function rewrapGift(senderKey) {
  const card = document.getElementById(`gift-card-${senderKey}`);
  if (card) {
    card.classList.remove("is-unwrapped");
  }
}

// Master Unwrap All 3 Gifts
function unwrapAllGifts() {
  const senders = ["aaryan", "geethika", "agastya"];
  senders.forEach((s, idx) => {
    setTimeout(() => {
      unwrapGift(s);
    }, idx * 220);
  });

  setTimeout(() => {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 95,
        origin: { y: 0.5 },
        colors: ["#ffd166", "#ff4d6d", "#00f5d4", "#f72585", "#ffbe0b"]
      });
    }
  }, 500);
}

// Master Rewrap All 3 Gifts
function rewrapAllGifts() {
  ["aaryan", "geethika", "agastya"].forEach((s) => {
    rewrapGift(s);
  });
}

// Open the Gifts Screen
function openGiftsScreen() {
  stopMicrophoneDetection();
  stopBalloonSpawner();
  stopCakeCountdown();
  stopBalloonCountdown();

  if (cakeScreen) cakeScreen.classList.remove("active");
  if (balloonGameScreen) balloonGameScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  if (memoryModalOverlay) memoryModalOverlay.classList.remove("active");
  if (memoryGalleryModal) memoryGalleryModal.classList.remove("active");
  if (allCompletedModal) allCompletedModal.classList.remove("active");

  if (giftsScreen) {
    giftsScreen.classList.add("active");
    giftsScreen.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (typeof confetti === "function") {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.3 }
    });
  }
}

// Return from Gifts Screen to Balloon Game
function returnFromGiftsToBalloons() {
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  openBalloonGame();
}

// Return from Gifts Screen to Cake Screen
function returnFromGiftsToCake() {
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (finalTouchScreen) finalTouchScreen.classList.remove("active");
  returnToCake();
}

// Gift box click triggers
["aaryan", "geethika", "agastya"].forEach((s) => {
  const box = document.getElementById(`gift-box-${s}`);
  if (box) {
    box.addEventListener("click", () => unwrapGift(s));
  }
});

// Fold / Close buttons inside revealed letters
document.querySelectorAll(".fold-gift-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const targetSender = btn.getAttribute("data-target");
    if (targetSender) rewrapGift(targetSender);
  });
});

// Geethika & Mounika special memory photo modal trigger
const geethikaMemoryCard = document.getElementById("geethika-memory-card");
if (geethikaMemoryCard) {
  geethikaMemoryCard.addEventListener("click", () => {
    if (typeof showMemoryModal === "function") {
      showMemoryModal({
        title: "Just a Friday ✨",
        location: "Cherished Squad Moment 📸",
        squad: "Geethika & Mounika 💖",
        caption: "Best Friends & Soul Sisters Forever",
        story: "From hilarious conversations and crazy laughter to unforgettable days together... literal ga each and every moment spent with you is a pure treasure. Happy Birthday Mounika brooooo! 🎀✨",
        author: "— Adored forever by Geethika 💖",
        image: "images/geethika_mounika_memory.jpg",
        position: "center 20%"
      });
    }
  });
}

// Master Unwrap / Rewrap controls
if (unwrapAllGiftsBtn) unwrapAllGiftsBtn.addEventListener("click", unwrapAllGifts);
if (rewrapAllGiftsBtn) rewrapAllGiftsBtn.addEventListener("click", rewrapAllGifts);

// Navigation triggers to Gifts Screen
if (cakeToGiftsBtn) cakeToGiftsBtn.addEventListener("click", openGiftsScreen);
if (balloonHeaderGiftsBtn) balloonHeaderGiftsBtn.addEventListener("click", openGiftsScreen);
if (balloonToGiftsBtn) {
  balloonToGiftsBtn.addEventListener("click", () => {
    stopBalloonCountdown();
    if (allCompletedModal) allCompletedModal.classList.remove("active");
    openGiftsScreen();
  });
}

// Navigation triggers from Gifts Screen
if (giftsBackToBalloonsBtn) giftsBackToBalloonsBtn.addEventListener("click", returnFromGiftsToBalloons);
if (giftsBackToCakeBtn) giftsBackToCakeBtn.addEventListener("click", returnFromGiftsToCake);
if (giftsReplayAllBtn) giftsReplayAllBtn.addEventListener("click", resetAllToStart);

// ==========================================================================
// SCENE 11: THE FINAL TOUCH (GRAND FINALE)
// ==========================================================================
const finalTouchScreen = document.getElementById("final-touch-screen");
const giftsToFinalTouchBtn = document.getElementById("gifts-to-final-touch-btn");
const finalToGiftsBtn = document.getElementById("final-to-gifts-btn");
const finalToBalloonsBtn = document.getElementById("final-to-balloons-btn");
const finalToCakeBtn = document.getElementById("final-to-cake-btn");
const finalReplayAllBtn = document.getElementById("final-replay-all-btn");

function openFinalTouchScreen() {
  stopMicrophoneDetection();
  stopBalloonSpawner();
  stopCakeCountdown();
  stopBalloonCountdown();

  if (cakeScreen) cakeScreen.classList.remove("active");
  if (balloonGameScreen) balloonGameScreen.classList.remove("active");
  if (giftsScreen) giftsScreen.classList.remove("active");
  if (memoryModalOverlay) memoryModalOverlay.classList.remove("active");
  if (allCompletedModal) allCompletedModal.classList.remove("active");
  if (memoryGalleryModal) memoryGalleryModal.classList.remove("active");

  if (finalTouchScreen) {
    finalTouchScreen.classList.add("active");
    finalTouchScreen.scrollTo({ top: 0, behavior: "smooth" });
  }

  triggerConfettiExplosion();
  playVictoryFanfare();
}

// Final Touch Navigation Triggers
if (giftsToFinalTouchBtn) giftsToFinalTouchBtn.addEventListener("click", openFinalTouchScreen);
if (finalToGiftsBtn) finalToGiftsBtn.addEventListener("click", openGiftsScreen);
if (finalToBalloonsBtn) finalToBalloonsBtn.addEventListener("click", openBalloonGame);
if (finalToCakeBtn) finalToCakeBtn.addEventListener("click", returnToCake);
if (finalReplayAllBtn) finalReplayAllBtn.addEventListener("click", resetAllToStart);

const finalToGiftsCard = document.getElementById("final-to-gifts-card");
const finalToBalloonsCard = document.getElementById("final-to-balloons-card");
const finalToCakeCard = document.getElementById("final-to-cake-card");
const finalReplayAllCard = document.getElementById("final-replay-all-card");

if (finalToGiftsCard) finalToGiftsCard.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") openGiftsScreen();
});
if (finalToBalloonsCard) finalToBalloonsCard.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") openBalloonGame();
});
if (finalToCakeCard) finalToCakeCard.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") returnToCake();
});
if (finalReplayAllCard) finalReplayAllCard.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") resetAllToStart();
});

// ==========================================
// FEATURE 3: "SEND LOVE TO DIII" HEART STORM
// ==========================================
const heartStormBtn = document.getElementById("heart-storm-btn");
const heartCounterEl = document.getElementById("heart-counter");
const heartStormParticles = document.getElementById("heart-storm-particles");
const heartMilestoneToast = document.getElementById("heart-milestone-toast");

let heartCount = parseInt(localStorage.getItem("mounika_heart_count") || "1250", 10);
if (heartCounterEl) heartCounterEl.textContent = heartCount.toLocaleString();

const HEART_EMOJIS = ["❤️", "💖", "💝", "💗", "💓", "👑", "✨", "🎂", "🌸", "🍫", "🥰"];
const MILESTONE_MESSAGES = [
  "Maximum Love Overload for DIII! 🥰💖",
  "The Sweetest Akka in the Entire Universe! 👑✨",
  "Squad Loves You To The Moon & Back! 🌙❤️",
  "Endless Hugs & Blessings for DIII! 🌸🎂",
  "Forever Grateful For You, Akka! 💌💫"
];

function triggerHeartBurst() {
  heartCount++;
  if (heartCounterEl) heartCounterEl.textContent = heartCount.toLocaleString();
  localStorage.setItem("mounika_heart_count", heartCount.toString());

  // Gentle micro-tone via Web Audio
  initAudio();
  playChimeTone(480 + (heartCount % 12) * 35, 0.16);

  // Spawn 2-3 floating emojis
  const count = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < count; i++) {
    createFloatingHeart();
  }

  // Check milestones
  if (heartCount % 25 === 0 && heartMilestoneToast) {
    const msg = MILESTONE_MESSAGES[Math.floor(Math.random() * MILESTONE_MESSAGES.length)];
    heartMilestoneToast.textContent = msg;
    heartMilestoneToast.classList.add("show");
    playSuccessChime();
    setTimeout(() => heartMilestoneToast.classList.remove("show"), 2400);
  }
}

function createFloatingHeart() {
  if (!heartStormParticles) return;
  const particle = document.createElement("span");
  particle.className = "floating-heart-particle";
  particle.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

  const dx1 = (Math.random() * 60 - 30) + "px";
  const dx2 = (Math.random() * 90 - 45) + "px";
  const dx3 = (Math.random() * 110 - 55) + "px";
  const rot1 = (Math.random() * 40 - 20) + "deg";
  const rot2 = (Math.random() * 60 - 30) + "deg";
  const rot3 = (Math.random() * 50 - 25) + "deg";

  particle.style.setProperty("--dx1", dx1);
  particle.style.setProperty("--dx2", dx2);
  particle.style.setProperty("--dx3", dx3);
  particle.style.setProperty("--rot1", rot1);
  particle.style.setProperty("--rot2", rot2);
  particle.style.setProperty("--rot3", rot3);

  heartStormParticles.appendChild(particle);
  setTimeout(() => particle.remove(), 2300);
}

if (heartStormBtn) {
  heartStormBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerHeartBurst();
  });
}

// ==========================================
// FEATURE 2: SQUAD'S NEXT 2 YEARS BUCKET LIST
// ==========================================
const bucketGoals = document.querySelectorAll(".bucket-goal-item");
const bucketProgressFill = document.getElementById("bucket-progress-fill");
const bucketProgressLabel = document.getElementById("bucket-progress-label");
const bucketProgressPct = document.getElementById("bucket-progress-pct");
const bucketAllDoneBanner = document.getElementById("bucket-all-done-banner");

let bucketState = [];
try {
  bucketState = JSON.parse(localStorage.getItem("squad_bucket_list") || "[false,false,false,false,false,false,false,false]");
} catch (e) {
  bucketState = [false, false, false, false, false, false, false, false];
}

function updateBucketUI() {
  let completedCount = 0;
  bucketGoals.forEach((item, idx) => {
    const isDone = !!bucketState[idx];
    if (isDone) {
      item.classList.add("completed");
      completedCount++;
    } else {
      item.classList.remove("completed");
    }
  });

  const total = bucketGoals.length || 8;
  const pct = Math.round((completedCount / total) * 100);

  if (bucketProgressFill) bucketProgressFill.style.width = pct + "%";
  if (bucketProgressLabel) bucketProgressLabel.textContent = `${completedCount} of ${total} Goals Sealed`;
  if (bucketProgressPct) bucketProgressPct.textContent = pct + "%";

  if (bucketAllDoneBanner) {
    if (completedCount === total) {
      bucketAllDoneBanner.style.display = "flex";
    } else {
      bucketAllDoneBanner.style.display = "none";
    }
  }
}

bucketGoals.forEach((item, idx) => {
  item.addEventListener("click", () => {
    bucketState[idx] = !bucketState[idx];
    localStorage.setItem("squad_bucket_list", JSON.stringify(bucketState));
    updateBucketUI();

    if (bucketState[idx]) {
      playSuccessChime();
      if (bucketState.every(Boolean)) {
        triggerConfettiExplosion();
      }
    } else {
      playChimeTone(300, 0.2);
    }
  });
});
updateBucketUI();

// ==========================================
// FEATURE 1: BEST AKKA CERTIFICATE
// ==========================================
const printCertBtn = document.getElementById("print-cert-btn");
const stampSealBtn = document.getElementById("stamp-seal-btn");
const certGoldSeal = document.getElementById("cert-gold-seal");

if (printCertBtn) {
  printCertBtn.addEventListener("click", () => {
    window.print();
  });
}

function stampRoyalSeal() {
  if (certGoldSeal) {
    certGoldSeal.style.transform = "scale(1.25) rotate(12deg)";
    setTimeout(() => {
      certGoldSeal.style.transform = "";
    }, 450);
  }
  playSuccessChime();
  triggerConfettiExplosion();
}

if (stampSealBtn) stampSealBtn.addEventListener("click", stampRoyalSeal);
if (certGoldSeal) certGoldSeal.addEventListener("click", stampRoyalSeal);



