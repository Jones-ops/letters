# 💌 Love Letters - A Beautiful Letter Sharing Website

A React-based website for writing and sharing heartfelt letters with beautiful falling love emoji animations.

## Features

✨ **Core Functionality**
- Write and post new letters with a title and content
- View all posted letters in a beautiful card grid
- Click on any letter to read the full content
- Delete letters you no longer want to share
- All letters are saved locally in your browser

❤️ **Special Feature**
- **Falling Love Emojis** - When you view a letter, beautiful love emojis (❤️, 💕, 💖, 💗, 💝, 🌹, 💘) fall from the top of the screen with smooth animations!

🎨 **Beautiful Design**
- Gradient purple background
- Smooth animations and transitions
- Responsive design that works on mobile and desktop
- Card-based layout for easy browsing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running Locally

1. **Navigate to the project folder:**
   ```bash
   cd path/to/Letters
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   - Visit `http://localhost:5173/` in your web browser

### Building for Production

To create a production build:
```bash
npm run build
```

This creates an optimized version in the `dist` folder.

## How to Use

1. **Write a Letter**: Click the "✍️ Write a New Letter" button
2. **Add Title & Content**: Fill in your letter's title and message
3. **Post**: Click "📤 Post Letter" to share it
4. **View Letters**: Click on any letter card to read the full content
5. **Watch the Magic**: Enjoy the falling love emojis animation!
6. **Delete**: Click 🗑️ to remove a letter

## Making it Accessible to Others

### Option 1: Host on Netlify (Easiest)
1. Push your code to a GitHub repository
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git" and select your GitHub repo
4. Netlify will automatically build and deploy
5. Share the generated URL with anyone!

### Option 2: Host on Vercel
1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Vercel handles the rest automatically!

### Option 3: Use Surge (Simple Alternative)
```bash
npm install -g surge
npm run build
surge dist
```
This creates a public URL you can share instantly.

### Option 4: Local Network Sharing
To share on your local network while developing:
```bash
npm run dev -- --host
```
Then share your machine's IP address (shown in terminal) with others on the same network.

## Project Structure

```
src/
├── components/
│   ├── LetterList.jsx         # Main list view
│   ├── LetterList.css
│   ├── LetterView.jsx         # Letter detail view
│   ├── LetterView.css
│   ├── WriteLetterForm.jsx    # Letter creation form
│   ├── WriteLetterForm.css
│   ├── FallingEmojis.jsx      # Emoji animation
│   └── FallingEmojis.css
├── App.jsx                     # Main app component
├── App.css
├── main.jsx
└── index.css
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling and animations
- **LocalStorage** - Data persistence

## Features Explained

### Data Persistence
Letters are stored in your browser's localStorage, so they persist even after closing the browser.

### Falling Emojis Animation
When viewing a letter, emojis fall from top to bottom with:
- Random horizontal positions
- Random emoji types
- Smooth rotation animation
- Sway effect for natural movement
- Fade-out at the bottom

## Customization

### Change Emoji Types
Edit `src/components/FallingEmojis.jsx`:
```javascript
const emojiChars = ['❤️', '💕', '💖', '💗', '💝', '🌹', '💘']
```
Replace with any emojis you like!

### Change Colors
Edit `src/App.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Animation Speed
In `src/components/FallingEmojis.jsx`, modify the animation duration (default 3-5 seconds).

## Browser Support

- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

## License

Free to use and modify!

---

Made with ❤️ for sharing letters and love
