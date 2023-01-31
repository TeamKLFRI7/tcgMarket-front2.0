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
              <>
                {console.log(card.fkIdCardUser)}
                {card.fkIdCardUser.length !== 0 ? (
                  <Link to={"/boutique/iddelacarte"} style={styles.link}>
                    <div style={styles.cardsContainer} key={index}>
                      <Card card={card} />
                    </div>
                  </Link>
                ) : (
                  <div
                    style={{ ...styles.cardsContainer, ...styles.noSell }}
                    key={index}
                  >
                    <Card card={card} />
                  </div>
                )}
              </>
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

  link: {
    display: "contents",
  },
};

export default Cards;
