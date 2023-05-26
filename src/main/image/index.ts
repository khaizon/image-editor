import sharp from 'sharp'

export async function resize(filePath: string, callback: (res: string) => void): Promise<void> {
  sharp(filePath)
    .resize(200, 200, { fit: 'cover' })
    .png({
      quality: 100,
      compressionLevel: 9,
      effort: 10
    })
    .toBuffer()
    .then((buffer) => callback(buffer.toString('base64')))
}
