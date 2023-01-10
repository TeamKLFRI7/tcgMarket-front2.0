import './button.css';

const DisabledButton = props => {

    return (
        <>
            <button type={props.type} className='btn whiteBtn'><span style={styles.disabled}></span>{props.children}</button>
        </>
    )
}

const styles = {
    disabled: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '0',
        color: 'white',
        borderRadius: '10px',
        backgroundColor: 'rgb(0 0 0 / 0.6)',
        textTransform: 'lowercase',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}

export default DisabledButton