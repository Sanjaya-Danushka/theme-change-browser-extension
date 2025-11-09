# Theme Color Changer - Browser Extension

A simple and beautiful browser extension that allows you to change the color theme of any website.

## Features

- 🎨 8 predefined color themes
- 💾 Remembers your theme preference per website
- ⚡ Instant theme switching
- 🌐 Works on all websites
- 🎯 Clean and modern UI

## Available Themes

1. **Default** - Original website colors
2. **Dark** - Dark mode for any website
3. **Ocean Blue** - Cool blue tones
4. **Forest Green** - Natural green palette
5. **Royal Purple** - Rich purple hues
6. **Warm Sunset** - Warm orange/red tones
7. **Sepia** - Classic sepia filter
8. **Cyberpunk** - High contrast neon colors

## Installation

### Chrome/Edge/Brave

1. Download or clone this repository
2. Open your browser and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension folder
6. The extension icon will appear in your toolbar

### Firefox

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file from the extension folder

## Usage

1. Click the extension icon in your browser toolbar
2. Select a theme from the grid
3. The theme will be applied instantly to the current website
4. Your preference is saved automatically for each website

## Creating Icons

You need to create icon files in an `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick way to create icons:**

```bash
mkdir icons
# Then use any image editor or online tool to create simple colored squares
# Or use ImageMagick:
convert -size 16x16 xc:#667eea icons/icon16.png
convert -size 48x48 xc:#667eea icons/icon48.png
convert -size 128x128 xc:#667eea icons/icon128.png
```

**Alternative:** You can temporarily remove icon references from `manifest.json` if you want to test without icons.

## File Structure

```
chrome theme/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.css          # Popup styling
├── popup.js           # Popup logic
├── content.js         # Content script for theme application
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # This file
```

## Customization

You can easily add more themes by editing the `themes` object in both `popup.js` and `content.js`. Each theme can have:
- `filters`: CSS filter string
- `background`: Background color
- `color`: Text color

Example:
```javascript
myTheme: {
  name: 'My Custom Theme',
  filters: 'hue-rotate(90deg) saturate(1.5)',
  background: '#custom-bg-color',
  color: '#custom-text-color'
}
```

## Troubleshooting

- **Extension not loading:** Make sure all files are in the same directory
- **Themes not applying:** Check browser console for errors (F12)
- **Icons missing:** Create icon files or remove icon references from manifest.json

## License

Free to use and modify.

## Contributing

Feel free to submit issues or pull requests to improve this extension!
