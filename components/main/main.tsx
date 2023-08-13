"use client";
import { useRecoilValue } from "recoil"
import { prefixState, relativePrefixState } from "../../states/states"
import Link from "next/link";
import Image from "next/image";



export default function Main() {
    const prefix = useRecoilValue(prefixState);
    const relativePrefix = useRecoilValue(relativePrefixState);

    return (
        <div>
            <Link href={`${relativePrefix}/projects`}>_projects_</Link>
        
            <Image src={`${prefix}/testimg.png`} width={300} height={300} alt="testimg"/>
        </div>
    )

}