import { getAllModels } from './_lib/models'

export default function handler(req, res) {
  const list = getAllModels()
  res.status(200).json(list) // langsung array, frontend bisa pakai langsung
}
