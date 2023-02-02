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
  },

  noSell: {
    opacity: "0.6",
  },

  content: {
    display: "contents",
  },
};

export default Cards;
