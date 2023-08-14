import { default as NextImage } from "next/image";

export default function Image({src, width, height, alt} : {src : string, width : number, height : number, alt : string}) {

    return (
        <NextImage 
            src={process.env.REACT_APP_PUBLIC_URL + src} 
            width={width}
            height={height}
            alt={alt ? alt : "null"}
        />
    )
}