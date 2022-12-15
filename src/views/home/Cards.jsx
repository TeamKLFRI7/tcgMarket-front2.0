import Card from '../../components/Card';
import {useGetCards}from '../../axios';

const Cards = () => {
    const {
        data,
        loading,
    } = useGetCards();
    console.log(data)
    return (
        <div>
            {loading && <div>Chargement</div>}
            {!loading && (
                <>
                    <div style={styles.pageHead}>
                        <div style={styles.pageHeadTextContainer}>
                            <p>{data.setName}</p>
                        </div>
                        <div style={styles.boxContainer}>
                            <div style={styles.pageHeadImgContainer}>
                                <img style={styles.pageHeadImg} src={data.img}/>
                            </div>
                        </div>
                    </div>
                    <div style={styles.mainContainer}>
                        {data.fkIdCar.map((card, index) => (
                            <div style={styles.cardsContainer} key={index}>
                                <Card card={card}/>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
};

const styles = {

    mainContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    cardsContainer: {
        width: 'calc(100% / 2 - 2rem)',
        marginBottom: '3rem',
    },

    pageHead: {
        height: '8rem',
        marginBottom: '2rem',
    },

    pageHeadTextContainer: {

    },

    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
    },

    pageHeadImgContainer: {
        width: 'calc(100% - 2rem)',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 8px',
        borderRadius: '.625rem',
    },

    pageHeadImg: {
        height: '4rem',
    },
};

export default Cards