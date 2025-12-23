const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 420,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    resizable: true,
    hasShadow: false,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  // Set app name
  app.setName('Floating Orb (Glass)');
  
  // Open DevTools for debugging (remove in production)
  // mainWindow.webContents.openDevTools();
  
  // Log when window is ready
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Window loaded successfully');
  });
  
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  // Load the app - use dist/ for packaged app, localhost for dev
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index-with-background.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000/index-with-background.html');
  }

  // Position window in center of screen
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const x = Math.floor((width - 420) / 2);
  const y = Math.floor((height - 420) / 2);
  mainWindow.setPosition(x, y);
  mainWindow.show();
  mainWindow.focus();
  console.log('Window positioned at:', x, y, 'Screen size:', width, height);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

