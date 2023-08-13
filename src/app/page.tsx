import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
    return (
        <main className={styles.main}>
            main page

            <Link href={'/projects'}>projects</Link>
        </main>
    )
}
