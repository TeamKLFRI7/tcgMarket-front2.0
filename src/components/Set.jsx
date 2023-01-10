import {Link} from "react-router-dom";

const Set = props => {
    //console.log(props)
    return (
        <>
        {props.setData.map((set, index) => (
            <Link to={'/set/' + set.id + '/cartes'} key={index}>
                <div style={styles.setContainer}>
                        <img src={set.img} alt={'set icone'} style={styles.setImg}/>
                        <img src={set.logo} alt={'set logo'} style={styles.setImg}/>
                </div>
            </Link>
        ))}
        </>
    )
};

const styles = {
    setContainer: {
        width: 'calc(100% - 2rem)',
        minHeight: '3rem',
        margin: ' 1rem auto 1rem',
        paddingBottom: '1rem',
        borderBottom : '1px solid grey',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    setImg: {
        maxWidth: '50%',
        maxHeight: '2rem',
    }
};



export default Set