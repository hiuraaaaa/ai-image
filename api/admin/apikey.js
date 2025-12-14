import { v4 as uuid } from 'uuid'
import supabase from '../_lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const key = uuid()

    const { data } = await supabase.from('api_keys').insert({
      key,
      credits: 100
    }).select().single()

    return res.json({ success: true, data })
  }

  if (req.method === 'GET') {
    const { data } = await supabase.from('api_keys').select('*')
    return res.json({ success: true, data })
  }
}
