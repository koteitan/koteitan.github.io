# おやすみ (Oyasumi) - Good Night Routine App

A peaceful web application designed to help users establish and maintain healthy bedtime routines.

## Features

### 🕐 Time Management
- Real-time clock display
- Bedtime scheduling with local storage persistence
- Browser notifications at bedtime (with user permission)

### ✅ Bedtime Routine Checklist
- Customizable pre-sleep routine items
- Progress tracking with visual feedback
- Automatic state saving

### 🎵 Sleep Sounds
- Three ambient sound options:
  - Rain sounds
  - Ocean waves
  - White noise
- Generated using Web Audio API for minimal resource usage

### 💡 Sleep Tips
- Collection of evidence-based sleep hygiene tips
- Random tip display to encourage healthy habits

## Technology Stack

- **HTML5**: Semantic markup with Japanese language support
- **CSS3**: Modern styling with CSS variables and responsive design
- **Vanilla JavaScript**: No external dependencies for maximum performance
- **Web APIs**: 
  - Web Audio API for sound generation
  - Notifications API for bedtime alerts
  - LocalStorage for data persistence

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required!

## Browser Compatibility

This application works best in modern browsers that support:
- ES6+ JavaScript features
- Web Audio API
- CSS Grid and Flexbox
- LocalStorage

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Usage

1. **Set Your Bedtime**: Use the time picker to set your desired bedtime. The app will save this preference.

2. **Complete Your Routine**: Check off items in your bedtime routine as you complete them.

3. **Play Sleep Sounds**: Select and play ambient sounds to help you relax.

4. **Read Sleep Tips**: Click "新しいヒント" to get helpful sleep advice.

## Security Features

- No external API calls or tracking
- All data stored locally in browser
- No server-side components
- Safe, client-side only implementation
- No file system access beyond standard web APIs

## Customization

You can easily customize the app by modifying:
- `sleepTips` array in `script.js` to add your own sleep tips
- Routine items in `index.html`
- Color scheme in CSS variables (`:root` section in `styles.css`)

## Contributing

Feel free to fork this project and add your own features! Some ideas:
- Additional sound types
- Sleep journal functionality
- Wake-up time calculator
- Dark/light theme toggle

## License

This project is open source and available for educational purposes.

---

Sweet dreams! 🌙 おやすみなさい 💤