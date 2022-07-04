import styles from './styles/Tag.module.css'

export default function Tag({ value, which, id }) {
    if (value === 0 || value === '') {
        return <div key={value + id}></div>
    } 
    return (
        <div key={value + id} className={`${styles.which} ${styles[which]}`} >
            {which === "payhour" ? `$${value}/hr` : `${value}`}
        </div>
    )
}