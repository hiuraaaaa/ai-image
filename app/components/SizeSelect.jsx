import styles from './SizeSelect.module.css'

export default function SizeSelect({ model, value, onChange }) {
  if (!model) return null

  return (
    <select className={styles.select} value={value} onChange={e => onChange(e.target.value)}>
      {model.sizes.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}
