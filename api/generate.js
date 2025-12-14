import models from './_lib/models'

export default async function handler(req, res) {
  const { model, prompt, ratio, output = 1 } = req.body

  if (!models[model]) {
    return res.status(400).json({ error: 'Model not found' })
  }

  const results = []

  for (let i = 0; i < output; i++) {
    const img = await models[model].generate({ prompt, ratio })
    results.push(img)
  }

  res.status(200).json({
    success: true,
    images: results
  })
}
