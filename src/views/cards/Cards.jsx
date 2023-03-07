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
                  <Link to={"/boutique/" + card.id} className={"contents"}>
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
                  <div className={"cards-cardContainer noSell"}>
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

export default Cards;
