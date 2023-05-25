import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  send: (channel: string, ...args): void => ipcRenderer.send(channel, ...args),
  on: (channel: string, f: (...args) => void): Electron.IpcRenderer => ipcRenderer.on(channel, (event, ...args) => f(...args)),
  removeListener: (channel: string, f: (...args) => void): Electron.IpcRenderer => ipcRenderer.removeListener(channel, f)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
