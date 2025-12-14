import registry from './registry'

export function getAllModels() {
  // mapping supaya frontend dapat {id, name, sizes}
  return registry.map(m => ({
    id: m.meta.id,
    name: m.meta.name,
    sizes: m.meta.sizes
  }))
}

export function getModelById(id) {
  return registry.find(m => m.meta.id === id)
}
