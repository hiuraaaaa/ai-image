export default {
  id: 'noobai-xl',
  name: 'NoobAI XL',

  // Supported ratios
  sizes: ['1:1', '9:16', '16:9'],

  async generate({ prompt, ratio }) {
    const url =
      'https://api.nekolabs.web.id/image-generation/noobai-xl' +
      `?prompt=${encodeURIComponent(prompt)}` +
      `&ratio=${encodeURIComponent(ratio)}`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('NoobAI XL API failed')
    }

    const data = await res.json()

    if (!data.success || !data.result) {
      throw new Error('Invalid response from NoobAI XL')
    }

    return {
      images: [data.result] // ⚠️ WAJIB ARRAY
    }
  }
}
