'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

import PromptForm from './components/PromptForm'
import ModelSelect from './components/ModelSelect'
import SizeSelect from './components/SizeSelect'
import OutputSelect from './components/OutputSelect'
import ProgressBar from './components/ProgressBar'
import ImageGrid from './components/ImageGrid'

export default function Home() {
  const [models, setModels] = useState([])
  const [model, setModel] = useState('')
  const [size, setSize] = useState('1:1')
  const [output, setOutput] = useState(1)
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/models')
      .then(res => res.json())
      .then(res => {
        setModels(res)
        setModel(res[0]?.id)
        setSize(res[0]?.sizes[0])
      })
  }, [])

  async function generate() {
    if (!prompt || !model) return
    setLoading(true)
    setImages([])

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': localStorage.getItem('API_KEY') || ''
      },
      body: JSON.stringify({ model, prompt, ratio: size, output })
    })

    const data = await res.json()
    setImages(data.images || [])
    setLoading(false)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>AI Image Generator</h1>

      <PromptForm value={prompt} onChange={setPrompt} />

      {models.length > 0 && (
        <div className={styles.row}>
          <ModelSelect models={models} value={model} onChange={setModel} />
          <SizeSelect model={models.find(m => m.id === model)} value={size} onChange={setSize} />
          <OutputSelect value={output} onChange={setOutput} />
        </div>
      )}

      <button className={styles.button} onClick={generate} disabled={loading || !prompt || !model}>
        Generate
      </button>

      {loading && <ProgressBar />}
      <ImageGrid images={images} />
    </main>
  )
}
