import Link from "../Common/link";

const linksStyle = {
    'position' : 'absolute',

    'right' : '20%',
    'top' : '500px',

    'display' : 'flex',
    'flexDirection' : 'column',

    'alignItems' : 'end',
    'font-size' : '2.5em',

} as React.CSSProperties;

export default function Links() {

    return (
        <div style={linksStyle}>
            <Link href={`/profile`} >_profile_</Link>
            <Link href={`/projects`}>_projects_</Link>

        </div>
    )
}