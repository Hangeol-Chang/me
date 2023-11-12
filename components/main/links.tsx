"use client";

import { useRecoilState, useRecoilValue } from "recoil";
// import Link from "../Common/link";
import { animationInitFlagState, canChangePageState } from "../../states/mainStates";
import { useRouter } from "next/navigation";
import { relativePrefixState } from "../../states/states";

const linksStyle = {
    'position' : 'absolute',

    'right' : '20%',
    'bottom' : '500px',

    'display' : 'flex',
    'flexDirection' : 'column',

    'alignItems' : 'end',
    'font-size' : '2.5em',

} as React.CSSProperties;

export default function Links() {
    const relativePrefix = useRecoilValue(relativePrefixState);

    const [animationInitFlag, setAnimationInitFlag] = useRecoilState(animationInitFlagState);
    const [canChangePage, setCanChangePage] = useRecoilState(canChangePageState);
    const router = useRouter();

    function OnclickLink(href : string) {
        // animation Init 처리
        
        // canChangePage가 처리되면,
        router.push(relativePrefix + href);
    }
    // function Link(href : string) {


    return (
        <div style={linksStyle}>
            <a href={`/profile`}>_profile_</a>
            <a href={`/projects`}>_projects_</a>
            {/* <Link href={`/profile`} >_profile_</Link>
            <Link href={`/projects`}>_projects_</Link> */}

        </div>
    )
}