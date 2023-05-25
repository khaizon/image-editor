import useIpcListener from '@renderer/customHooks/useIpcListener'
import { FunctionComponent, useEffect, useState } from 'react'

const FileCard: FunctionComponent<{ file: ElectronFile }> = ({ file }) => {
  const [base64, setBase64] = useState('')

  useIpcListener('Image:done', ({ filePath, data }) => {
    if (filePath === file.path) {
      setBase64(data)
    }
  })
  useEffect(() => {
    window.api.send('Image:compress', file.path)
  }, [])
  return (
    <div>
      Name: {file.name}
      Size: {file.size}
      Path: {file.path}
      <img src={`data:image/png;base64,${base64}`} />
      <div
        style={{
          overflow: 'hidden',
          width: '500px',
          textOverflow: 'ellipsis'
        }}
      >
        B64: {base64}
      </div>
      <div>chars: {base64.length}</div>
    </div>
  )
}

export default FileCard
