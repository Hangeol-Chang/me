const introduceStyle = {
    'position' : 'absolute',

    'left' : '20%',
    'top' : '400px',

    'display' : 'flex',
    'flexDirection' : 'column',

    'alignItems' : 'start',

} as React.CSSProperties;

const titleStyle = {
    'font-size' : '2.5em',
} as React.CSSProperties;

const bodyStyle = {
    'font-size' : '1.5em',
} as React.CSSProperties;

export default function Introduce() {

    return (
        <div style={introduceStyle}>
            <div style={titleStyle}>
                Hello. My name is Hangeol Chang.
            </div>
            <div style={bodyStyle}>
                welcome to my portfolio page.
            </div>
        </div>
    )
}