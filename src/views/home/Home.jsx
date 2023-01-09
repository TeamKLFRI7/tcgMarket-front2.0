import {useGetAllGames} from "../../axios";
import FrameGames from "../../components/FrameGames";
import {Link} from "react-router-dom";


const Home = () => {
    const {
        data,
        loading,
    } = useGetAllGames();
    console.log(data['hydra:member']);
  return (
    <div>
        {loading && <div>Chargement</div>}
        {!loading && (
            <>
                {data['hydra:member'].map((game, index) => (
                    <>
                        {game.name !== 'Pokemon'
                            ?
                            <FrameGames data={game} />
                            :
                            <Link to={'jeux/' + game.id} key={index}>
                                <FrameGames data={game} />
                            </Link>
                        }
                    </>
                ))}
            </>
        )}
    </div>
  )
}

export default Home