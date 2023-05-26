import { ChangeEvent, DragEvent, SyntheticEvent, useRef, useState, FunctionComponent, Dispatch } from 'react'
import './DragDropFile.css'

type Props = {
  dispatch: Dispatch<{ type: string; payload: Array<ElectronFile> }>
}

const DragDropFile: FunctionComponent<Props> = ({ dispatch }) => {
  const [dragActive, setDragActive] = useState(false)
  // ref
  const inputRef = useRef<null | HTMLInputElement>(null)
  const handleDrag = function (e: SyntheticEvent): void {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      dispatch({
        type: 'add',
        payload: Array.from(e.dataTransfer.files)
      })
    }
  }

  // triggers when file is selected with click
  const handleChange = function (e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      dispatch({
        type: 'add',
        payload: Array.from(e.target.files)
      })
    }
  }

  const onButtonClick = (): void => {
    inputRef.current?.click()
  }

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e): void => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>
        <div>
          <p>Drag and drop your files here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Upload files
          </button>
        </div>
      </label>
      {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </form>
  )
}

export default DragDropFile
