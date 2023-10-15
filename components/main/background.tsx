import Image from "../Common/image";

const backgroundStyle = {
    'background-color' : '#cccccc', // use bg-color while testing
    // 'display' : 'flex',
    // 'position' : 'absolute',
    // 'flex-direction' : 'row',
    // 'justify-content' : 'space-between',
    // 'align-items' : 'center',
    // 'padding' : '2vh 4rem 2vh 4rem',
    'min-height' : '50vh',
} as React.CSSProperties;

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
    'right' : 0,
} as React.CSSProperties;

export default function Background() {
    return (
        <div style={backgroundStyle} >

            <div style={topImgStyle} >
                <Image src={'/main/hall_t.png'} width={1000} height={400} alt="topWall" />
            </div>

            <div style={leftImgStyle} >
                <Image src={'/main/hall_l.png'} width={300} height={1000} alt="leftWall" />
            </div>
            <div style={rightImgStyle} >
                <Image src={'/main/hall_r.png'} width={300} height={1000} alt="rightWall" />
            </div>
        </div>
    )
}