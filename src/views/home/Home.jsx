

const Home = () => {
  return (
    <div>
        <h1 style={styles.title}>Dernières cartes mises en ligne :</h1>
        <div style={styles.cardsContainer}>
        </div>
    </div>
  )
}

const styles = {
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexBasis: 'auto',
        justifyContent: 'space-between',
        gap: '10px',
    },
    title: {
        fontSize: '14px',
        margin: '0',
        marginBottom: '20px',
    }
}

export default Home