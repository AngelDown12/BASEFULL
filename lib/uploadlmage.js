import fetch from 'node-fetch'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export default async function uploadImage(buffer) {
  const { ext } = await fileTypeFromBuffer(buffer) || { ext: 'jpg' }

  const form = new FormData()
  form.append('file', buffer, {
    filename: `image.${ext}`,
    contentType: `image/${ext}`
  })

  const res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  })

  const json = await res.json()
  if (!json || json.error) throw new Error('❌ Error al subir imagen')

  return 'https://telegra.ph' + json[0].src
}