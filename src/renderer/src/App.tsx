import Versions from './components/Versions'
import DragDropFile from './components/DragDropFile'
import { useReducer } from 'react'

interface ImageAction {
  type: string
  payload: Array<File>
}

function imagesReducer(state: Array<File>, action: ImageAction): Array<File> {
  switch (action.type) {
    case 'add':
      return [...state, ...action.payload]
    case 'remnove':
      return state.filter((img) => img.name !== action.payload[0].name)
    default:
      return state
  }
}
function App(): JSX.Element {
  const [state, dispatch] = useReducer(imagesReducer, [])
  return (
    <div className="container">
      <Versions></Versions>
      <DragDropFile dispatch={dispatch} />
      <div>
        {state.map((img: File) => (
          <div key={img.name}>{img.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App
