'use client'

import Link from "../Common/link";
import Image from "../Common/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const backgroundStyle = {
    'backgroundColor' : '#cccccc', // use bg-color while testing
    // 'display' : 'flex',
    // 'position' : 'absolute',
    // 'flex-direction' : 'row',
    // 'justify-content' : 'space-between',
    // 'align-items' : 'center',
    // 'padding' : '2vh 4rem 2vh 4rem',
    'min-height' : '50vh',
} as React.CSSProperties;

function BackgroundImage(
    {imageStyle, initAnimation, src, width, height, alt} : 
    {imageStyle : React.CSSProperties, initAnimation : object, src : string, width : number, height : number, alt : string}) {

    return (
        <div style={imageStyle} >
            <animated.div style={initAnimation} >
                <Image src={src} width={width} height={height} alt={alt} />
            </animated.div>
        </div>
    )
}

export default function Background() {
    // const [mounted, setMounted] = useState<boolean>(false);

    // recoil 쪽으로 변수 옮길 것.
    const [windowWidth,  setWindowWidth]  = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const [topimageWidth, setTopimageWidth] = useState<number>(window.innerWidth * 0.5);
    const [topimageHeight, setTopimageHeight] = useState<number>(400);
    const [sideimageWidth, setSideimageWidth] = useState<number>(300);
    const [sideimageHeight, setSideimageHeight] = useState<number>(window.innerHeight);

    const [animationConfig, ] = useState<any>({ 
        duration: 1500,
        tension: 180, 
        friction: 12
    });
    
    const handleResize = function() {
        console.log(`화면 사이즈 x : ${window.innerWidth} | y : ${window.innerHeight}`);
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    // width에 영향을 받을 
    useEffect(() => {
        const widthlimit = 500;
        let tmpWidth = windowWidth * 0.5 > widthlimit ? widthlimit : windowWidth * 0.5;
        setTopimageWidth( tmpWidth );
        setTopimageHeight(tmpWidth * 0.3);

    }, [windowWidth]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // styles
    const topMiddleImgStyle = {
        "position" : "absolute",
        "left" : "50%",
        "transform" : "translate(-50%, 0%)"
    } as React.CSSProperties;

    const topRightImgStyle = {
        "position" : "absolute",
        "right" : "-10%",
    } as React.CSSProperties;
    
    const topLeftImgStyle = {
        "position" : "absolute",
        "left" : "-10%",
    } as React.CSSProperties;

    const leftImgStyle = {
        'position' : 'absolute',
        'left' : 0,
    } as React.CSSProperties;

    const rightImgStyle = {
        'position' : 'absolute',
        'right' : 0
    } as React.CSSProperties;

    // animations
    const topInitAnimation = useSpring({
        from : {marginTop : -topimageHeight},
        to : {marginTop : 0},
        animationConfig,
        delay : 500
    })

    const leftInitAnimation = useSpring({
        from : {marginLeft : -sideimageWidth}, 
        to : {marginLeft : 0},
        animationConfig
    });

    const rightInitAnimation = useSpring({
        from : {marginRight : -sideimageWidth}, 
        to : {marginRight : 0},
        animationConfig
    });

    return (
        <div style={backgroundStyle} >

            {/* top */}
            {/* <BackgroundImage 
                imageStyle={topImgStyle} initAnimation={topInitAnimation} 
                src={'/main/hall_t.png'} width={1000} height={400} alt={"topWall"} 
            /> */}
            <BackgroundImage 
                imageStyle={topMiddleImgStyle} initAnimation={topInitAnimation} 
                src={'/main/reference/top_middle.png'} width={topimageWidth} height={topimageHeight} alt={"topWall"} 
            />
            <BackgroundImage 
                imageStyle={topRightImgStyle} initAnimation={topInitAnimation} 
                src={'/main/reference/top_side.png'} width={topimageWidth} height={topimageHeight} alt={"top_r"} 
            />
            <BackgroundImage 
                imageStyle={topLeftImgStyle} initAnimation={topInitAnimation} 
                src={'/main/reference/top_side.png'} width={-topimageWidth} height={topimageHeight} alt={"top_l"} 
            />


            {/* left */}
            <BackgroundImage 
                imageStyle={leftImgStyle} 
                initAnimation={leftInitAnimation} 
                src={'/main/hall_l.png'} 
                width={300} height={1000} alt={"leftWall"} 
            />

            {/* right */}
            <BackgroundImage 
                imageStyle={rightImgStyle} 
                initAnimation={rightInitAnimation} 
                src={'/main/hall_r.png'} 
                width={300} height={1000} alt={"rightWall"} 
            />
        </div>
    )
}