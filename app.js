const fontPersonalities = [
  { id: "neon-rebel", name: "Neon Rebel", fontFamily: "Arial Black, sans-serif", style: "Futuristic, Brash" },
  { id: "earth-minimal", name: "Earth Minimal", fontFamily: "'Inter', Arial, sans-serif", style: "Fresh, Minimalist" },
  { id: "bold-modern", name: "Bold Modern", fontFamily: "'Poppins', Impact, Arial", style: "Bold, Clean" },
  { id: "luxury-gold", name: "Luxury Gold", fontFamily: "'Playfair Display', serif", style: "Classy, Elegant" },
  { id: "y2k-iridescent", name: "Y2K Iridescent", fontFamily: "'Monoton', 'Orbitron'", style: "Playful, Retro-future" },
  { id: "nordic-soft", name: "Nordic Soft", fontFamily: "'Montserrat', 'Tahoma', Arial", style: "Gentle, Calm" },
  { id: "warm-handmade", name: "Warm Handmade", fontFamily: "'Quicksand', cursive", style: "Handwritten, Friendly" },
  { id: "earthy-boho", name: "Earthy Boho", fontFamily: "'Pacifico', Verdana, sans-serif", style: "Cozy, Natural" },
];

const colorMoods = [
  { id: "midnight-cyber", name: "Midnight Cyber", primary: "#00D9FF", secondary: "#162349" },
  { id: "neon-pulse", name: "Neon Pulse", primary: "#FF006E", secondary: "#340036" },
  { id: "earth-minimal", name: "Earth Minimal", primary: "#dbe8d1", secondary: "#5c857a" },
  { id: "y2k-iridescent", name: "Y2K Iridescent", primary: "#dba5ff", secondary: "#5efcff" },
  { id: "luxury-gold", name: "Luxury Gold", primary: "#e3b04b", secondary: "#1a1a1a" },
  { id: "nordic-soft", name: "Nordic Soft", primary: "#a2bcd5", secondary: "#3d4a54" },
  { id: "warm-handmade", name: "Warm Handmade", primary: "#e26666", secondary: "#edd982" },
  { id: "earthy-boho", name: "Earthy Boho", primary: "#eae0aa", secondary: "#326e54" },
  { id: "bold-modern", name: "Bold Modern", primary: "#010101", secondary: "#f94f4f" },
];

let selectedFont = null;
let selectedColor = null;

function renderFontGrid() {
  const grid = document.getElementById('fontGrid');
  grid.innerHTML = fontPersonalities.map(f => `
    <button class="card font-card" data-font-id="${f.id}" style="font-family:${f.fontFamily};"
      onclick="selectFont('${f.id}')">
      <div>${f.name}</div>
      <span class="small">${f.style}</span>
    </button>
  `).join('');
}

function renderColorGrid() {
  const grid = document.getElementById('colorGrid');
  grid.innerHTML = colorMoods.map(c => `
    <button class="card color-card" data-color-id="${c.id}" style="background:${c.primary}; color:#222; font-weight:bold;"
      onclick="selectColor('${c.id}')">${c.name}</button>
  `).join('');
}

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
  loader.classList.add('active');
  preview.src = '';
  preview.style.opacity = 0.25;

  const prompt = `Create a ${selectedFont && selectedFont.style ? selectedFont.style : ""}, ${selectedColor.name} branding moodboard in a popular style for 2025. Font style: ${selectedFont.name}. Colors: ${selectedColor.name}.`;

  try {
    const res = await fetch('https://vibeboard-backend.onrender.com/generate-image', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.imageUrl) {
      preview.onload = () => {
        loader.classList.add('hidden');
        loader.classList.remove('active');
        preview.classList.add('loaded');
      };
      preview.src = data.imageUrl;
    } else {
      throw new Error("No image returned");
    }
  } catch (error) {
    loader.classList.add('hidden');
    loader.classList.remove('active');
    preview.alt = "Sorry, could not generate moodboard.";
  }
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
  document.getElementById('moodboard-preview').src = "";
  document.getElementById('moodboard-preview').classList.remove('loaded');
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
  } else if (img.src) {
    navigator.clipboard.writeText(img.src);
    alert('Link copied!');
  }
}

document.getElementById('generateBtn').onclick = generateVibe;
document.getElementById('tryAgainBtn').onclick = tryAgain;
document.getElementById('downloadBtn').onclick = downloadVibe;
document.getElementById('shareBtn').onclick = shareVibe;

renderFontGrid();
renderColorGrid();
