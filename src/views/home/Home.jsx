import { useGetAllGames } from "../../axios";
import WhiteButton from "../../components/buttons/WhiteButton";
import DisabledButton from "../../components/buttons/DisabledButton";
import "./home.css";

const Home = () => {
  const { data, loading } = useGetAllGames();
  return (
    <div className={"mainHome"}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"container"}>
          {data["hydra:member"].map((game) => (
            <>
              {game.isActive === false ? (
                <DisabledButton
                  type={"button"}
                  children={game.name}
                  key={game.id}
                />
              ) : (
                <WhiteButton
                  path={`/jeux/${game.id}`}
                  type={"button"}
                  children={game.name}
                  key={game.id}
                />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
