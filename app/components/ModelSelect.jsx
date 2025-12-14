import styles from './ModelSelect.module.css'

export default function ModelSelect({ models, value, onChange }) {
  return (
    <select className={styles.select} value={value} onChange={e => onChange(e.target.value)}>
      {models.map(m => (
        <option key={m.id} value={m.id}>{m.name}</option>
      ))}
    </select>
  )
}
