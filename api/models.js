import { getAllModels } from './_lib/models'

export default function handler(req, res) {
  const models = getAllModels()
  res.status(200).json(models) // langsung array
}
