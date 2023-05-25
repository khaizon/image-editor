import useIpcListener from '@renderer/customHooks/useIpcListener'
import { FunctionComponent, useEffect, useState } from 'react'

function getBase64(file: ElectronFile): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (): void => {
      resolve(reader.result as string)
    }
    reader.onerror = (error): void => {
      reject(error)
    }
  })
}

const FileCard: FunctionComponent<{ file: ElectronFile }> = ({ file }) => {
  const [base64, setBase64] = useState('')

  useIpcListener('Image:done', (event, ...args) => {
    console.log(event, args)
  })
  useEffect(() => {
    getBase64(file).then((res) => {
      setBase64(res)
    })
    window.api.send('Image:compress', [file.path])
  }, [])
  return (
    <div>
      Name: {file.name}
      Size: {file.size}
      Path: {file.path}
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
