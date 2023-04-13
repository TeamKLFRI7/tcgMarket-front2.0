import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import { useGetCards } from "../../axios";
import "./cards.css";

const Cards = () => {
  const { data, loading } = useGetCards();

  return (
    <div>
      {loading && <div>Chargement</div>}
      {!loading && (
        <>
          <PageHeader title={data.setName} img={data.logo} />
          <div className={"cards"}>
            {data.fkIdCar.map((card, index) => (
              <div key={index} className={"contents"}>
                {card.fkIdCardUser.length !== 0 ? (
                  <Link to={"" + card.id + "/ventes"} className={"contents"}>
                    <div className={"cards-cardContainer"}>
                      <Card img={card.img} name={card.name} />
                      <div className={"cards-cardCountContainer"}>
                        <div className={"cards-cardCardCount"}>
                          <img
                            src={require("../../assets/img/pokeball.png")}
                            alt={"pokeball"}
                            className={"cards-cardCardCountImg"}
                          />
                          <div className={"cards-cardCardCountText"}>
                            {card.fkIdCardUser.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className={"cards-cardContainer"}>
                    <Card
                      img={card.img}
                      name={card.name}
                      style={styles.style}
                    />
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
  style: {
    noSell: "noSell",
  },
};

export default Cards;
