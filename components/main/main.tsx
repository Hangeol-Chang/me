import Link from "next/link";
import Image from "../Common/image";



export default function Main() {
    return (
        <div>
            <Link href={`/projects`}>_projects_</Link>
            <Image src={`/testimg.png`} width={300} height={300} alt="testimg"/>
        </div>
    )

}