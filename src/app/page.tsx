import Image from 'next/image'
import Link from 'next/link'
import { prefixState, relativePrefixState } from '../../states/states'
import Main from '../../components/main/main'
// import { useRecoilValue } from 'recoil'


export default function Home() {
    // const prefix = useRecoilValue(prefixState);
    // const relativePrefix = useRecoilValue(relativePrefixState);

    return (
        <main>
            <div>
                main
            </div>
            <Main />
        </main>
    )
}
