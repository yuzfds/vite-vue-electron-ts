const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
    // webPreferences:{

    // }
  })
  if (process.env.__DEV__ === 'true') {
    win.loadURL('http://localhost:8099/')
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../dist/render/index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }
}

app.whenReady().then(() => {
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
