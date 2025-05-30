`use strict`
const { app, BrowserWindow, ipcMain, autoUpdater } = require('electron/main')
const path = require('node:path')
require('update-electron-app')

const server = 'https://update.electronjs.org'
const feed = `${server}/Rian-Sm/Electron-demo/${process.platform}-${process.arch}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 310,
    height: 310,
    frame: false,
    transparent: true,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    titleBarStyle: 'hidden',
    movable: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'src/main/preload.js'),
      contextIsolation: true,
    }
  })

  win.loadFile('src/render/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('get-version', () => app.getVersion())
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})