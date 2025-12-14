import styles from './ImageGrid.module.css'

export default function ImageGrid({ images }) {
  if (!images.length) return null

  return (
    <div className={styles.grid}>
      {images.map((img, i) => (
        <div key={i} className={styles.card}>
          <img src={img} />
          <a href={img} download>Download</a>
        </div>
      ))}
    </div>
  )
}
