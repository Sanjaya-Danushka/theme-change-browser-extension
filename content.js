// Listen for theme changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyTheme') {
    applyThemeToPage(request.theme);
    sendResponse({ success: true });
  }
});

// Apply theme to the page
function applyThemeToPage(theme) {
  // Remove existing theme style
  let themeStyle = document.getElementById('theme-changer-style');
  if (!themeStyle) {
    themeStyle = document.createElement('style');
    themeStyle.id = 'theme-changer-style';
    document.head.appendChild(themeStyle);
  }
  
  // Apply new theme
  if (theme.filters) {
    themeStyle.textContent = `
      html {
        filter: ${theme.filters} !important;
      }
      ${theme.background ? `body { background-color: ${theme.background} !important; }` : ''}
      ${theme.color ? `body { color: ${theme.color} !important; }` : ''}
    `;
  } else {
    // Reset to default
    themeStyle.textContent = '';
  }
}

// Load saved theme on page load
async function loadSavedTheme() {
  const url = window.location.hostname;
  
  chrome.storage.sync.get([url], (result) => {
    const savedTheme = result[url];
    if (savedTheme && savedTheme !== 'default') {
      // Define themes (same as popup.js)
      const themes = {
        githubDark: {
          filters: 'invert(0.9) hue-rotate(180deg) brightness(1.1)',
          background: '#0d1117',
          color: '#c9d1d9'
        },
        dracula: {
          filters: 'invert(0.85) hue-rotate(180deg) saturate(1.3)',
          background: '#282a36',
          color: '#f8f8f2'
        },
        monokai: {
          filters: 'invert(0.88) hue-rotate(180deg) saturate(1.2)',
          background: '#272822',
          color: '#f8f8f2'
        },
        nord: {
          filters: 'invert(0.9) hue-rotate(180deg) saturate(0.9) brightness(1.05)',
          background: '#2e3440',
          color: '#eceff4'
        },
        solarizedDark: {
          filters: 'invert(0.85) hue-rotate(180deg) saturate(0.8)',
          background: '#002b36',
          color: '#839496'
        },
        oneDark: {
          filters: 'invert(0.88) hue-rotate(180deg) saturate(1.1)',
          background: '#282c34',
          color: '#abb2bf'
        },
        tokyoNight: {
          filters: 'invert(0.9) hue-rotate(180deg) saturate(1.15)',
          background: '#1a1b26',
          color: '#a9b1d6'
        },
        gruvbox: {
          filters: 'invert(0.85) hue-rotate(180deg) saturate(1.1) sepia(0.2)',
          background: '#282828',
          color: '#ebdbb2'
        },
        materialDark: {
          filters: 'invert(0.88) hue-rotate(180deg) saturate(1.05)',
          background: '#263238',
          color: '#eeffff'
        },
        ayu: {
          filters: 'invert(0.87) hue-rotate(180deg) saturate(0.95)',
          background: '#0f1419',
          color: '#e6e1cf'
        },
        nightOwl: {
          filters: 'invert(0.9) hue-rotate(180deg) saturate(1.2)',
          background: '#011627',
          color: '#d6deeb'
        },
        synthwave: {
          filters: 'saturate(2) contrast(1.3) brightness(1.1) hue-rotate(-10deg)',
          background: '#2b213a',
          color: '#ff7edb'
        },
        cobalt: {
          filters: 'invert(0.88) hue-rotate(180deg) saturate(1.4)',
          background: '#002240',
          color: '#ffffff'
        },
        highContrast: {
          filters: 'invert(1) contrast(1.5)',
          background: '#000000',
          color: '#ffffff'
        },
        sepia: {
          filters: 'sepia(1) brightness(0.95)',
          background: '#f4ecd8',
          color: '#3e2723'
        },
        eyeCare: {
          filters: 'sepia(0.3) saturate(0.8) brightness(0.95)',
          background: '#f5f2e8',
          color: '#2c2c2c'
        }
      };
      
      if (themes[savedTheme]) {
        applyThemeToPage(themes[savedTheme]);
      }
    }
  });
}

// Initialize
loadSavedTheme();