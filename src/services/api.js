// Lightweight fetch-based replacement for axios used in this project.
// Provides a minimal API: get, post, put, delete that return an object { data, status, statusText, headers }
// and supports a timeout via AbortController. This keeps existing callers (which expect `res.data`) working.

const BASE_URL = 'https://fakestoreapi.com'
const DEFAULT_TIMEOUT = 10000

async function request(method, path, body = null, config = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const timeout = config.timeout ?? DEFAULT_TIMEOUT

  const headers = Object.assign({ 'Content-Type': 'application/json' }, config.headers || {})

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const opts = {
    method,
    headers,
    signal: controller.signal
  }

  if (body != null) {
    // mirror axios behaviour: allow sending FormData/raw bodies too
    if (body instanceof FormData) {
      // let fetch set the correct headers for FormData
      delete opts.headers['Content-Type']
      opts.body = body
    } else if (typeof body === 'object') {
      opts.body = JSON.stringify(body)
    } else {
      opts.body = body
    }
  }

  try {
    const res = await fetch(url, opts)
    clearTimeout(id)

    const text = await res.text()
    let data = null
    try { data = text ? JSON.parse(text) : null } catch (e) { data = text }

    const result = {
      data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers
    }

    if (!res.ok) {
      const err = new Error(`Request failed with status ${res.status}`)
      err.response = result
      throw err
    }

    return result
  } catch (err) {
    if (err.name === 'AbortError') {
      const e = new Error('timeout of ' + timeout + 'ms exceeded')
      e.code = 'ECONNABORTED'
      throw e
    }
    throw err
  }
}

const api = {
  get: (path, config) => request('GET', path, null, config),
  post: (path, body, config) => request('POST', path, body, config),
  put: (path, body, config) => request('PUT', path, body, config),
  delete: (path, config) => request('DELETE', path, null, config)
}

export default api
