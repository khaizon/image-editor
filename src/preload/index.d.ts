import { ElectronAPI } from '@electron-toolkit/preload'

type apiInterface = {
  send: (channel: string, ...args) => void
  on: (channel: string, f: CallableFunction) => void
  removeListener: (channel: string, f: (...args) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: apiInterface
  }
}
