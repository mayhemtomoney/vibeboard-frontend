// Modern Brand Styles - Curated for 2025
const brandStyles = [
  {
    id: "luxury-modern",
    name: "Luxury Modern",
    description: "Sophisticated elegance with contemporary edge",
    tags: ["Premium", "Refined", "Contemporary"],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    textColor: "#ffffff"
  },
  {
    id: "minimalist-nordic",
    name: "Minimalist Nordic",
    description: "Clean lines and functional beauty",
    tags: ["Clean", "Functional", "Serene"],
    gradient: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    textColor: "#495057"
  },
  {
    id: "warm-artisan",
    name: "Warm Artisan",
    description: "Handcrafted warmth meets modern design",
    tags: ["Handcrafted", "Warm", "Authentic"],
    gradient: "linear-gradient(135deg, #8b5a3c 0%, #a0522d 100%)",
    textColor: "#ffffff"
  },
  {
    id: "vibrant-creative",
    name: "Vibrant Creative",
    description: "Bold energy for innovative brands",
    tags: ["Bold", "Dynamic", "Innovative"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff"
  },
  {
    id: "natural-organic",
    name: "Natural Organic",
    description: "Earth-connected and sustainable",
    tags: ["Sustainable", "Natural", "Grounded"],
    gradient: "linear-gradient(135deg, #5c857a 0%, #4a6741 100%)",
    textColor: "#ffffff"
  },
  {
    id: "tech-future",
    name: "Tech Future",
    description: "Innovation meets sleek design",
    tags: ["Innovative", "Digital", "Forward"],
    gradient: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)",
    textColor: "#ffffff"
  }
];

// Professional Color Palettes - Based on 2025 Trends
const colorPalettes = [
  {
    id: "burning-red-accent",
    name: "Burning Red",
    description: "Power and confidence with sophisticated balance",
    primary: "#bf1922",
    secondary: "#1a1a1a",
    accent: "#f5f5f5",
    colors: ["#bf1922", "#1a1a1a", "#f5f5f5", "#8c1319"]
  },
  {
    id: "mocha-mousse-earth",
    name: "Mocha Mousse",
    description: "Pantone 2025 - Warm, grounding, sophisticated",
    primary: "#8b5a3c",
    secondary: "#f7e8d3",
    accent: "#2d1810",
    colors: ["#8b5a3c", "#f7e8d3", "#2d1810", "#a0522d"]
  },
  {
    id: "nordic-serenity",
    name: "Nordic Serenity",
    description: "Calming blues with crisp contrast",
    primary: "#a2bcd5",
    secondary: "#3d4a54",
    accent: "#ffffff",
    colors: ["#a2bcd5", "#3d4a54", "#ffffff", "#7891a8"]
  },
  {
    id: "luxury-gold-black",
    name: "Luxury Gold",
    description: "Opulent gold with deep sophistication",
    primary: "#e3b04b",
    secondary: "#1a1a1a",
    accent: "#f8f8f8",
    colors: ["#e3b04b", "#1a1a1a", "#f8f8f8", "#d4941f"]
  },
  {
    id: "earth-minimal-green",
    name: "Earth Minimal",
    description: "Fresh, sustainable, naturally modern",
    primary: "#5c857a",
    secondary: "#dbe8d1",
    accent: "#2d4a37",
    colors: ["#5c857a", "#dbe8d1", "#2d4a37", "#4a6e60"]
  },
  {
    id: "midnight-electric",
    name: "Midnight Electric",
    description: "High contrast with electric energy",
    primary: "#00c9ff",
    secondary: "#0a0a0a",
    accent: "#ffffff",
    colors: ["#00c9ff", "#0a0a0a", "#ffffff", "#0099cc"]
  }
];

// App State
class VibeBoardApp {
  constructor() {
    this.currentStep = 1;
    this.selectedStyle = null;
    this.selectedColor = null;
    this.isGenerating = false;
    
    this.init();
  }
  
  init() {
    this.renderStyleGrid();
    this.renderColorGrid();
    this.bindEvents();
    this.updateProgress();
  }
  
  renderStyleGrid() {
    const grid = document.getElementById('styleGrid');
    grid.innerHTML = brandStyles.map(style => `
      <div class="style-card" data-style-id="${style.id}" onclick="app.selectStyle('${style.id}')">
        <div class="style-preview" style="background: ${style.gradient}; color: ${style.textColor};">
          ${style.name}
        </div>
        <div class="style-info">
          <h3>${style.name}</h3>
          <p>${style.description}</p>
          <div class="style-tags">
            ${style.tags.map(tag => `<span class="style-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  renderColorGrid() {
    const grid = document.getElementById('colorGrid');
    grid.innerHTML = colorPalettes.map(palette => `
      <div class="color-card" data-color-id="${palette.id}" onclick="app.selectColor('${palette.id}')">
        <div class="color-preview" style="background: ${palette.primary};">
          <div class="color-swatches">
            ${palette.colors.map(color => `<div class="color-swatch" style="background: ${color};"></div>`).join('')}
          </div>
        </div>
        <div class="color-info">
          <h3>${palette.name}</h3>
          <p>${palette.description}</p>
        </div>
      </div>
    `).join('');
  }
  
  selectStyle(styleId) {
    // Remove previous selection
    document.querySelectorAll('.style-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    // Add selection
    const selectedCard = document.querySelector(`[data-style-id="${styleId}"]`);
    selectedCard.classList.add('selected');
    
    this.selectedStyle = brandStyles.find(style => style.id === styleId);
    this.checkAndAdvanceStep();
  }
  
  selectColor(colorId) {
    // Remove previous selection
    document.querySelectorAll('.color-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    // Add selection
    const selectedCard = document.querySelector(`[data-color-id="${colorId}"]`);
    selectedCard.classList.add('selected');
    
    this.selectedColor = colorPalettes.find(palette => palette.id === colorId);
    this.checkAndAdvanceStep();
  }
  
  checkAndAdvanceStep() {
    if (this.currentStep === 1 && this.selectedStyle) {
      setTimeout(() => this.goToStep(2), 800);
    } else if (this.currentStep === 2 && this.selectedColor) {
      setTimeout(() => this.goToStep(3), 800);
      this.enableGenerateButton();
    }
  }
  
  goToStep(step) {
    // Hide current step
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show new step
    const sections = ['styleSection', 'colorSection', 'generateSection'];
    document.getElementById(sections[step - 1]).classList.add('active');
    
    this.currentStep = step;
    this.updateProgress();
  }
  
  enableGenerateButton() {
    const button = document.getElementById('generateBtn');
    button.disabled = false;
  }
  
  updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const steps = document.querySelectorAll('.step');
    
    // Update progress bar
    const progress = (this.currentStep / 3) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update step indicators
    steps.forEach((step, index) => {
      step.classList.toggle('active', index + 1 === this.currentStep);
    });
  }
  
  async generateMoodboard() {
    if (!this.selectedStyle || !this.selectedColor || this.isGenerating) return;
    
    this.isGenerating = true;
    
    // Show results section
    this.goToStep(4); // Beyond normal steps
    document.getElementById('styleSection').classList.remove('active');
    document.getElementById('colorSection').classList.remove('active');
    document.getElementById('generateSection').classList.remove('active');
    document.getElementById('resultsSection').classList.add('active');
    
    // Update selection summary
    document.getElementById('selectedStyleName').textContent = this.selectedStyle.name;
    document.getElementById('selectedColorName').textContent = this.selectedColor.name;
    
    // Show loading spinner
    const spinner = document.getElementById('loadingSpinner');
    const image = document.getElementById('moodboardImage');
    spinner.classList.remove('hidden');
    image.classList.remove('loaded');
    
    // Create professional prompt
    const prompt = this.createProfessionalPrompt();
    
    try {
      const response = await fetch('https://vibeboard-backend.onrender.com/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      if (data.imageUrl) {
        image.onload = () => {
          spinner.classList.add('hidden');
          image.classList.add('loaded');
        };
        image.src = data.imageUrl;
      } else {
        throw new Error('No image URL returned');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      spinner.innerHTML = '<p>Sorry, generation failed. Please try again.</p>';
    }
    
    this.isGenerating = false;
  }
  
  createProfessionalPrompt() {
    const styleDescriptions = {
      "luxury-modern": "ultra-premium luxury brand aesthetic with sleek modern elements, high-end materials, sophisticated typography",
      "minimalist-nordic": "clean Scandinavian minimalism with functional design, plenty of white space, subtle textures",
      "warm-artisan": "handcrafted artisanal brand with warm natural materials, authentic textures, human touch",
      "vibrant-creative": "bold creative energy with dynamic compositions, innovative design elements, artistic flair",
      "natural-organic": "sustainable organic brand with natural materials, earth-connected aesthetic, eco-conscious design",
      "tech-future": "cutting-edge technology brand with futuristic elements, digital aesthetics, innovation focus"
    };
    
    const colorDescriptions = {
      "burning-red-accent": "powerful red accents with sophisticated black and white balance, high contrast, professional",
      "mocha-mousse-earth": "rich mocha brown with warm cream tones, earthy sophistication, Pantone 2025 inspired",
      "nordic-serenity": "serene Nordic blues with clean whites and sophisticated grays, calming professional palette",
      "luxury-gold-black": "opulent gold accents with deep black sophistication, premium luxury aesthetic",
      "earth-minimal-green": "fresh sage green with natural cream tones, sustainable organic palette",
      "midnight-electric": "electric blue with deep black contrast, high-tech modern aesthetic"
    };
    
    return `Create a professional brand moodboard in ${styleDescriptions[this.selectedStyle.id]} style, featuring ${colorDescriptions[this.selectedColor.id]} color palette. Include: high-quality typography samples, premium material textures, sophisticated color swatches, lifestyle photography, brand elements, modern layout design. Professional photography quality, high contrast, vivid colors, award-winning design composition, 4K resolution, crisp details, studio lighting, no watermarks, clean organized grid layout, luxurious presentation, contemporary branding aesthetic. Style: professional moodboard design, commercial quality.`;
  }
  
  bindEvents() {
    document.getElementById('generateBtn').addEventListener('click', () => {
      this.generateMoodboard();
    });
    
    document.getElementById('downloadBtn').addEventListener('click', () => {
      this.downloadMoodboard();
    });
    
    document.getElementById('shareBtn').addEventListener('click', () => {
      this.shareMoodboard();
    });
    
    document.getElementById('newMoodboardBtn').addEventListener('click', () => {
      this.resetApp();
    });
  }
  
  downloadMoodboard() {
    const image = document.getElementById('moodboardImage');
    if (image.src) {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = `${this.selectedStyle.name}-${this.selectedColor.name}-moodboard.jpg`;
      link.click();
    }
  }
  
  shareMoodboard() {
    const image = document.getElementById('moodboardImage');
    if (navigator.share && image.src) {
      navigator.share({
        title: 'My Professional Moodboard',
        text: `Check out this ${this.selectedStyle.name} moodboard with ${this.selectedColor.name} palette!`,
        url: window.location.href
      });
    } else {
      // Fallback - copy link
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
      alert('Link copied to clipboard!');
    }
  }
  
  resetApp() {
    this.currentStep = 1;
    this.selectedStyle = null;
    this.selectedColor = null;
    this.isGenerating = false;
    
    // Clear selections
    document.querySelectorAll('.style-card, .color-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    // Reset to first step
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById('styleSection').classList.add('active');
    
    // Disable generate button
    document.getElementById('generateBtn').disabled = true;
    
    this.updateProgress();
  }
}

// Initialize app
const app = new VibeBoardApp();

// Global functions for onclick handlers
window.app = app;
