const WORKER_URL = import.meta.env.VITE_UPLOAD_WORKER_URL
const UPLOAD_SECRET = import.meta.env.VITE_UPLOAD_SECRET

/**
 * Upload a file to Cloudflare R2 via the Worker.
 * Returns the public file URL.
 */
export async function uploadToR2(file, folder = 'receipts') {
  if (!WORKER_URL) throw new Error('Upload worker not configured.')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'X-Upload-Token': UPLOAD_SECRET },
    body: formData,
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Upload failed.')
  }

  return data.url
}
