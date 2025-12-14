import registry from './registry'

export function getAllModels() {
  return registry
}

export function getModelById(id) {
  return registry.find(m => m.id === id)
}
