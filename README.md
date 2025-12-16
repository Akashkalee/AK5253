# 🚀 Akash Kale - Portfolio

A premium, interactive 3D portfolio website designed for DevOps Engineers, SREs, and Product Engineers. This project features a modern dark theme (Orange & Black), glassmorphism UI, and immersive 3D elements powered by [Three.js](https://threejs.org/).

## ✨ Features

*   **3D Particle Network Background**: An interactive, scrolling constellation effect representing infrastructure nodes.
*   **3D Tech Core**: A rotating, pulsating "Tech Knot" in the About section symbolizing complex systems.
*   **Premium Dark Theme**: High-contrast Orange (#e17055) and Black design for a bold, industrial look.
*   **Glassmorphism UI**: Modern, translucent cards with blur effects.
*   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
*   **Interactive Elements**:
    *   Typing text effect for roles.
    *   Animated number counters for stats.
    *   Smooth scrolling navigation.
    *   "Terminal" window visual.

## 🛠️ Tech Stack

*   **HTML5**: Semantic markup for accessibility and structure.
*   **CSS3**: Custom properties (variables), Flexbox, Grid, and Animations.
*   **JavaScript (ES6+)**: Logic for interactions and DOM manipulation.
*   **Three.js**: 3D graphics library for the background and object visualization.
*   **Font Awesome**: For vector icons.
*   **Google Fonts**: 'Inter' and 'Fira Code' for typography.

## 📂 Project Structure

```
DEVOPS PORTFOLIO/
├── index.html      # Main HTML structure and content
├── styles.css      # All styling, variables, and animations
├── script.js       # JavaScript logic and Three.js scenes
└── README.md       # Project documentation
```

## 🚀 How to Run Locally

Since this is a static website, you don't need a backend server.

1.  **Download/Clone** the project folder.
2.  **Open** the folder in your code editor (VS Code, etc.).
3.  **Launch**:
    *   Simply double-click `index.html` to open it in your browser.
    *   **OR** use a local development extension like "Live Server" in VS Code for a better experience (auto-refresh).

## 🎨 Customization Guide

### 1. Changing Personal Info
Open `index.html` and look for the following sections to update your details:
*   **Navigation**: Update the logo text (Line ~25).
*   **Hero Section**: Change "Akash Kale" and the typing words (Lines ~45-55).
*   **Bio**: Update the text in the "About" section (Line ~140).
*   **Links**: Update `href` attributes for LinkedIn, GitHub, and Email interactions.

### 2. Updating Colors
Open `styles.css`. All colors are defined as variables at the top (`:root`).
To change the theme, just update these hex codes:
```css
:root {
    --primary: #e17055;   /* Main Orange */
    --accent: #fdcb6e;    /* Yellow/Gold */
    --bg-dark: #000000;   /* Background */
    /* ... */
}
```

### 3. Adding/Removing Skills
In `index.html`, scroll to the `<section id="skills">`. You can add new `<span>` tags for skills or copy-paste entire `.skill-category` blocks.

### 4. Updating Projects
In `index.html`, scroll to the `<section id="projects">`. Copy the `.project-card` block and edit the titles, descriptions, and tags to showcase your own work.

## 🌐 Deployment

You can host this for **free** on GitHub Pages or Netlify.

### GitHub Pages Method:
1.  Create a new repository on GitHub (e.g., `my-portfolio`).
2.  Push these files to the repository.
3.  Go to **Settings** > **Pages**.
4.  Select the `main` branch and click **Save**.
5.  Your site will be live at `https://<username>.github.io/my-portfolio`.

## 📄 License

