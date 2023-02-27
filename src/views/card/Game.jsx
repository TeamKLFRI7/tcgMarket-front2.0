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

  return (
    <div>
        { loading && <div>Chargement</div> }
        { !loading && (
            <>
                {cards ? null : (
                    <>
                        <h1 className={'title'}>Dernières cartes mises en ligne :</h1>
                        <h1 className={'title'}>Séries pokémons : </h1>
                    </>
                )}

                {cards ? null : (
                    data.cardSeries.map((serie, index) => (
                        <FrameSeries key={index} serieData={serie} />
                    ))
                )}
            </>
        )}
        {cards && (
            <>  
                <h1 className={'title'}>Résultat de recherche : </h1>
                {cards.map((card, index) => (
                    <Card img={card.img} name={card.name} key={index} />
                ))}
            </>)
        }
    </div>
  )
}

export default Game