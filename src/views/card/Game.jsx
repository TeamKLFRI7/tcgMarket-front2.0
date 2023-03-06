import FrameSeries from "../../components/FrameSeries";
import {useGetGame} from "../../axios";
import Card from "../../components/Card";
import { useEffect, useState } from "react";


const Game = ({ searchResults }) => {
    const {
        data,
        loading
    } = useGetGame();

    const [cards, setCards] = useState(searchResults);

    useEffect(() => {
        setCards(searchResults);
        if (document.querySelector('input').value.length < 3) {
            setCards(null)
        }
    }, [searchResults]);
    

    let countResults = cards?.length;

  return (
    <div>
        { loading && <div>Chargement</div> }
        { !loading && (
            <>
                {cards ? null : (
                    <>
                        <h1 className={'title'}>Dernières cartes mises en ligne :</h1>
                        <h1 className={'title'}>Séries pokémons : </h1>
                        {data.cardSeries.map((serie, index) => (
                            <FrameSeries key={index} serieData={serie} />
                        ))}
                    </>
                )}
            </>
        )}
        {cards && (
            <>  
                <h1 className={'title'}>Cartes trouvées : { countResults }</h1>
                <div style={styles.mainContainer}>
                    {cards.map((card, index) => (
                        <div style={styles.cardsContainer}>
                            <Card img={card.img} name={card.name} key={index} />
                        </div>
                    ))}
                </div>
            </>)
        }
    </div>
  )
}

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
}

export default Game