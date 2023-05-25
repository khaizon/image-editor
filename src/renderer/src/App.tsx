import Versions from './components/Versions'
import DragDropFile from './components/DragDropFile'
import { useReducer } from 'react'
import FileCard from './components/FileCard'
import './App.css'
interface ImageAction {
  type: string
  payload: Array<ElectronFile>
}

function imagesReducer(state: Array<File>, action: ImageAction): Array<ElectronFile> {
  switch (action.type) {
    case 'add':
      return [...state, ...action.payload]
    case 'remove':
      return state.filter((img) => img.name !== action.payload[0].name)
    default:
      return state
  }
}

function App(): JSX.Element {
  const [state, dispatch] = useReducer(imagesReducer, [])
  return (
    <div className="container">
      <div className="title">MAOMAO&apos;s Image Converter</div>
      {state.length === 0 && <DragDropFile dispatch={dispatch} />}
      <div className="fileCardsParent">
        {state.map((f: ElectronFile, index) => (
          <div key={index}>
            <FileCard file={f} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
