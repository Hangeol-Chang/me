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

export default function Background() {
    const [mounted, setMounted] = useState<boolean>(false);
    const [sideImageWidth, ] = useState<number>(300);
    const [topImageHeight, ] = useState<number>(400);

    const [animationConfig, ] = useState<any>({ 
        duration: 1500,
        tension: 180, 
        friction: 12
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // styles
    const topImgStyle = {
        "position" : "absolute",
        "left" : "50%",
        "transform" : "translate(-50%, 0%)"
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
        from : {marginTop : -topImageHeight},
        to : {marginTop : 0},
        animationConfig,
        delay : 500
    })

    const leftInitAnimation = useSpring({
        from : {marginLeft : -sideImageWidth}, 
        to : {marginLeft : 0},
        animationConfig
    });

    const rightInitAnimation = useSpring({
        from : {marginRight : -sideImageWidth}, 
        to : {marginRight : 0},
        animationConfig
    });

    return (
        <div style={backgroundStyle} >
            <div style={topImgStyle} >
                <animated.div style={topInitAnimation}>
                    <Image src={'/main/hall_t.png'} width={1000} height={400} alt="topWall" />
                </animated.div>
            </div>

            <div style={leftImgStyle} >
                <animated.div style={leftInitAnimation} >
                    <Image src={'/main/hall_l.png'} width={300} height={1000} alt="leftWall" />
                </animated.div>
            </div>
            <div style={rightImgStyle} >
                <animated.div style={rightInitAnimation}>
                    <Image src={'/main/hall_r.png'} width={300} height={1000} alt="rightWall" />
                </animated.div>
            </div>
        </div>
    )
}