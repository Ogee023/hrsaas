const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  windowMinimize: _ => ipcRenderer.invoke('window-minimize'),
  windowMaximize: _ => ipcRenderer.invoke('window-maximize'),
  windowUnMaximize: _ => ipcRenderer.invoke('window-un-maximize'),
  windowClose: _ => ipcRenderer.invoke('window-close'),
  listenMaximize: isMax => ipcRenderer.on('main-window-max', isMax),
  listenMinimize: isMax => ipcRenderer.on('main-window-unmax', isMax),
  logined: value => ipcRenderer.invoke('logined', value)
})
