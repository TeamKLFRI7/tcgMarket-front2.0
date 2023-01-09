const card = props => {
    console.log(props)
  return (
    <div style={styles.card}>
        <img style={styles.img} src={props.card.img} alt={"Carte " + props.card.name}/>
        <h2 style={styles.name}>{props.card.name}</h2>
    </div>
  )
}

const styles = {
    card: {
        padding: '.5rem',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 0px 8px',
        borderRadius: '3%',
        gap: '.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    img: {
        width: '100%',
        borderRadius: '3%',
    },
    name: {
        fontSize: '14px',
        margin: 0,
        padding: 0,
        textAlign: 'center',
    }
}

export default card