const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=512');

const createMainWindow = () => {
    if (mainWindow) return;

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL('https://www.messenger.com');
    mainWindow.setMenuBarVisibility(false);

    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Messenger loaded successfully.');
    });

    mainWindow.on('close', (e) => {
        if (!app.isQuiting) {
            e.preventDefault();
            mainWindow.hide();
        }
    });
};

const createTray = () => {
    if (tray) return;

    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'assets', 'icon.png'));
    tray = new Tray(trayIcon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show Messenger', click: () => mainWindow.show() },
        { label: 'Quit', click: () => {
            app.isQuiting = true;
            app.quit();
        }},
    ]);

    tray.setToolTip('Facebook Messenger');
    tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
    createMainWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
