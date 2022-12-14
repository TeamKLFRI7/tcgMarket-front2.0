import { Link } from "react-router-dom"

const card = () => {
  return (
    <div style={styles.card}>
        <img style={styles.img} src="./fixtures/card.png"/>
        <h2 style={styles.name}>Dracaufeu</h2>
        <div>
            <Link to="#"/>
        </div>
    </div>
  )
}

const styles = {
    card: {
        padding: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 8px',
        borderRadius: '10px',
        width: '48%',
        gap: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    img: {
        width: '100%'
    },
    name: {
        fontSize: '14px',
        margin: 0,
        padding: 0,
        textAlign: 'center'
    }
}

export default card