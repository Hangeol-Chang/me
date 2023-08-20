"use client";
import { default as NextImage } from "next/image";
import { useRecoilValue } from "recoil";
import { prefixState } from "../../states/states";
import styled from "styled-components";

interface ImageStyle {

}

export default function Image(
    {src, width, height, alt} : 
    {src : string, width : number, height : number, alt : string}) {
    
    const prefix = useRecoilValue(prefixState);

    const StyledImage = styled(NextImage)<ImageStyle>`
        
    `;

    return (
        <StyledImage 
            src={prefix + src} 
            width={width}
            height={height}
            alt={alt ? alt : "null"}
        />
    )
}