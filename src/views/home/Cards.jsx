import Card from '../../components/Card';
import {useGetCards}from '../../axios';
import PageHeader from "../../components/PageHeader";

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
                    <PageHeader title={data.setName} img={data.logo}/>
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
        width: 'calc(100% / 2 - 1rem)',
        marginBottom: '1.5rem',
    },
};

export default Cards