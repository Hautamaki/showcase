// Theme management
class ThemeManager {
    constructor() {
        this.themes = [
            'light',           // your default :root
            'dark-blue',       // your existing
            'deep-dark',       // your existing
        ];
        this.currentTheme = this.getSavedTheme() || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Theme switcher
        const themeSwitch = document.getElementById('themeSwitch');
        if (themeSwitch) {
            themeSwitch.value = this.currentTheme;
            themeSwitch.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!this.getSavedTheme()) { // Only auto-switch if no manual preference
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
    
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            this.saveTheme(theme);
        }
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    saveTheme(theme) {
        localStorage.setItem('user-theme', theme);
    }
    
    getSavedTheme() {
        return localStorage.getItem('user-theme');
    }
    
    // Reset to system preference
    resetToSystem() {
        localStorage.removeItem('user-theme');
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();