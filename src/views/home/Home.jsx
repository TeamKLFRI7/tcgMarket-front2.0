import { useGetAllGames } from "../../axios";
import "./home.css";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

const Home = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { data, loading } = useGetAllGames();
  return (
    <div className={"mainHome"} ref={ref}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div className={"container"}>
          {data["hydra:member"].map((game) => (
            <>
              {game.isActive === false ? (
                  <div style={{ 
                    backgroundImage: `linear-gradient(0deg, rgba(50, 50, 50, 0.4), rgba(50, 50, 50, 0.4)), url(/${game.name}.png)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    backgroundSize:"cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat" 
                  }}> 
                    <img src={`${game.name}-logo.png`} className={'logoCard'}/>
                </div>
              ) : (
                <div style={{ 
                  backgroundImage: `url(/${game.name}2.png)`, 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundSize:"cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat" 
                }}>
                  <img src={`${game.name}-logo.png`} className={'logoCardClickable'} onClick={() => navigate(`/jeux/${game.id}`)}/>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
});
export default Home;
