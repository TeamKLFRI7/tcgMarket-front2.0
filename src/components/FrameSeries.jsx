import {useState} from "react";
import Set from "./Set";

const FrameSeries = (props, {children}) => {
    const [show, setShow] = useState();

    function toggleShow() {
        setShow(!show);
    }

    return (
        <div style={styles.cardContainer} onClick={toggleShow}>
            <div style={styles.card}>
                <img style={styles.serieCardImg} src={require('../assets/img/pokeball.png')} alt={'pokéball'} />
                <span>{props.serieData.serieName}</span>
            </div>
            <div>
                {show && <Set setData={props.serieData.fkIdCardSet}/>}
            </div>
        </div>
    )
};

const styles = {
    cardContainer: {
        width: '100%',
        minHeight: '3rem',
        marginBottom: '1rem',
        padding: '.5rem',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: '.625rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    card: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    serieCardImg: {
        maxWidth: '100%',
        maxHeight: '2rem',
        marginRight: '.5rem',
    }
};

export default FrameSeries