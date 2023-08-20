"use client";
import {default as NextLink} from "next/link";
import { useRecoilValue } from "recoil";
import { relativePrefixState } from "../../states/states";
import styled from "styled-components";

interface LinkStyle {

}

export default function Link(
    { children, href} : 
    { children : React.ReactNode, href : string}) {
    
    const relativePrefix = useRecoilValue(relativePrefixState);

    const StyledLink = styled(NextLink)<LinkStyle>`
        
    `;

    return (
        <StyledLink
            href={relativePrefix + href}
        >
            {children}
        </StyledLink>
    )
}