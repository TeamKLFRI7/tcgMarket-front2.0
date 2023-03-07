import { useGetSell } from "../../axios";
import Card from "../../components/Card";
import "./sell.css";

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
            <div className={"cardsContainer"} key={index}>
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
  style: {
    sellContainer: "sell",
    sellCard: "sell-card",
    sellInfo: "sell-info",
    sellInfoElement: "sell-infoElement",
  },
};

export default Sell;
