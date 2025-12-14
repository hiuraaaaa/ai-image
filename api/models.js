import models from './_lib/models'

export default function handler(req, res) {
  const list = Object.values(models).map(m => ({
    id: m.meta.id,
    name: m.meta.name,
    sizes: m.meta.sizes
  }))

  res.status(200).json(list) // langsung array
}
