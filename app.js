// VibeBoard Generator Application
class VibeBoardGenerator {
    constructor() {
        this.currentStep = 1;
        this.selectedFont = null;
        this.selectedColor = null;
        this.unlockedAchievements = [];
        this.isGenerating = false;
        this.focusMode = false;
        
        // Application data
        this.fontPersonalities = [
            {
                id: "neon-rebel",
                name: "Neon Rebel",
                description: "Break the rules, make your own path",
                fontFamily: "Arial Black, sans-serif",
                personality: "Bold, edgy, rebellious"
            },
            {
                id: "cyber-oracle", 
                name: "Cyber Oracle",
                description: "Wisdom meets innovation",
                fontFamily: "Georgia, serif", 
                personality: "Futuristic, wise, sophisticated"
            },
            {
                id: "digital-nomad",
                name: "Digital Nomad", 
                description: "Sleek, minimal, always moving",
                fontFamily: "Helvetica Neue, sans-serif",
                personality: "Clean, modern, mobile"
            },
            {
                id: "glitch-master",
                name: "Glitch Master",
                description: "Embrace the beautiful chaos", 
                fontFamily: "Courier New, monospace",
                personality: "Distorted, tech, chaotic"
            },
            {
                id: "holo-sage",
                name: "Holo Sage",
                description: "Timeless grace in digital space",
                fontFamily: "Times New Roman, serif", 
                personality: "Elegant, script-like, graceful"
            },
            {
                id: "code-warrior",
                name: "Code Warrior", 
                description: "Logic, precision, power",
                fontFamily: "Monaco, monospace",
                personality: "Technical, precise, powerful"
            }
        ];

        this.colorMoods = [
            {
                id: "midnight-cyber",
                name: "Midnight Cyber",
                description: "Deep blues and electric teals for the digital night",
                primary: "#00D9FF",
                secondary: "#0066CC", 
                accent: "#33FFFF",
                background: "#001122"
            },
            {
                id: "neon-pulse",
                name: "Neon Pulse", 
                description: "Hot pinks and magentas that demand attention",
                primary: "#FF006E",
                secondary: "#CC0055",
                accent: "#FF99CC", 
                background: "#220011"
            },
            {
                id: "toxic-glow",
                name: "Toxic Glow",
                description: "Electric greens and yellows that energize",
                primary: "#39FF14", 
                secondary: "#66FF00",
                accent: "#CCFF00",
                background: "#112200"
            },
            {
                id: "digital-sunset", 
                name: "Digital Sunset",
                description: "Warm oranges and deep purples collide",
                primary: "#FF6600",
                secondary: "#6B46C1",
                accent: "#FFAA00",
                background: "#221100"
            },
            {
                id: "ghost-protocol",
                name: "Ghost Protocol",
                description: "Stealth grays and bright whites for the shadows", 
                primary: "#FFFFFF",
                secondary: "#999999",
                accent: "#CCCCCC",
                background: "#111111"
            },
            {
                id: "blood-circuit",
                name: "Blood Circuit",
                description: "Dangerous reds and deep blacks",
                primary: "#FF0000", 
                secondary: "#990000", 
                accent: "#FF6666",
                background: "#220000"
            },
            {
                id: "azure-dreams",
                name: "Azure Dreams",
                description: "Calming blues and pure whites",
                primary: "#0099FF",
                secondary: "#FFFFFF",
                accent: "#66CCFF", 
                background: "#001133"
            },
            {
                id: "voltage-storm", 
                name: "Voltage Storm",
                description: "Electric yellows and shocking blues",
                primary: "#FFFF00",
                secondary: "#0066FF", 
                accent: "#FFFF66",
                background: "#111122"
            }
        ];

        this.achievements = [
            {
                id: "style-explorer",
                name: "Style Explorer", 
                description: "Explored different font personalities",
                icon: "🎨"
            },
            {
                id: "color-master",
                name: "Color Master",
                description: "Mastered the art of color combinations", 
                icon: "🌈"
            },
            {
                id: "brand-architect", 
                name: "Brand Architect",
                description: "Built a complete brand identity",
                icon: "🏗️"
            }
        ];

        this.init();
    }

    init() {
        this.renderFontGrid();
        this.renderColorGrid();
        this.renderAchievements();
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        // Step navigation buttons
        document.getElementById('generateBtn')?.addEventListener('click', () => this.generateVibe());
        document.getElementById('randomizeBtn')?.addEventListener('click', () => this.randomizeSelection());
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.downloadVibe());
        document.getElementById('shareBtn')?.addEventListener('click', () => this.shareVibe());
        document.getElementById('restartBtn')?.addEventListener('click', () => this.restart());
        
        // Focus mode toggle
        document.getElementById('focusToggle')?.addEventListener('click', () => this.toggleFocusMode());
    }

    renderFontGrid() {
        const fontGrid = document.getElementById('fontGrid');
        if (!fontGrid) return;

        fontGrid.innerHTML = this.fontPersonalities.map(font => `
            <div class="font-card" data-font-id="${font.id}" onclick="app.selectFont('${font.id}')">
                <div class="font-preview" style="font-family: ${font.fontFamily}">Your Brand</div>
                <div class="font-card__name">${font.name}</div>
                <div class="font-card__description">${font.description}</div>
            </div>
        `).join('');
    }

    renderColorGrid() {
        const colorGrid = document.getElementById('colorGrid');
        if (!colorGrid) return;

        colorGrid.innerHTML = this.colorMoods.map(color => `
            <div class="color-card" data-color-id="${color.id}" onclick="app.selectColor('${color.id}')">
                <div class="color-preview" style="background: linear-gradient(135deg, ${color.primary}, ${color.secondary})"></div>
                <div class="color-card__name">${color.name}</div>
                <div class="color-card__description">${color.description}</div>
                <div class="color-swatches">
                    <div class="color-swatch" style="background: ${color.primary}"></div>
                    <div class="color-swatch" style="background: ${color.secondary}"></div>
                    <div class="color-swatch" style="background: ${color.accent}"></div>
                </div>
            </div>
        `).join('');
    }

    renderAchievements() {
        const achievementsList = document.getElementById('achievementsList');
        if (!achievementsList) return;

        achievementsList.innerHTML = this.achievements.map(achievement => `
            <div class="achievement ${this.unlockedAchievements.includes(achievement.id) ? 'unlocked' : ''}" 
                 data-achievement-id="${achievement.id}">
                <span class="achievement__icon">${achievement.icon}</span>
                <span class="achievement__name">${achievement.name}</span>
            </div>
        `).join('');
    }

    selectFont(fontId) {
        // Remove previous selection
        document.querySelectorAll('.font-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-font-id="${fontId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        this.selectedFont = this.fontPersonalities.find(font => font.id === fontId);
        this.updatePreview();
        
        // Unlock achievement and advance step
        this.unlockAchievement('style-explorer');
        
        if (this.currentStep === 1) {
            setTimeout(() => this.nextStep(), 500);
        }
    }

    selectColor(colorId) {
        // Remove previous selection
        document.querySelectorAll('.color-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-color-id="${colorId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        this.selectedColor = this.colorMoods.find(color => color.id === colorId);
        this.updatePreview();
        
        // Unlock achievement and advance step
        this.unlockAchievement('color-master');
        
        if (this.currentStep === 2) {
            setTimeout(() => this.nextStep(), 500);
        }
    }

    updatePreview() {
        if (!this.selectedFont && !this.selectedColor) return;

        const logoText = document.querySelector('.logo-text');
        const cardLogo = document.querySelector('.card-logo');
        const websiteLogo = document.querySelector('.website-logo');
        const socialName = document.querySelector('.social-name');

        // Update fonts
        if (this.selectedFont && logoText) {
            logoText.style.fontFamily = this.selectedFont.fontFamily;
            cardLogo.style.fontFamily = this.selectedFont.fontFamily;
            websiteLogo.style.fontFamily = this.selectedFont.fontFamily;
            socialName.style.fontFamily = this.selectedFont.fontFamily;
        }

        // Update colors
        if (this.selectedColor) {
            const root = document.documentElement;
            root.style.setProperty('--preview-primary', this.selectedColor.primary);
            root.style.setProperty('--preview-secondary', this.selectedColor.secondary);
            root.style.setProperty('--preview-accent', this.selectedColor.accent);

            // Update text colors
            if (logoText) logoText.style.color = this.selectedColor.primary;
            if (cardLogo) cardLogo.style.color = this.selectedColor.primary;
            if (websiteLogo) websiteLogo.style.color = this.selectedColor.primary;
            if (socialName) socialName.style.color = this.selectedColor.primary;

            // Update social avatar gradient
            const socialAvatar = document.querySelector('.social-avatar');
            if (socialAvatar) {
                socialAvatar.style.background = `linear-gradient(135deg, ${this.selectedColor.primary}, ${this.selectedColor.secondary})`;
            }

            // Update preview backgrounds with gradients
            const logoPreview = document.querySelector('.logo-preview');
            if (logoPreview) {
                logoPreview.style.background = `linear-gradient(135deg, ${this.selectedColor.background}66, ${this.selectedColor.accent}22)`;
            }
        }

        // Add subtle animation to updated elements
        const elementsToAnimate = [logoText, cardLogo, websiteLogo, socialName].filter(Boolean);
        elementsToAnimate.forEach(element => {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        });
    }

    nextStep() {
        if (this.currentStep < 3) {
            this.currentStep++;
            this.updateProgress();
            this.showCurrentSection();
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressSteps = document.querySelectorAll('.progress__step');
        
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / 3) * 100}%`;
        }

        progressSteps.forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    showCurrentSection() {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show current section
        let sectionId;
        switch (this.currentStep) {
            case 1:
                sectionId = 'fontSection';
                break;
            case 2:
                sectionId = 'colorSection';
                break;
            case 3:
                sectionId = 'generateSection';
                break;
        }

        const currentSection = document.getElementById(sectionId);
        if (currentSection) {
            currentSection.classList.remove('hidden');
        }
    }

    async generateVibe() {
        if (!this.selectedFont || !this.selectedColor || this.isGenerating) return;

        this.isGenerating = true;
        
        // Show loading animation
        const loadingAnimation = document.getElementById('loadingAnimation');
        const brandPreview = document.getElementById('brandPreview');
        
        if (loadingAnimation) loadingAnimation.classList.remove('hidden');
        if (brandPreview) brandPreview.style.opacity = '0.3';

        // Simulate generation time
        await this.sleep(3000);

        // Hide loading, show results
        if (loadingAnimation) loadingAnimation.classList.add('hidden');
        if (brandPreview) brandPreview.style.opacity = '1';

        // Unlock final achievement
        this.unlockAchievement('brand-architect');

        // Show results section
        this.showResultsSection();
        
        this.isGenerating = false;
    }

    showResultsSection() {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
    }

    randomizeSelection() {
        // Random font
        const randomFont = this.fontPersonalities[Math.floor(Math.random() * this.fontPersonalities.length)];
        this.selectFont(randomFont.id);

        // Wait a bit, then random color
        setTimeout(() => {
            const randomColor = this.colorMoods[Math.floor(Math.random() * this.colorMoods.length)];
            this.selectColor(randomColor.id);
        }, 300);
    }

    unlockAchievement(achievementId) {
        if (this.unlockedAchievements.includes(achievementId)) return;

        this.unlockedAchievements.push(achievementId);
        
        // Update UI
        const achievementElement = document.querySelector(`[data-achievement-id="${achievementId}"]`);
        if (achievementElement) {
            achievementElement.classList.add('unlocked');
        }

        // Show notification (could add toast/modal here)
        console.log(`Achievement unlocked: ${achievementId}`);
    }

    downloadVibe() {
        // Simulate download
        this.showMessage('VibeBoard downloaded! 🎉');
        
        // In a real app, this would generate and download a PDF/image
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Create a simple brand preview
        ctx.fillStyle = this.selectedColor?.background || '#0A0A0A';
        ctx.fillRect(0, 0, 800, 600);
        
        ctx.fillStyle = this.selectedColor?.primary || '#00D9FF';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Your Brand', 400, 300);
        
        ctx.fillStyle = this.selectedColor?.secondary || '#0066CC';
        ctx.font = '24px Arial';
        ctx.fillText(`Font: ${this.selectedFont?.name || 'Selected Font'}`, 400, 350);
        ctx.fillText(`Colors: ${this.selectedColor?.name || 'Selected Colors'}`, 400, 380);
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'my-vibeboard.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    shareVibe() {
        // Simulate sharing
        if (navigator.share) {
            navigator.share({
                title: 'My VibeBoard Creation',
                text: `Check out my brand identity: ${this.selectedFont?.name} + ${this.selectedColor?.name}`,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            const shareText = `Check out my brand identity: ${this.selectedFont?.name} + ${this.selectedColor?.name}`;
            navigator.clipboard.writeText(shareText).then(() => {
                this.showMessage('Share link copied to clipboard! 📋');
            });
        }
    }

    restart() {
        this.currentStep = 1;
        this.selectedFont = null;
        this.selectedColor = null;
        this.isGenerating = false;
        
        // Reset UI
        document.querySelectorAll('.font-card, .color-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        this.updateProgress();
        this.showCurrentSection();
        
        // Reset preview
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            logoText.style.fontFamily = '';
            logoText.style.color = '';
        }
        
        this.showMessage('Ready for a new creation! ✨');
    }

    toggleFocusMode() {
        this.focusMode = !this.focusMode;
        document.body.classList.toggle('focus-mode', this.focusMode);
        
        const focusIcon = document.querySelector('.focus-toggle__icon');
        if (focusIcon) {
            focusIcon.textContent = this.focusMode ? '👁️‍🗨️' : '👁️';
        }
    }

    showMessage(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 24px;
            background: linear-gradient(135deg, var(--cyber-blue), var(--cyber-purple));
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
const app = new VibeBoardGenerator();

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effects simulation
    document.querySelectorAll('.btn, .font-card, .color-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Visual feedback for "sound"
            element.style.transform = element.style.transform || '';
            const currentTransform = element.style.transform;
            element.style.transform = currentTransform + ' scale(1.02)';
            
            setTimeout(() => {
                element.style.transform = currentTransform;
            }, 150);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            app.toggleFocusMode();
        } else if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            if (app.currentStep === 3 && !app.isGenerating) {
                app.generateVibe();
            }
        } else if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            app.randomizeSelection();
        }
    });
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.font-card, .color-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Add some cyberpunk ambiance effects
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        const glitchElements = document.querySelectorAll('.header__title, .preview-panel__title');
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement) {
            randomElement.style.textShadow = '2px 0 #FF006E, -2px 0 #00D9FF';
            setTimeout(() => {
                randomElement.style.textShadow = '';
            }, 100);
        }
    }
}, 3000);

// Export for global access
window.app = app;