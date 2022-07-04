import styles from './styles/Tag.module.css'

export default function Tag({ value, which }) {
    if (value === 0 || value === '') {
        return <div></div>
    } 
    return (
        <div key={value} className={`${styles.which} ${styles[which]}`} >
            {which === "payhour" ? `$${value}/hr` : `${value}`}
        </div>
    )
}