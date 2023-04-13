import { useGetAllGames } from "../../axios";
import { IcArrowLeft } from "../../assets/icons/IcArrowLeft";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./home.css";
import tcgLogo from "../../assets/img/logo-tcgMarket.png";

const Home = () => {
  const { data, loading } = useGetAllGames();
  const [isActive, setActive] = useState(false);
  const toggleGames = () => {
    setActive(!isActive);
  };

  return (
    <div className={"mainHome"}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"container"}>
          <div className={isActive ? "active_home" : "inactive_home"}>
            <div className="sub-container-1">
              <img src={tcgLogo} alt="" className="tcg-logo-home" />
              <h1 className="title-intro">
                Bienvenue sur <br />
                Trading Card Games Market !
              </h1>
              <p className="text-intro">
                Retrouvez vos cartes préférées parmis les univers disponibles.
                <br />
                Ici vous pouvez consulter, vendre et acheter des cartes
                Pokémons.
              </p>
              <button className="btn-see-games" onClick={toggleGames}>
                Voir les jeux
              </button>
            </div>
          </div>
          <div className={isActive ? "inactive_home" : "active_home"}>
            <button className={"returnToHome"} onClick={toggleGames}>
              <IcArrowLeft />{" "}
              <span className="returnText">Revenir à l'accueil</span>
            </button>
            <div className="sub-container-2">
              {data["hydra:member"].map((game) => (
                <Fragment key={game.id}>
                  {game.isActive === false ? (
                    <div
                      style={{
                        backgroundImage: `linear-gradient(0deg, rgba(50, 50, 50, 0.7), rgba(50, 50, 50, 0.7)), url(/${game.name}.png)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        cursor: "not-allowed",
                      }}
                    >
                      <img
                        src={`${game.name}-logo.png`}
                        className={"logoCard"}
                        alt={`${game.name} logo`}
                      />
                    </div>
                  ) : (
                    <Link
                      to={`/jeux/${game.id}`}
                      style={{ display: "contents" }}
                    >
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
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={`${game.name}-logo.png`}
                          className={"logoCardClickable"}
                          alt={`${game.name} logo`}
                        />
                      </div>
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
