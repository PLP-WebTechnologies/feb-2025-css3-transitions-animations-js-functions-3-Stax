document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const animatedBox = document.getElementById('animatedBox');
    const changeColorBtn = document.getElementById('changeColor');
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            theme: themeSelect.value,
            animation: animationSelect.value
        };
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply the selected theme immediately
        applyTheme(preferences.theme);
    });
    
    // Trigger animation on box click
    animatedBox.addEventListener('click', function() {
        // Get the selected animation from localStorage
        const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
        const animationType = savedPrefs?.animation || 'bounce';
        
        // Remove all animation classes first
        animatedBox.classList.remove('bounce', 'rotate', 'pulse');
        
        // Add the selected animation class
        animatedBox.classList.add(animationType);
        
        // Stop animation after 3 seconds
        setTimeout(() => {
            animatedBox.classList.remove(animationType);
        }, 3000);
    });
    
    // Change box color with transition
    changeColorBtn.addEventListener('click', function() {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        animatedBox.style.backgroundColor = randomColor;
    });
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
        if (savedPrefs) {
            themeSelect.value = savedPrefs.theme;
            animationSelect.value = savedPrefs.animation;
            applyTheme(savedPrefs.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme');
        
        // Add the selected theme class
        switch(theme) {
            case 'light':
                document.body.classList.add('light-theme');
                break;
            case 'dark':
                document.body.classList.add('dark-theme');
                break;
            case 'blue':
                document.body.classList.add('blue-theme');
                break;
        }
    }
});