import { useGetAllGames } from "../../axios";
import "./home.css";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import tcgLogo from "../../assets/img/logo-tcgMarket.png";

const Home = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { data, loading } = useGetAllGames();
  return (
    <div className={"mainHome"} ref={ref}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"container"}>
          <div className="sub-container-1">
            <img src={tcgLogo} alt="" className="tcg-logo" />
            <h1 className="title-intro">Bienvenue sur TCG Market !</h1>
            <p className="text-intro">
              Retrouvez vos cartes préférées parmis les univers disponibles.
              <br />
              Ici vous pouvez consulter, vendre et acheter des cartes Pokémons.
              <br />
              Les
            </p>
            <button>Voir les jeux</button>
          </div>
          <div className="sub-container-2">
            {data["hydra:member"].map((game) => (
              <>
                {game.isActive === false ? (
                  <div
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(50, 50, 50, 0.4), rgba(50, 50, 50, 0.4)), url(/${game.name}.png)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img
                      src={`${game.name}-logo.png`}
                      className={"logoCard"}
                      alt={"logo"}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundImage: `url(/${game.name}2.png)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img
                      src={`${game.name}-logo.png`}
                      className={"logoCardClickable"}
                      onClick={() => navigate(`/jeux/${game.id}`)}
                      alt={"logo"}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
export default Home;
