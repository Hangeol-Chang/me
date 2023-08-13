import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <main>
            main
            <Link href={`/projects`} />

            <Image src={`/testimg.png`} width={300} height={300} alt="testimg"/>
        </main>
    )
}
