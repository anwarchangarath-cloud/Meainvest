const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Upload-Token',
    'Access-Control-Max-Age': '86400',
  }
}

function json(data, status = 200, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    const url = new URL(request.url)

    // POST /upload — receive file, store in R2
    if (request.method === 'POST' && url.pathname === '/upload') {
      // Validate upload token
      const token = request.headers.get('X-Upload-Token')
      if (!token || token !== env.UPLOAD_SECRET) {
        return json({ error: 'Unauthorized' }, 401, origin)
      }

      let formData
      try {
        formData = await request.formData()
      } catch {
        return json({ error: 'Invalid form data' }, 400, origin)
      }

      const file = formData.get('file')
      const folder = formData.get('folder') || 'receipts'

      if (!file || typeof file === 'string') {
        return json({ error: 'No file provided' }, 400, origin)
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return json({ error: 'Invalid file type. Allowed: JPG, PNG, WebP, PDF' }, 400, origin)
      }

      // Validate file size
      const arrayBuffer = await file.arrayBuffer()
      if (arrayBuffer.byteLength > MAX_SIZE) {
        return json({ error: 'File too large. Maximum 10MB.' }, 400, origin)
      }

      // Generate unique key
      const ext = file.name.split('.').pop()
      const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      // Store in R2
      await env.MEA_BUCKET.put(key, arrayBuffer, {
        httpMetadata: { contentType: file.type },
        customMetadata: { originalName: file.name },
      })

      const fileUrl = `${env.PUBLIC_URL}/${key}`

      return json({ success: true, url: fileUrl, key }, 200, origin)
    }

    // GET /file/:key — serve file from R2
    if (request.method === 'GET' && url.pathname.startsWith('/file/')) {
      const key = url.pathname.replace('/file/', '')
      const object = await env.MEA_BUCKET.get(key)

      if (!object) {
        return new Response('File not found', { status: 404 })
      }

      const headers = new Headers()
      object.writeHttpMetadata(headers)
      headers.set('Cache-Control', 'public, max-age=31536000')
      headers.set('Access-Control-Allow-Origin', '*')

      return new Response(object.body, { headers })
    }

    return json({ error: 'Not found' }, 404, origin)
  },
}
