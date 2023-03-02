import { useGetSell } from "../../axios";
import Card from "../../components/Card";

const Sell = () => {
  const { data, loading } = useGetSell();
  //console.log(data);
  return (
    <div>
      {loading && <div>Chargement</div>}
      {!loading && (
        <>
          <h1>{data.name}</h1>
          {data.fkIdCardUser.map((card, index) => (
            <div style={styles.cardsContainer} key={index}>
              <Card
                key={index}
                style={styles.style}
                img={card.images[1]}
                name={data.name}
                infoUser={card.fkIdUser}
                infoCard={card}
              />
            </div>
          ))}
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
    marginBottom: "1.5rem",
  },

  style: {
    sellContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      height: "16rem",
    },
    sellCard: {
      display: "flex",
      flexDirection: "column",
      width: "calc(50% - 1rem)",
    },
    sellInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "calc(100% - 2rem)",
    },
    sellInfoElement: {
      marginBottom: "1rem",
    },
  },
};

export default Sell;
