import {useGetAllGames} from "../../axios";
import WhiteButton from "../../components/buttons/WhiteButton";
import DisabledButton from "../../components/buttons/DisabledButton";


const Home = () => {
    const {
        data,
        loading,
    } = useGetAllGames();

  return (
    <div>
        {loading && <div>Chargement</div>}
        {!loading && (
            <div style={styles.container}>
                {data['hydra:member'].map((game, index) => (
                    <>
                        {game.name !== 'Pokemon'
                            ?
                            <DisabledButton type={'button'} children={game.name} key={game.id}/>
                            :
                            <WhiteButton path={`/jeux/${game.id}`} type={'button'} children={game.name} key={game.id}/>
                        }
                    </>
                ))}
            </div>
        )}
    </div>
  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btn: {
        width: '80%',
    }
}

export default Home