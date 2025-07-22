const fontPersonalities = [
  { id: "neon-rebel", name: "Neon Rebel", fontFamily: "Arial Black, sans-serif" },
  { id: "cyber-oracle", name: "Cyber Oracle", fontFamily: "Georgia, serif" },
  { id: "digital-nomad", name: "Digital Nomad", fontFamily: "Helvetica Neue, sans-serif" },
];

const colorMoods = [
  { id: "midnight-cyber", name: "Midnight Cyber", primary: "#00D9FF" },
  { id: "neon-pulse", name: "Neon Pulse", primary: "#FF006E" },
  { id: "toxic-glow", name: "Toxic Glow", primary: "#39FF14" },
];

let selectedFont = null;
let selectedColor = null;

// Render font options
function renderFontGrid() {
  const grid = document.getElementById('fontGrid');
  grid.innerHTML = fontPersonalities.map(f => `
    <button class="card font-card" data-font-id="${f.id}" style="font-family: ${f.fontFamily};" onclick="selectFont('${f.id}')">
      ${f.name}
    </button>
  `).join('');
}

// Render color options
function renderColorGrid() {
  const grid = document.getElementById('colorGrid');
  grid.innerHTML = colorMoods.map(c => `
    <button class="card color-card" data-color-id="${c.id}" style="background: ${c.primary}; color: white;" onclick="selectColor('${c.id}')">
      ${c.name}
    </button>
  `).join('');
}

// Selection
window.selectFont = function(id) {
  selectedFont = fontPersonalities.find(f => f.id === id);
  document.querySelectorAll('.font-card').forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`[data-font-id="${id}"]`).classList.add('selected');
  checkReady();
};

window.selectColor = function(id) {
  selectedColor = colorMoods.find(c => c.id === id);
  document.querySelectorAll('.color-card').forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`[data-color-id="${id}"]`).classList.add('selected');
  checkReady();
};

function checkReady() {
  document.getElementById('generateBtn').disabled = !(selectedFont && selectedColor);
}

async function generateVibe() {
  const preview = document.getElementById('moodboard-preview');
  const loader = document.getElementById('loadingAnimation');

  document.getElementById('generateBtn').disabled = true;
  loader.classList.remove('hidden');
  preview.src = '';

  const prompt = `Create a retro-futuristic moodboard in neon cyberpunk style for a creative ADHD brand. Font style: ${selectedFont.name}, Color Theme: ${selectedColor.name}`;

  try {
    const res = await fetch('https://vibeboard-backend.onrender.com/generate-image', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    preview.src = data.imageUrl || '';
  } catch (error) {
    console.error(error);
    preview.alt = "Sorry, could not generate moodboard.";
  }

  loader.classList.add('hidden');
  document.getElementById('stepPicker').classList.add('hidden');
  document.getElementById('previewSection').classList.remove('hidden');
}

function tryAgain() {
  selectedFont = null;
  selectedColor = null;
  document.getElementById('stepPicker').classList.remove('hidden');
  document.getElementById('previewSection').classList.add('hidden');
  document.querySelectorAll('.card').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('generateBtn').disabled = true;
}

function downloadVibe() {
  const img = document.getElementById('moodboard-preview');
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'moodboard.png';
  link.click();
}

function shareVibe() {
  const img = document.getElementById('moodboard-preview');
  if (navigator.share && img.src) {
    navigator.share({
      title: "My Moodboard",
      text: "Check out my vibe!",
      url: img.src,
    });
  } else {
    navigator.clipboard.writeText(img.src);
    alert('Link copied!');
  }
}

// Bind buttons
document.getElementById('generateBtn').onclick = generateVibe;
document.getElementById('tryAgainBtn').onclick = tryAgain;
document.getElementById('downloadBtn').onclick = downloadVibe;
document.getElementById('shareBtn').onclick = shareVibe;

// Init
renderFontGrid();
renderColorGrid();
