import Card from '../components/Card';
import {useGetCards}from '../../axios';

const Cards = () => {
    const {
        data,
        loading,
    } = useGetCards();
    //console.log(data.fkIdCar)
    return (
        <div>
            {loading && <div>Chargement</div>}
            {!loading && (
                <div style={styles.mainContainer}>
                    {data.fkIdCar.map((card, index) => (
                        <div style={styles.cardsContainer} key={index}>
                            <Card card={card}/>
                        </div>
                    ))}
                </div>
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
};

export default Cards