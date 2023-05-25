import useIpcListener from '@renderer/customHooks/useIpcListener'
import { FunctionComponent, useEffect, useState } from 'react'
import './FileCard.css'

function humanFileSize(size: number): string {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return Number((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

const FileCard: FunctionComponent<{ file: ElectronFile }> = ({ file }) => {
  const [base64, setBase64] = useState('')

  useIpcListener('Image:done', ({ filePath, data }) => {
    if (filePath === file.path) {
      setBase64(`data:image/png;base64,${data}`)
    }
  })
  useEffect(() => {
    window.api.send('Image:compress', file.path)
  }, [])
  return (
    <div className="fileCardParent">
      <div className="fileCardTop">
        <div className="fileAttributes">
          <div>File: {file.path}</div>
          <div>Size: {humanFileSize(file.size)}</div>
          <div>Total Characters: {base64.length.toLocaleString('en-US')}</div>
        </div>
        <img src={base64} width={100} />
        <button onClick={(): Promise<void> => navigator.clipboard.writeText(base64)}>
          Copy{' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 14.729l.855-1.151c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.326-4.033-3.911zm15-11.729v21h-20v-21h4.666l-2.666 2.808v16.192h16v-16.192l-2.609-2.808h4.609zm-3.646 4l-3.312-3.569v-.41c.001-1.668-1.352-3.021-3.021-3.021-1.667 0-3.021 1.332-3.021 3l.001.431-3.298 3.569h12.651zm-6.354-5c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1z" />
          </svg>
        </button>
      </div>

      <div className="base64Block">{base64}</div>
    </div>
  )
}

export default FileCard
