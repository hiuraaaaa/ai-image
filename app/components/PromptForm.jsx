import styles from './PromptForm.module.css'

export default function PromptForm({ value, onChange }) {
  return (
    <textarea
      className={styles.input}
      placeholder="Describe your image..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
