import { app, shell, BrowserWindow, ipcMain, Tray, Menu, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//@ts-ignore
import icon from '../../resources/icon.png?asset'
import { Client } from '@stomp/stompjs'
import websocket from 'websocket'
require('dotenv').config()
import Store from 'electron-store'
import { autoUpdater, AppUpdater } from "electron-updater"

var AutoLaunch = require('auto-launch')

let autoLaunch = new AutoLaunch({
  name: 'ERP-BBF',
  path: app.getPath('exe')
})
autoLaunch.isEnabled().then((isEnabled) => {
  if (!isEnabled) autoLaunch.enable()
})

let electronStore = new Store()

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let ws: null | Client = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'BBF',
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    minHeight: 768,
    minWidth: 1024
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow!.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow!.hide()
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// export default class AppUpdater {
//   constructor() {
//     const log = require("electron-log")
//     log.transports.file.level = "debug"
//     autoUpdater.logger = log
//     autoUpdater.checkForUpdatesAndNotify()
//   }
// }

function showNotification(title, body) {
  let noti = new Notification({
    title: title || 'Nueva Tarea',
    body: body || '¡Tienes una nueva tarea asignada!',
    silent: false,
    icon: icon,

    actions: [{ type: 'button', text: 'Ver' }]
  })
  noti.show()
  noti.on('click', (event, arg) => {
    mainWindow?.show()
  })
}

function setupWebSocket() {
  Object.assign(global, { WebSocket: websocket.w3cwebsocket })
  ws = new Client({
    brokerURL: process.env.VITE_WS_URI,
    onConnect: () => {
      console.log('sexoo')
      ws?.subscribe('/ws/notifications', (greeting) => {
        try {
          const user = electronStore.get('userData')
          let noti = JSON.parse(greeting.body)
          if (user.user.id == noti.user.id) {
            showNotification(noti.tittle, noti.descriptions)
          }
        } catch (error) {}
      })
    },
    onStompError: (_) => {
      setTimeout(setupWebSocket, 5000)
    }
  })
  ws.activate()
}

function setupTray() {
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir',
      click: () => mainWindow!.show()
    },
    {
      label: 'Salir',
      click: () => {
        if (mainWindow) {
          mainWindow.close()
        }
        if (ws) {
          ws.forceDisconnect()
          ws = null
        }
        tray?.destroy()
        tray = null
        app.quit()
        app.exit(0)
      }
    }
  ])
  tray.setToolTip('Mi App de Tareas')
  tray.setContextMenu(contextMenu)
  tray.addListener('double-click', () => {
    mainWindow!.show()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('login', (_, response) => {
    electronStore.set('userData', JSON.parse(response))
  })

  createWindow()
  setupTray()
  setupWebSocket()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdates()
})
app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
  console.log('Actualización disponible');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Actualización descargada');
  autoUpdater.quitAndInstall();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
