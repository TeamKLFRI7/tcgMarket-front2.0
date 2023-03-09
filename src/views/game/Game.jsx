import FrameSeries from "../../components/FrameSeries";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { useGetGame } from "../../axios";
import "./game.css";

const Game = (props) => {
  const { data, loading } = useGetGame();
  const [cards, setCards] = useState(props.searchResults);
  let countResults = cards?.length;
  console.log(cards);
  useEffect(() => {
    if (props.searchResults !== null) {
      setCards(props.searchResults);
    } else {
      setCards(null);
    }
  }, [props.searchResults]);

  return (
    <div className={"games"}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <>
          {cards ? null : (
            <div className={"width90"}>
              <h1 className={"title"}>Dernières cartes mises en ligne :</h1>
              <h1 className={"title"}>Séries pokémons :</h1>
              {data.cardSeries.map((serie, index) => (
                <FrameSeries key={index} serieData={serie} />
              ))}
            </div>
          )}
        </>
      )}
      {cards && (
        <div className={"width90"}>
          <h1 className={"title search-title"}>
            Cartes trouvées : {countResults}
          </h1>
          <div className={"search-cardContainer"}>
            {cards.map((card, index) => (
              <div className={"search-card"} key={index}>
                <Card img={card.img} name={card.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
