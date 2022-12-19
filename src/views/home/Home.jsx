import Seriecard from "../../components/Seriecard";
import {useGetGame} from "../../axios";


const Home = () => {
    const {
        data,
        loading,
    } = useGetGame();
    //console.log(data);
  return (
    <div>
        {loading && <div>Chargement</div>}
        {!loading && (
            <>
                <h1 className={'title'}>Dernières cartes mises en ligne :</h1>
                <h1 className={'title'}>Séries pokémons :</h1>
                {data.cardSeries.map((serie, index) => (
                    <Seriecard key={index} serieData={serie} />
                ))}
            </>
        )}
    </div>
  )
}

export default Home