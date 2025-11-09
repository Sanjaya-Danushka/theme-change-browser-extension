// Theme definitions
const themes = {
  default: {
    name: 'Default',
    filters: ''
  },
  // Dark Themes
  githubDark: {
    name: 'GitHub Dark',
    filters: 'invert(0.9) hue-rotate(180deg) brightness(1.1)',
    background: '#0d1117',
    color: '#c9d1d9'
  },
  dracula: {
    name: 'Dracula',
    filters: 'invert(0.85) hue-rotate(180deg) saturate(1.3)',
    background: '#282a36',
    color: '#f8f8f2'
  },
  tokyoNight: {
    name: 'Tokyo Night',
    filters: 'invert(0.9) hue-rotate(180deg) saturate(1.15)',
    background: '#1a1b26',
    color: '#a9b1d6'
  },
  oneDark: {
    name: 'One Dark',
    filters: 'invert(0.88) hue-rotate(180deg) saturate(1.1)',
    background: '#282c34',
    color: '#abb2bf'
  },
  nord: {
    name: 'Nord',
    filters: 'invert(0.9) hue-rotate(180deg) saturate(0.9) brightness(1.05)',
    background: '#2e3440',
    color: '#eceff4'
  },
  gruvboxDark: {
    name: 'Gruvbox Dark',
    filters: 'invert(0.85) hue-rotate(180deg) saturate(1.1) sepia(0.2)',
    background: '#282828',
    color: '#ebdbb2'
  },
  // Light Themes
  githubLight: {
    name: 'GitHub Light',
    filters: 'brightness(1.05) contrast(0.95)',
    background: '#ffffff',
    color: '#24292f'
  },
  solarizedLight: {
    name: 'Solarized Light',
    filters: 'sepia(0.15) saturate(0.9) brightness(1.05)',
    background: '#fdf6e3',
    color: '#657b83'
  },
  gruvboxLight: {
    name: 'Gruvbox Light',
    filters: 'sepia(0.2) saturate(1.1) brightness(1.08)',
    background: '#fbf1c7',
    color: '#3c3836'
  },
  ayuLight: {
    name: 'Ayu Light',
    filters: 'brightness(1.08) saturate(0.95)',
    background: '#fafafa',
    color: '#5c6166'
  },
  materialLight: {
    name: 'Material Light',
    filters: 'brightness(1.05) saturate(1.05)',
    background: '#fafafa',
    color: '#263238'
  },
  // Special Themes
  sepia: {
    name: 'Sepia',
    filters: 'sepia(0.9) brightness(1.02)',
    background: '#f4ecd8',
    color: '#3e2723'
  },
  eyeCare: {
    name: 'Eye Care',
    filters: 'sepia(0.25) saturate(0.85) brightness(1.02)',
    background: '#f5f2e8',
    color: '#2c2c2c'
  },
  highContrast: {
    name: 'High Contrast',
    filters: 'contrast(1.3) brightness(1.1)',
    background: '#ffffff',
    color: '#000000'
  },
  nightOwl: {
    name: 'Night Owl',
    filters: 'invert(0.9) hue-rotate(180deg) saturate(1.2)',
    background: '#011627',
    color: '#d6deeb'
  },
  synthwave: {
    name: 'Synthwave',
    filters: 'saturate(1.8) contrast(1.2) brightness(1.05) hue-rotate(-5deg)',
    background: '#2b213a',
    color: '#ff7edb'
  }
};

// Load current theme and update UI
async function loadCurrentTheme() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url).hostname;
  
  chrome.storage.sync.get([url], (result) => {
    const currentTheme = result[url] || 'default';
    updateActiveTheme(currentTheme);
  });
}

// Update active theme in UI
function updateActiveTheme(themeName) {
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.remove('active');
    if (card.dataset.theme === themeName) {
      card.classList.add('active');
    }
  });
}

// Show status message
function showStatus(message, type = 'success') {
  const statusEl = document.getElementById('statusMessage');
  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
  
  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = 'status-message';
  }, 2000);
}

// Apply theme to current tab
async function applyTheme(themeName) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Check if we can apply theme to this page
  if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
    showStatus('Cannot theme browser pages', 'error');
    return;
  }
  
  const url = new URL(tab.url).hostname;
  
  try {
    // Save theme preference
    await chrome.storage.sync.set({ [url]: themeName });
    
    const theme = themes[themeName];
    
    // Inject theme directly using scripting API
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (themeData) => {
        let themeStyle = document.getElementById('theme-changer-style');
        if (!themeStyle) {
          themeStyle = document.createElement('style');
          themeStyle.id = 'theme-changer-style';
          document.head.appendChild(themeStyle);
        }
        
        if (themeData.filters) {
          themeStyle.textContent = `
            html {
              filter: ${themeData.filters} !important;
            }
            ${themeData.background ? `body { background-color: ${themeData.background} !important; }` : ''}
            ${themeData.color ? `body { color: ${themeData.color} !important; }` : ''}
          `;
        } else {
          themeStyle.textContent = '';
        }
      },
      args: [theme]
    });
    
    updateActiveTheme(themeName);
    showStatus(`${themes[themeName].name} theme applied!`, 'success');
  } catch (error) {
    showStatus('Cannot theme this page', 'error');
    console.error('Error:', error);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadCurrentTheme();
  
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
      const themeName = card.dataset.theme;
      applyTheme(themeName);
    });
  });
});