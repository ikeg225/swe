import styles from './styles/Header.module.css'

export default function Header() {
    return (
        <div className={styles.nav}>
            <div className={styles.left}>
                <h3>[]</h3>
            </div>
            <div className={styles.right}>
                <p>About</p>
                <p>Contact</p>
                <p>Advertise</p>
            </div>
        </div>
    )
}