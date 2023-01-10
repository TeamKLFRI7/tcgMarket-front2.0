import FrameSeries from "../../components/FrameSeries";
import {useGetGame} from "../../axios";


const Game = () => {
    const {
        data,
        loading,
    } = useGetGame();

  return (
    <div>
        {loading && <div>Chargement</div>}
        {!loading && (
            <>
                <h1 className={'title'}>Dernières cartes mises en ligne :</h1>
                <h1 className={'title'}>Séries pokémons :</h1>
                {data.cardSeries.map((serie, index) => (
                    <FrameSeries key={index} serieData={serie} />
                ))}
            </>
        )}
    </div>
  )
}

export default Game