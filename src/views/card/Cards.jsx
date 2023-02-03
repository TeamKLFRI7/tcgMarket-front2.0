import Card from "../../components/Card";
import { useGetCards } from "../../axios";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";

const Cards = () => {
  const { data, loading } = useGetCards();

  return (
    <div>
      {loading && <div>Chargement</div>}
      {!loading && (
        <>
          <PageHeader title={data.setName} img={data.logo} />
          <div style={styles.mainContainer}>
            {data.fkIdCar.map((card, index) => (
              <div key={index} style={styles.content}>
                {card.fkIdCardUser.length !== 0 ? (
                  <Link to={"/boutique/" + card.id} style={styles.content}>
                    <div style={styles.cardsContainer}>
                      <Card img={card.img} name={card.name} />
                      <div style={styles.cardCountContainer}>
                        <div style={styles.cardCount}>
                          <img
                            src={require("../../assets/img/pokeball.png")}
                            alt={"pokeball"}
                            style={styles.cardCountImg}
                          />
                          <div style={styles.cardCountText}>
                            {card.fkIdCardUser.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div style={{ ...styles.cardsContainer, ...styles.noSell }}>
                    <Card img={card.img} name={card.name} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardsContainer: {
    width: "calc(100% / 2 - 1rem)",
    marginBottom: "1.5rem",
    position: "relative",
  },
  cardCountContainer: {
    position: "absolute",
    top: -16,
    right: -16,
    textAlign: "center",
    borderRadius: "51%",
  },
  cardCount: {
    position: "relative",
    height: "2.5rem",
  },
  cardCountImg: {
    width: "2.5rem",
    height: "2.5rem",
  },
  cardCountText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    fontSize: "2rem",
    webkitTextStroke: "1.5px white",
  },
  noSell: {
    opacity: "0.6",
  },
  content: {
    display: "contents",
  },
};

export default Cards;
