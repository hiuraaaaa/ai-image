const model = {
  meta: {
    id: 'stable-diffusion',
    name: 'Stable Diffusion 3.5',
    sizes: ['1:1','9:16','16:9']
  },
  generate: async ({ prompt, ratio }) => {
    const url = 'https://api.nekolabs.web.id/image-generation/stable-diffusion/3.5'
    const res = await axios.get(url, { params: { prompt, ratio } })
    return res.data.result
  }
}

export default model
