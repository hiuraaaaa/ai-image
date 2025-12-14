import { getModelById } from './_lib/models'
import { verifyApiKey, reduceCredit } from './_lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = await verifyApiKey(req)
  if (!apiKey) return res.status(401).json({ error: 'Invalid API Key' })

  const { model: modelId, prompt, ratio, output = 1 } = req.body
  const model = getModelById(modelId)
  if (!model) return res.status(400).json({ error: 'Model not found' })

  try {
    const images = []
    for (let i = 0; i < output; i++) {
      const img = await model.generate({ prompt, ratio })
      images.push(img)
      await reduceCredit(apiKey.id)
    }
    res.json({ success: true, images })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate image' })
  }
}
