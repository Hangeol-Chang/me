import {default as NextLink} from "next/link";

export default function Link({ children, href} : { children : React.ReactNode, href : string}) {
    
    return (
        <NextLink 
            href={process.env.REACT_APP_RELATE_URL + href}
        >
            {children}
        </NextLink>
    )
}