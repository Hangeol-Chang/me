import Link from "../Common/link";
import Image from "../Common/image";
import Background from "./background";

export default function Main() {
    return (
        <div
            style={{
                backgroundColor : 'rgba(200, 150, 200, 0.5)'
            }}
        >
            <Link href={`/projects`}>_projects_</Link>
            {/* <Image src={`/testimg.png`} width={300} height={300} alt="testimg"/> */}


            <Background />
        </div>
    )
}