const model = {
  meta: {
    id: 'noobai-xl',
    name: 'NoobAI XL',
    sizes: ['1:1','9:16','16:9']
  },
  generate: async ({ prompt, ratio }) => {
    const url = 'https://api.nekolabs.web.id/image-generation/noobai-xl'
    const res = await fetch(`${url}?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`)
    const data = await res.json()
    if (!data?.result) throw new Error('API failed')
    return data.result
  }
}

export default model
