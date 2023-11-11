'use client'

import Link from "../Common/link";
import Image from "../Common/image";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { getImageSize } from "next/dist/server/image-optimizer";

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

/*
    === docs ===
    1. Image Size reference
        - bg_middle     : 4700 * 500
        - bg_ top       : 4700 * 800
        - ceiling_left  : 1050 * 750
        - ceiling_middle: 2300 * 750
        - ceiling_right : 1050 * 750
        - floor_plant_b : 500  * 550
        - floor_plant_f : 650  * 610
        - side_plant_b  : 350  * 550
        - side_plant_f  : 610  * 850
        - side_wall_b   : 1000 * 3500
        - side_wall_f   : 700  * 3500
        - top_light_b   : 200  * 450
        - top_light_f   : 320  * 900
*/

function BackgroundImage(
    {imageStyle, initAnimation, src, size, scaleFactor, alt} : 
    {imageStyle : React.CSSProperties, initAnimation : object, src : string, size : {'width' : number, 'height' : number}, scaleFactor : number, alt : string}) {

    return (
        <div style={imageStyle} >
            <animated.div style={initAnimation} >
                <Image src={src} width={size.width * scaleFactor} height={size.height * scaleFactor} alt={alt} />
            </animated.div>
        </div>
    )
}

export default function Background() {
    const imageSizeData = {
        "bg_middle" :       { "width" : 4700, "height" : 500},
        "bg_top" :          { "width" : 4700, "height" : 800},
        "ceiling_left" :    { "width" : 1050, "height" : 750},
        "ceiling_middle" :  { "width" : 2300, "height" : 750},
        "ceiling_right" :   { "width" : 1050, "height" : 750},
        "floor_plant_b" :   { "width" : 500, "height" :  550},
        "floor_plant_f" :   { "width" : 650, "height" :  610},
        "side_plant_b" :    { "width" : 350, "height" :  550},
        "side_plant_f" :    { "width" : 610, "height" :  850},
        "side_wall_b" :     { "width" : 1000, "height" : 3500},
        "side_wall_f" :     { "width" : 700, "height" :  3500},
        "top_light_b" :     { "width" : 200, "height" :  450},
        "top_light_f" :     { "width" : 320, "height" :  900}
    }
    // const [mounted, setMounted] = useState<boolean>(false);

    // recoil 쪽으로 변수 옮길 것.
    const [windowWidth,  setWindowWidth]  = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const [topimageWidth, setTopimageWidth] = useState<number>(window.innerWidth * 0.5);
    const [topimageHeight, setTopimageHeight] = useState<number>(400);
    const [sideimageWidth, setSideimageWidth] = useState<number>(300);
    const [sideimageHeight, setSideimageHeight] = useState<number>(window.innerHeight);

    const [ceilingWidthConst, setCeilingWidthConst] = useState<number>(1);     // 0.09 ~ 0.2727
    const [sideHeightConst, setSideHeightConst] = useState<number>(1);

    useEffect(() => {
        /*
            가로 최소 400 / 최대 1200
            2300 + 1050 + 1050 = 4400이 한 화면에 들어와야 함. 1200 / 
        */
        if(windowWidth > 1200)      setCeilingWidthConst(0.2727);
        else if(windowWidth > 400)  setCeilingWidthConst(windowWidth / 4400);
        else                        setCeilingWidthConst(0.09);

    }, [windowWidth])
    
    useEffect(() => {
        /*
            세로 최소 800 / 최대 1440
            800 / 3500
        */
       if(windowHeight > 1440)      setSideHeightConst(0.4114);
       else if(windowHeight > 800)  setSideHeightConst(windowHeight / 3500);
       else                         setSideHeightConst(0.2285);


    }, [windowHeight])

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

    // left
    const leftFImgStyle = {
        'position' : 'absolute',
        'left' : -13 / (ceilingWidthConst * ceilingWidthConst),
        'top' : '3%'
    } as React.CSSProperties;
    
    const leftBImgStyle = {
        'position' : 'absolute',
        'left' : -15 / (ceilingWidthConst * ceilingWidthConst),
        'top' : '3%'
    } as React.CSSProperties;

    const leftPlantFImgStyle = {
        'position' : 'absolute',
        'left' : (sideHeightConst * 200) -13 / (ceilingWidthConst * ceilingWidthConst),
        'top' : sideHeightConst * 1200
    } as React.CSSProperties;
    
    const leftPlantBImgStyle = {
        'position' : 'absolute',
        'left' : (sideHeightConst * 800) -15 / (ceilingWidthConst * ceilingWidthConst),
        'top' : sideHeightConst * 1300
    } as React.CSSProperties;

    // right
    const rightFImgStyle = {
        'position' : 'absolute',
        'right' : -13 / (ceilingWidthConst * ceilingWidthConst),
        'top' : '3%'
    } as React.CSSProperties;

    const rightBImgStyle = {
        'position' : 'absolute',
        'right' : -15 / (ceilingWidthConst * ceilingWidthConst),
        'top' : '3%'
    } as React.CSSProperties;

    const rightPlantFImgStyle = {
        'position' : 'absolute',
        'right' : (sideHeightConst * 200) -13 / (ceilingWidthConst * ceilingWidthConst),
        'top' : sideHeightConst * 1200
    } as React.CSSProperties;
    
    const rightPlantBImgStyle = {
        'position' : 'absolute',
        'right' : (sideHeightConst * 800) -15 / (ceilingWidthConst * ceilingWidthConst),
        'top' : sideHeightConst * 1300
    } as React.CSSProperties;

    // top
    const ceilingMiddleImgStyle = {
        "position" : "absolute",
        "left" : "50%",
        "transform" : "translate(-50%, 0%)"
    } as React.CSSProperties;

    const ceilingRightImgStyle = {
        "position" : "absolute",
        "right" : -1 / ceilingWidthConst,
    } as React.CSSProperties;
    
    const ceilingLeftImgStyle = {
        "position" : "absolute",
        "left" : -1 / ceilingWidthConst,
    } as React.CSSProperties;

    const ceilingRightLightBStyle = {
        "position" : "absolute",
        "right" : "30%",
        "top" : ceilingWidthConst * 550
    } as React.CSSProperties;

    const ceilingRightLightFStyle = {
        "position" : "absolute",
        "right" : "15%",
        "top" : "0%"
    } as React.CSSProperties;

    const ceilingLeftLightBStyle = {
        "position" : "absolute",
        "left" : "30%",
        "top" : ceilingWidthConst * 550
    } as React.CSSProperties;

    const ceilingLeftLightFStyle = {
        "position" : "absolute",
        "left" : "15%",
        "top" : "0%"
    } as React.CSSProperties;

    

    // bottom

    // bg
    const bgMiddleImgStyle = {
        "position" : "absolute",
        "left" : "50%",
        "top" : "20%",
        "transform" : "translate(-50%, 0%)"
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
            
            {/* bg */}
            <BackgroundImage 
                imageStyle={ceilingMiddleImgStyle} initAnimation={topInitAnimation} 
                src={'/main/bg_top.png'}
                size={imageSizeData.bg_top} scaleFactor={ceilingWidthConst}
                alt={"top_r"} 
            />
            <BackgroundImage 
                imageStyle={bgMiddleImgStyle} initAnimation={topInitAnimation} 
                src={'/main/bg_middle.png'}
                size={imageSizeData.bg_middle} scaleFactor={ceilingWidthConst}
                alt={"top_r"} 
            />

            {/* left */}
            <BackgroundImage 
                imageStyle={leftBImgStyle} 
                initAnimation={leftInitAnimation} 
                src={'/main/side_wall_left_b.png'} 
                size={imageSizeData.side_wall_b} scaleFactor={sideHeightConst} alt={"leftWall_b"} 
            />
            <BackgroundImage 
                imageStyle={leftPlantBImgStyle} 
                initAnimation={leftInitAnimation} 
                src={'/main/side_plant_left_b.png'} 
                size={imageSizeData.side_plant_b} scaleFactor={sideHeightConst} alt={"leftplant_b"} 
            />

            <BackgroundImage 
                imageStyle={leftFImgStyle} 
                initAnimation={leftInitAnimation} 
                src={'/main/side_wall_left_f.png'} 
                size={imageSizeData.side_wall_f} scaleFactor={sideHeightConst} alt={"leftWall_f"} 
            />
            <BackgroundImage 
                imageStyle={leftPlantFImgStyle} 
                initAnimation={leftInitAnimation} 
                src={'/main/side_plant_left_f.png'} 
                size={imageSizeData.side_plant_f} scaleFactor={sideHeightConst} alt={"leftplant_f"} 
            />


            
            {/* right */}
            <BackgroundImage 
                imageStyle={rightBImgStyle} 
                initAnimation={rightInitAnimation} 
                src={'/main/side_wall_right_b.png'} 
                size={imageSizeData.side_wall_b} scaleFactor={sideHeightConst} alt={"rightWall_b"} 
            />
            <BackgroundImage 
                imageStyle={rightPlantBImgStyle} 
                initAnimation={rightInitAnimation} 
                src={'/main/side_plant_right_b.png'} 
                size={imageSizeData.side_plant_b} scaleFactor={sideHeightConst} alt={"leftplant_b"} 
            />


            <BackgroundImage 
                imageStyle={rightFImgStyle} 
                initAnimation={rightInitAnimation} 
                src={'/main/side_wall_right_f.png'} 
                size={imageSizeData.side_wall_f} scaleFactor={sideHeightConst} alt={"rightWall_f"} 
            />
            <BackgroundImage 
                imageStyle={rightPlantFImgStyle} 
                initAnimation={rightInitAnimation} 
                src={'/main/side_plant_right_f.png'} 
                size={imageSizeData.side_plant_f} scaleFactor={sideHeightConst} alt={"leftplant_f"} 
            />

            {/* top */}
            {/* <BackgroundImage 
                imageStyle={topImgStyle} initAnimation={topInitAnimation} 
                src={'/main/hall_t.png'} width={1000} height={400} alt={"topWall"} 
            /> */}

            <BackgroundImage 
                imageStyle={ceilingRightImgStyle} initAnimation={topInitAnimation} 
                src={'/main/ceiling_right.png'}
                size={imageSizeData.ceiling_right} scaleFactor={ceilingWidthConst}
                alt={"top_r"} 
            />
            <BackgroundImage 
                imageStyle={ceilingLeftImgStyle} initAnimation={topInitAnimation} 
                src={'/main/ceiling_left.png'}
                size={imageSizeData.ceiling_left} scaleFactor={ceilingWidthConst}
                alt={"top_l"} 
            />

            {/* 조명 */}
            
            <BackgroundImage 
                imageStyle={ceilingRightLightBStyle} initAnimation={topInitAnimation} 
                src={'/main/top_light_b.png'}
                size={imageSizeData.top_light_b} scaleFactor={ceilingWidthConst}
                alt={"top_right_light_b"} 
            />
            <BackgroundImage 
                imageStyle={ceilingRightLightFStyle} initAnimation={topInitAnimation} 
                src={'/main/top_light_f.png'}
                size={imageSizeData.top_light_f} scaleFactor={ceilingWidthConst}
                alt={"top_right_light_f"} 
            />

            <BackgroundImage 
                imageStyle={ceilingLeftLightBStyle} initAnimation={topInitAnimation} 
                src={'/main/top_light_b.png'}
                size={imageSizeData.top_light_b} scaleFactor={ceilingWidthConst}
                alt={"top_right_light_b"} 
            />
            <BackgroundImage 
                imageStyle={ceilingLeftLightFStyle} initAnimation={topInitAnimation} 
                src={'/main/top_light_f.png'}
                size={imageSizeData.top_light_f} scaleFactor={ceilingWidthConst}
                alt={"top_right_light_f"} 
            />


            <BackgroundImage 
                imageStyle={ceilingMiddleImgStyle} initAnimation={topInitAnimation} 
                src={'/main/ceiling_middle.png'} 
                size={imageSizeData.ceiling_middle} scaleFactor={ceilingWidthConst}
                alt={"topWall"} 
            />
            
        </div>
    )
}