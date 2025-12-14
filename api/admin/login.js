export default function handler(req, res) {
  const { email, password } = req.body

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true })
  }

  res.status(401).json({ error: 'Unauthorized' })
}
