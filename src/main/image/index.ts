import sharp from 'sharp'

export async function resize(filePath: string, callback: (res: string) => void): Promise<void> {
  sharp(filePath)
    .resize(300, 300, { fit: 'cover' })
    .toBuffer()
    .then((buffer) => callback(buffer.toString('base64')))
}
