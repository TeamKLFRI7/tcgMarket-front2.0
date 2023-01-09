const FrameGames = (props) => {
    console.log(props)
    return (
        <div style={styles.cardContainer}>
            <div style={props.data.name !== 'pokemon' ? styles.disabledCard : styles.card}>
                <span>{props.data.name}</span>
            </div>
        </div>
    )
};

const styles = {
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        minHeight: '5rem',
        marginBottom: '1rem',
        padding: '.5rem',
        boxShadow: 'rgba(255, 255, 255, 0.9) 0px 3px 8px',
        borderRadius: '.625rem',
        display: 'flex',
    },

    card: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },

    disabledCard: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
};

export default FrameGames