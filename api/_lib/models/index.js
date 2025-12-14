import fs from 'fs'
import path from 'path'

const modelsDir = path.join(process.cwd(), 'api/_lib/models')

const models = {}

for (const folder of fs.readdirSync(modelsDir)) {
  if (folder === 'index.js') continue

  const modelPath = path.join(modelsDir, folder, 'model.js')
  if (fs.existsSync(modelPath)) {
    const mod = await import(`./${folder}/model.js`)
    models[mod.meta.id] = mod
  }
}

export default models
