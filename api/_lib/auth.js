import supabase from './supabase'

export async function verifyApiKey(req) {
  const key = req.headers['x-api-key']
  if (!key) return null

  const { data } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .single()

  if (!data || data.credits <= 0) return null

  return data
}

export async function reduceCredit(apiKeyId) {
  await supabase.rpc('decrement_credit', { key_id: apiKeyId })
}
