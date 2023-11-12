'use client'

import Image from "../Common/image";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useRecoilState } from "recoil";
import { animationInitFlagState } from "../../states/mainStates";

const backgroundStyle = {
    'backgroundColor' : '#EEEEEE', // use bg-color while testing
    // 'display' : 'flex',
    // 'position' : 'absolute',
    // 'flex-direction' : 'row',
    // 'justify-content' : 'space-between',
    // 'align-items' : 'center',
    // 'padding' : '2vh 4rem 2vh 4rem',
    // 'min-height' : '50vh',
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

    interface sizeDataInterface {
        [key : string] : {width : number, height : number}
    }

    const imageSizeData : sizeDataInterface = {
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
    const [windowWidth,  setWindowWidth]  = useState<number>(1200);
    const [windowHeight, setWindowHeight] = useState<number>(800);

    const [ceilingWidthConst, setCeilingWidthConst] = useState<number>(0.25);     // 0.09 ~ 0.2727
    const [sideHeightConst, setSideHeightConst] = useState<number>(0.4);        // 0.2285 ~ 04114

    const [animationInitFlag, setAnimationInitFlag] = useRecoilState(animationInitFlagState);

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

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        setAnimationInitFlag(true);

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
    const bottomLeftPlantBStyle = {
        'position' : 'absolute',
        'left' : (sideHeightConst * 850) - 15 / (ceilingWidthConst * ceilingWidthConst),
        'bottom' : 100
    } as React.CSSProperties;

    const bottomLeftPlantFStyle = {
        'position' : 'absolute',
        'left' : (sideHeightConst * 500) - 15 / (ceilingWidthConst * ceilingWidthConst),
        'bottom' : 50
    } as React.CSSProperties;

    const bottomRightPlantBStyle = {
        'position' : 'absolute',
        'right' : (sideHeightConst * 850) - 15 / (ceilingWidthConst * ceilingWidthConst),
        'bottom' : 100
    } as React.CSSProperties;

    const bottomRightPlantFStyle = {
        'position' : 'absolute',
        'right' : (sideHeightConst * 500) - 15 / (ceilingWidthConst * ceilingWidthConst),
        'bottom' : 50
    } as React.CSSProperties;

    // bg
    const bgMiddleImgStyle = {
        "position" : "absolute",
        "left" : "50%",
        "top" : "20%",
        "transform" : "translate(-50%, 0%)"
    } as React.CSSProperties;

    // animations
    const MakeAnimation = function(tag : string, initPos : number) {
        let animation = {};

        if(tag == "top") {
            animation = { marginTop : animationInitFlag ? 0 : -initPos}
        }
        else if (tag == "left") {
            animation = { marginLeft : animationInitFlag ? 0 : -initPos}
        }
        else if (tag == "right") {
            animation = { marginRight : animationInitFlag ? 0 : -initPos}
        }
        else if (tag == "bottom") {
            animation = { marginBottom : animationInitFlag ? 0 : -initPos}
        }

        return useSpring({
            ...animation,
            delay : Math.floor(Math.random() * (2000 - 200)) + 200,
            duration: 2500,
            tension: 180, 
            friction: 12
        })
    }

    type imageType = {
        src : string,
        imageStyle : React.CSSProperties,
        initAnimation : any,
        sizeData : string,
        scaleFactor : number
    }

    const images : Array<imageType> = [
        // background
        {
            'src' : 'bg_top.png', 'sizeData' : 'bg_top',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingMiddleImgStyle,
            'initAnimation' : MakeAnimation('top', 400),
        }, 
        {
            'src' : 'bg_middle.png', 'sizeData' : 'bg_middle',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : bgMiddleImgStyle,
            'initAnimation' : MakeAnimation('top', 400),
        },

        // left side
        {
            'src' : 'side_wall_left_b.png', 'sizeData' : 'side_wall_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : leftBImgStyle,
            'initAnimation' : MakeAnimation('left', 400),
        }, 
        {
            'src' : 'side_plant_left_b.png', 'sizeData' : 'side_plant_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : leftPlantBImgStyle,
            'initAnimation' : MakeAnimation('left', 900),
        }, 
        {
            'src' : 'side_wall_left_f.png', 'sizeData' : 'side_wall_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : leftFImgStyle,
            'initAnimation' : MakeAnimation('left', 400),
        },
        {
            'src' : 'side_plant_left_f.png', 'sizeData' : 'side_plant_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : leftPlantFImgStyle,
            'initAnimation' : MakeAnimation('left', 400),
        },

        // right side
        {
            'src' : 'side_wall_right_b.png', 'sizeData' : 'side_wall_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : rightBImgStyle,
            'initAnimation' : MakeAnimation('right', 400),
        }, 
        {
            'src' : 'side_plant_right_b.png', 'sizeData' : 'side_plant_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : rightPlantBImgStyle,
            'initAnimation' : MakeAnimation('right', 900),
        }, 
        {
            'src' : 'side_wall_right_f.png', 'sizeData' : 'side_wall_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : rightFImgStyle,
            'initAnimation' : MakeAnimation('right', 400),
        }, 
        {
            'src' : 'side_plant_right_f.png', 'sizeData' : 'side_plant_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : rightPlantFImgStyle,
            'initAnimation' : MakeAnimation('right', 400),
        },

        // ceiling
        {
            'src' : 'ceiling_right.png', 'sizeData' : 'ceiling_right',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingRightImgStyle,
            'initAnimation' : MakeAnimation('top', 400),
        }, 
        {
            'src' : 'ceiling_left.png', 'sizeData' : 'ceiling_left',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingLeftImgStyle,
            'initAnimation' : MakeAnimation('top', 400),
        },

        {
            'src' : 'top_light_b.png', 'sizeData' : 'top_light_b',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingRightLightBStyle,
            'initAnimation' : MakeAnimation('top', 400),
        }, 
        {
            'src' : 'top_light_f.png', 'sizeData' : 'top_light_f',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingRightLightFStyle,
            'initAnimation' : MakeAnimation('top', 400),
        }, 
        {
            'src' : 'top_light_b.png', 'sizeData' : 'top_light_b', 
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingLeftLightBStyle,
            'initAnimation' : MakeAnimation('top', 400),
        }, 
        {
            'src' : 'top_light_f.png', 'sizeData' : 'top_light_f',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingLeftLightFStyle, 
            'initAnimation' : MakeAnimation('top', 400),
        },

        {
            'src' : 'ceiling_middle.png', 'sizeData' : 'ceiling_middle',
            'scaleFactor' : ceilingWidthConst, 'imageStyle' : ceilingMiddleImgStyle,
            'initAnimation' : MakeAnimation('top', 400),
        },

        {
            'src' : 'floor_plant_left_b.png', 'sizeData' : 'floor_plant_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : bottomLeftPlantBStyle,
            'initAnimation' : MakeAnimation('bottom', 500),
        },
        {
            'src' : 'floor_plant_left_f.png', 'sizeData' : 'floor_plant_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : bottomLeftPlantFStyle,
            'initAnimation' : MakeAnimation('bottom', 500),
        },
        
        {
            'src' : 'floor_plant_right_b.png', 'sizeData' : 'floor_plant_b',
            'scaleFactor' : sideHeightConst, 'imageStyle' : bottomRightPlantBStyle,
            'initAnimation' : MakeAnimation('bottom', 500),
        },
        {
            'src' : 'floor_plant_right_f.png', 'sizeData' : 'floor_plant_f',
            'scaleFactor' : sideHeightConst, 'imageStyle' : bottomRightPlantFStyle,
            'initAnimation' : MakeAnimation('bottom', 500),
        },

        // floor
    ]

    return (
        <div style={backgroundStyle} >
            {
                images.map( (image : imageType, idx) => (
                    <BackgroundImage
                        key={image.src + idx}
                        imageStyle={image.imageStyle} initAnimation={image.initAnimation} 
                        src={`/main/${image.src}`}
                        size={imageSizeData[image.sizeData]} scaleFactor={image.scaleFactor}
                        alt={image.src} 
                    />
                ))
            }            
        </div>
    )
}