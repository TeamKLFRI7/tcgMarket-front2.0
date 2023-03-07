import { useGetAllGames } from "../../axios";
import WhiteButton from "../../components/buttons/WhiteButton";
import DisabledButton from "../../components/buttons/DisabledButton";
import "./home.css";
import { forwardRef } from "react";

const Home = forwardRef((props, ref) => {
  const { data, loading } = useGetAllGames();
  return (
    <div className={"mainHome"} ref={ref}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"container"}>
          {data["hydra:member"].map((game) => (
            <>
              {game.isActive === false ? (
                <DisabledButton
                  type={"button"}
                  style={"btn_mediumFontSize"}
                  children={game.name}
                  key={game.id}
                />
              ) : (
                <WhiteButton
                  path={`/jeux/${game.id}`}
                  style={"btn_mediumFontSize"}
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
});
export default Home;
