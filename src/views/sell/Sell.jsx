import { useGetSell } from "../../axios";
import Card from "../../components/Card";
import "./sell.css";

const Sell = () => {
  const { data, loading } = useGetSell();
  const apiUrl = process.env.REACT_APP_URL;

  return (
    <div>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"sellPage"}>
          {/*<h1>{data.name}</h1>*/}
          {data.fkIdCardUser.map((card, index) => (
            <div className={"cardsContainer"} key={index}>
              <Card
                key={index}
                style={styles.style}
                imgUrl={apiUrl + card.fileUrl}
                name={data.name}
                infoUser={card.fkIdUser}
                infoCard={card}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  style: {
    sellContainer: "sell",
    sellCard: "sell-card",
    sellInfo: "sell-info",
    sellImg: "sell-img",
    sellInfoElement: "sell-infoElement",
  },
};

export default Sell;
