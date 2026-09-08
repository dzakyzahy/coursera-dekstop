const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // Frameless for glassmorphism titlebar
    transparent: true, // Allow transparency for glassmorphism
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true, // Enable webview for embedding Coursera easily
    },
    icon: path.join(__dirname, '../public/coursera-logo-full-rgb.png')
  });

  // Spoof user agent to allow Google Login in webview
  // Google blocks default Electron User Agent
  const spoofUserAgent = (userAgent) => {
    return userAgent.replace(/Electron\/\S*\s/, '').replace(/courseradesktopapp\/\S*\s/, '');
  }

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = spoofUserAgent(details.requestHeaders['User-Agent']);
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle IPC for frameless window controls
  ipcMain.on('window-min', () => mainWindow.minimize());
  ipcMain.on('window-max', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('window-close', () => mainWindow.close());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
