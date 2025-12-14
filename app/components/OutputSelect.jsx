import styles from './OutputSelect.module.css'

export default function OutputSelect({ value, onChange }) {
  return (
    <select className={styles.select} value={value} onChange={e => onChange(Number(e.target.value))}>
      {[1,2,3,4].map(n => (
        <option key={n} value={n}>{n} output</option>
      ))}
    </select>
  )
}
