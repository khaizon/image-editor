import Versions from './components/Versions'
import DragDropFile from './components/DragDropFile'
import { useReducer } from 'react'
import FileCard from './components/FileCard'

interface ImageAction {
  type: string
  payload: Array<File>
}

function imagesReducer(state: Array<File>, action: ImageAction): Array<File> {
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
  console.log(state.length)
  return (
    <div className="container">
      <Versions></Versions>
      {state.length === 0 && <DragDropFile dispatch={dispatch} />}
      <div>
        {state.map((f: File, index) => (
          <div key={index}>
            <FileCard file={f} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
