const Card = (props) => {
  return (
    <div style={{ ...styles.card, ...props.style?.sellContainer }}>
      <div style={props.style?.sellCard}>
        <img style={styles.img} src={props.img} alt={"Carte " + props.name} />
        <h2 style={styles.name}>{props.name}</h2>
      </div>
      <div style={{ ...styles.sellInfo, ...props.style?.sellInfo }}>
        <div>
          <div style={props.style?.sellInfoElement}>
            Vendeur : {props.infoUser?.userName}
          </div>
          <div style={props.style?.sellInfoElement}>
            État : {props.infoCard?.quality}
          </div>
          <div>Prix : {props.infoCard?.price}€</div>
        </div>
        <button style={styles.button}>Ajouter au panier</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: ".5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 8px",
    borderRadius: "3%",
    gap: ".5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  img: {
    width: "100%",
    borderRadius: "3%",
  },
  name: {
    fontSize: "14px",
    margin: 0,
    padding: 0,
    textAlign: "center",
  },

  sellInfo: {
    display: "none",
  },

  button: {
    width: "100%",
    padding: ".5rem 1rem",
    color: "#fff",
    backgroundColor: "rgb(100, 106, 234)",
    border: "none",
    borderRadius: "10px",
  },
};

export default Card;
