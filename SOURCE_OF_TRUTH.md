# Coursera Desktop App - Source of Truth

This document serves as the architectural and historical reference for the Coursera Desktop App. Future AI agents should read this file first before making structural changes or diagnosing bugs.

## Technology Stack
- **Framework:** Electron + React (via Vite)
- **Styling:** Tailwind CSS v4 (with custom glassmorphism)
- **3D Graphics:** React Three Fiber (`@react-three/fiber` & `@react-three/drei`)
- **Icons & Animations:** Lucide React, Framer Motion
- **Packaging:** Electron Builder (`electron-builder`)

## Core Architecture
- The application uses a **Frameless Window** (`frame: false`, `transparent: true`) configured in `electron/main.cjs`.
- The actual Coursera website is loaded inside an Electron `<webview>` tag (`webviewTag: true`) within `src/App.tsx`.
- **Custom Titlebar & Sidebar:** Built in React, communicates with the Electron main process via IPC for window controls (minimize, maximize, close).
- **Background:** A 3D animated canvas runs *behind* the translucent webview container.

## Important Configurations & Past Fixes (Do NOT Revert)

1. **Persistent Login Session (Google Auth)**
   - **Problem:** Google Login blocked the default Electron User-Agent, and login cookies were being wiped on app restart.
   - **Solution:** 
     - We use a persistent partition in the webview: `<webview partition="persist:coursera" ...>`
     - In `main.cjs`, we spoof the User-Agent specifically for this partition (`session.fromPartition('persist:coursera')`) to strip "Electron" and our app name. We must check both `User-Agent` and `user-agent` header casing to avoid `undefined` crashes.

2. **Vite Build Paths for Electron**
   - **Problem:** When built (`npm run build`), the desktop app would launch as a blank white screen because Vite uses absolute paths by default (`/assets/index.js`), which breaks when loaded from the local filesystem (`file:///.../dist/index.html`).
   - **Solution:** In `vite.config.ts`, `base: './'` MUST be set so assets are linked relatively.

3. **Electron Builder Icon**
   - **Problem:** Electron builder fails with `Unsupported input format ".jpg"` if a `.jpg` icon is provided for the Windows build.
   - **Solution:** Always use `.png`, `.svg`, or `.icns` for the `win.icon` in `package.json`. We use `public/coursera-c-logo.png`.

4. **Coursera Links**
   - **Profile Pages:** Coursera discontinued their `user/profile` pages. Links should point to `https://www.coursera.org/in-progress` (My Learning) or `https://www.coursera.org/account-settings`.

## Build & Dev Instructions
- **Development:** `npm run dev` (Runs Vite server concurrently with Electron). Note: Terminate running dev servers before building to avoid `EPERM` file lock errors on Windows.
- **Production Build:** `npm run build` (Compiles TypeScript, builds Vite bundle to `dist/`, then packages into `release/` using Electron Builder).
