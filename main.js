import { gsap } from 'gsap';
import { createClient } from '@supabase/supabase-js';
import Matter from 'matter-js';

// ===== SUPABASE CONFIGURATION =====
// TODO: Replace with your Supabase credentials
// Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
const SUPABASE_URL = 'https://gqumovfetjwyfcuaxznn.supabase.co'; // Example: 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdW1vdmZldGp3eWZjdXaxznnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTMwOTcsImV4cCI6MjA4NjUyOTA5N30.EEokBuxqFat_wsRhD4b4tORz7Ell48Sd0xGiHNN1Mts'; // Your anon/public key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== MUSIC CONFIGURATION =====
const MUSIC_VOLUME = 0.5; // Adjust volume (0.0 to 1.0)
let backgroundMusic;
let lyricsData = []; // Parsed lyrics with timestamps
let lyricsInterval; // Interval for checking current lyric

// ===== PARSE LRC FORMAT =====
function parseLRC(lrcText) {
  const lines = lrcText.split('\n');
  const lyrics = [];

  lines.forEach(line => {
    // Match timestamp format [mm:ss.xx]
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const centiseconds = parseInt(match[3]);
      const text = match[4].trim();

      // Convert to total seconds
      const time = minutes * 60 + seconds + centiseconds / 100;

      if (text) { // Only add non-empty lyrics
        lyrics.push({ time, text });
      }
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
}

// ===== LOAD LYRICS FROM FILE =====
async function loadLyrics() {
  try {
    const response = await fetch('/lyrics.lrc');
    const lrcText = await response.text();
    lyricsData = parseLRC(lrcText);
    console.log('Lyrics loaded:', lyricsData.length, 'lines');
  } catch (error) {
    console.error('Error loading lyrics:', error);
  }
}
// ===== DOM ELEMENTS =====
const heartSeal = document.getElementById('heart-seal');
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const heartExplosion = document.getElementById('heart-explosion');
const backgroundContainer = document.getElementById('background-container');

// ===== STATE =====
let letterOpened = false;
let yesButtonScale = 1;
let responseRecorded = false;

// ===== INITIALIZE =====
function init() {
  createFallingElements();
  setupEventListeners();
  backgroundMusic = document.getElementById('background-music');
  backgroundMusic.volume = MUSIC_VOLUME;
  loadLyrics(); // Load lyrics file

  // Initialize karaoke in background (hidden)
  setTimeout(() => {
    initializeKaraoke();
  }, 1000); // Wait for lyrics to load
}

// ===== CREATE FALLING BACKGROUND ELEMENTS =====
function createFallingElements() {
  const numberOfElements = 200;

  // SVG creation functions for different element types
  const svgElements = {
    heart: (size, color) => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
      path.setAttribute('fill', color);
      svg.appendChild(path);
      return svg;
    },
    cloud: (size, color) => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z');
      path.setAttribute('fill', color);
      svg.appendChild(path);
      return svg;
    }
  };

  const elementTypes = ['heart', 'cloud'];
  const heartColors = ['#ff1744', '#f50057', '#e91e63', '#ff4081', '#ff80ab', '#ec407a', '#f06292'];
  const cloudColor = '#ffffff'; // White clouds

  for (let i = 0; i < numberOfElements; i++) {
    const element = document.createElement('div');
    element.className = 'falling-element';

    // Random element type
    const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    const size = 30 + Math.random() * 30; // 30-60px

    // Choose color based on type
    let color;
    if (type === 'heart') {
      color = heartColors[Math.floor(Math.random() * heartColors.length)];
    } else {
      color = cloudColor;
    }

    // Create SVG element
    const svgElement = svgElements[type](size, color);
    element.appendChild(svgElement);

    // Random horizontal position
    element.style.left = `${Math.random() * 100}%`;

    // Random animation duration (slower = more romantic)
    const duration = 8 + Math.random() * 10; // 8-18 seconds
    element.style.animationDuration = `${duration}s`;

    // Random delay for staggered effect
    element.style.animationDelay = `${Math.random() * 5}s`;

    backgroundContainer.appendChild(element);
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  heartSeal.addEventListener('click', openLetter);
  btnYes.addEventListener('click', handleYesClick);
  btnNo.addEventListener('click', handleNoClick);
}

// ===== OPEN LETTER ANIMATION =====
function openLetter() {
  if (letterOpened) return;
  letterOpened = true;

  // Start music when user clicks heart
  playMusic();

  // Create GSAP timeline for smooth sequential animations
  const timeline = gsap.timeline();

  // 1. Heart seal disappears
  timeline.to(heartSeal, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.in'
  });

  // 2. Envelope flap opens
  timeline.to('.envelope-flap', {
    rotationX: -180,
    duration: 0.8,
    ease: 'power2.inOut'
  }, '-=0.2');

  // 3. Letter slides up and out
  timeline.to(letter, {
    top: '-10%',
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.4');

  // 4. Letter content fades in
  timeline.to('.letter-content', {
    opacity: 1,
    duration: 0.6,
    ease: 'power1.out'
  });
}

// ===== PLAY BACKGROUND MUSIC =====
function playMusic() {
  backgroundMusic.play().catch(err => {
    console.log('Music autoplay prevented. User interaction required.');
    // Fallback: music will play on next user interaction
  });
}

// ===== HANDLE "NO" BUTTON CLICK =====
function handleNoClick(e) {
  e.preventDefault();

  // Prevent default action (button is disabled visually)
  // Each click makes "Yes" button bigger
  yesButtonScale += 0.2;

  gsap.to(btnYes, {
    scale: yesButtonScale,
    duration: 0.3,
    ease: 'back.out'
  });

  // Add a little shake to "No" button to show it's disabled
  gsap.to(btnNo, {
    x: -10,
    duration: 0.1,
    yoyo: true,
    repeat: 3,
    ease: 'power1.inOut'
  });
}

// ===== HANDLE "YES" BUTTON CLICK =====
async function handleYesClick() {
  if (responseRecorded) return;

  // Disable buttons
  btnYes.style.pointerEvents = 'none';
  btnNo.style.pointerEvents = 'none';

  // Record response in database
  await recordResponse(true);

  // Trigger heart explosion
  createHeartExplosion();

  // Hide buttons with animation
  gsap.to('.checkbox-container', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5
  });
}

// ===== CREATE HEART EXPLOSION EFFECT WITH PHYSICS =====
function createHeartExplosion() {
  // SVG heart colors (optimized for Valentine's theme)
  const heartColors = [
    '#ff1744', // Red
    '#f50057', // Pink
    '#e91e63', // Deep pink
    '#ff4081', // Light pink
    '#ff6090', // Rose
    '#ff80ab', // Soft pink
    '#ec407a', // Medium pink
    '#f06292'  // Pale pink
  ];

  // Function to create SVG heart element
  function createSVGHeart(color, size) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.display = 'block';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // Optimized heart path
    path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    path.setAttribute('fill', color);

    svg.appendChild(path);
    return svg;
  }

  // Create Matter.js engine
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Runner = Matter.Runner;

  const engine = Engine.create();
  engine.world.gravity.y = 2; // Gravity strength

  // Create invisible canvas for physics (we'll use DOM elements for visuals)
  const render = Render.create({
    element: heartExplosion,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: 'transparent'
    }
  });

  // Hide the canvas (we'll use DOM elements instead)
  render.canvas.style.display = 'none';

  // Create ground and walls (invisible boundaries)
  const ground = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + 25,
    window.innerWidth,
    50,
    { isStatic: true }
  );

  const leftWall = Bodies.rectangle(
    -25,
    window.innerHeight / 2,
    50,
    window.innerHeight,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    window.innerWidth + 25,
    window.innerHeight / 2,
    50,
    window.innerHeight,
    { isStatic: true }
  );

  World.add(engine.world, [ground, leftWall, rightWall]);

  // Start the engine
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Array to store heart objects
  const hearts = [];
  let heartsCreated = 0;
  const totalHearts = 200; // Total hearts to create

  // Create hearts continuously
  const heartInterval = setInterval(() => {
    if (heartsCreated >= totalHearts) {
      clearInterval(heartInterval);
      // Show message after a delay to let hearts settle
      setTimeout(() => {
        showFinalMessage();
      }, 3000);
      return;
    }

    // Create 3-5 hearts per interval for continuous flow
    const heartsThisBatch = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < heartsThisBatch && heartsCreated < totalHearts; i++) {
      // Random starting position across top of screen
      const startX = Math.random() * window.innerWidth;
      const size = 40 + Math.random() * 40; // 40-80px

      // Create physics body (circle for better rolling/stacking)
      const body = Bodies.circle(startX, -50, size / 2, {
        restitution: 0.3, // Bounciness
        friction: 0.5,
        density: 0.001
      });

      World.add(engine.world, body);

      // Create DOM element for visual
      const heartEl = document.createElement('div');
      heartEl.className = 'explosion-heart physics-heart';

      // Create SVG heart with random color
      const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
      const svgHeart = createSVGHeart(randomColor, size);
      heartEl.appendChild(svgHeart);

      heartEl.style.opacity = '0';
      heartExplosion.appendChild(heartEl);

      // Fade in
      gsap.to(heartEl, {
        opacity: 0.9,
        duration: 0.5
      });

      // Store reference with size for positioning
      hearts.push({ body, element: heartEl, size });
      heartsCreated++;
    }
  }, 100); // Create hearts every 100ms

  // Update DOM elements to match physics bodies
  function updateHearts() {
    hearts.forEach(({ body, element, size }) => {
      element.style.left = (body.position.x - size / 2) + 'px';
      element.style.top = (body.position.y - size / 2) + 'px';
      element.style.transform = `rotate(${body.angle}rad)`;
    });

    requestAnimationFrame(updateHearts);
  }

  updateHearts();
}

// ===== SHOW FINAL MESSAGE =====
function showFinalMessage() {
  const message = document.createElement('div');
  message.className = 'final-message';
  message.innerHTML = '¡TE AMOOOOOOOOOOOOOOOOOOOOOOO!<br>MI NIÑA BELLA<333';
  document.body.appendChild(message);

  // Fade in the message
  gsap.to(message, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.out',
    onComplete: () => {
      // Start karaoke lyrics after message appears
      showKaraoke();
    }
  });
}

// ===== INITIALIZE KARAOKE (HIDDEN, SYNCING IN BACKGROUND) =====
function initializeKaraoke() {
  if (lyricsData.length === 0) {
    console.log('No lyrics loaded');
    return;
  }

  // Create lyrics container (hidden initially)
  const lyricsContainer = document.createElement('div');
  lyricsContainer.id = 'lyrics-container';
  lyricsContainer.className = 'lyrics-container';
  lyricsContainer.style.opacity = '0';
  lyricsContainer.style.display = 'none'; // Hidden until Yes is clicked
  document.body.appendChild(lyricsContainer);

  // Create lyrics lines
  lyricsData.forEach((lyric, index) => {
    const line = document.createElement('div');
    line.className = 'lyric-line';
    line.textContent = lyric.text;
    line.dataset.index = index;
    lyricsContainer.appendChild(line);
  });

  // Get audio element
  backgroundMusic = document.getElementById('background-music');

  // Update lyrics based on current time (running in background)
  function updateLyrics() {
    const currentTime = backgroundMusic.currentTime;
    let currentIndex = -1;

    // Find current lyric index
    for (let i = 0; i < lyricsData.length; i++) {
      if (currentTime >= lyricsData[i].time) {
        currentIndex = i;
      } else {
        break;
      }
    }

    // Update active lyric
    const lines = lyricsContainer.querySelectorAll('.lyric-line');
    lines.forEach((line, index) => {
      if (index === currentIndex) {
        line.classList.add('active');
        // Auto-scroll to active line (only if visible)
        if (lyricsContainer.style.display !== 'none') {
          line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (index < currentIndex) {
        line.classList.add('past');
        line.classList.remove('active');
      } else {
        line.classList.remove('active', 'past');
      }
    });
  }

  // Update lyrics every 100ms (always running)
  lyricsInterval = setInterval(updateLyrics, 100);

  // Clean up when music ends
  backgroundMusic.addEventListener('ended', () => {
    clearInterval(lyricsInterval);
  });

  console.log('Karaoke initialized and syncing in background');
}

// ===== SHOW KARAOKE (MAKE VISIBLE) =====
function showKaraoke() {
  const lyricsContainer = document.getElementById('lyrics-container');

  if (!lyricsContainer) {
    console.log('Karaoke not initialized yet');
    return;
  }

  // Make visible with fade-in animation
  lyricsContainer.style.display = 'block';
  gsap.to(lyricsContainer, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  });

  console.log('Karaoke now visible');
}

// ===== RECORD RESPONSE TO SUPABASE =====
async function recordResponse(response) {
  if (responseRecorded) return;

  try {
    const { data, error } = await supabase
      .from('valentine_responses')
      .insert([
        {
          response: response,
          responded_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error recording response:', error);
    } else {
      console.log('Response recorded successfully!');
      responseRecorded = true;
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
  }
}

// ===== START APPLICATION =====
init();
