import models from './_lib/models'
import { verifyApiKey, reduceCredit } from './_lib/auth'

export default async function handler(req, res) {
  const apiKey = await verifyApiKey(req)
  if (!apiKey) {
    return res.status(401).json({ error: 'Invalid API Key' })
  }

  const { model, prompt, ratio, output = 1 } = req.body

  if (!models[model]) {
    return res.status(400).json({ error: 'Model not found' })
  }

  const images = []

  for (let i = 0; i < output; i++) {
    const img = await models[model].generate({ prompt, ratio })
    images.push(img)
    await reduceCredit(apiKey.id)
  }

  res.json({ success: true, images })
}
