import { useGetAllGames } from "../../axios";
import WhiteButton from "../../components/buttons/WhiteButton";
import DisabledButton from "../../components/buttons/DisabledButton";
import home from "../../assets/img/home.png";

const Home = () => {
  const { data, loading } = useGetAllGames();
  return (
    <div style={styles.mainHome}>
      {loading && <div>Chargement</div>}
      {!loading && (
        <div style={styles.container}>
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

const styles = {
  mainHome: {
    backgroundImage: `url(${home}), radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(99,106,242,1) 53%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "fill",
    backgroundPosition: "0% 100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "none",
    marginBottom: "5px",
    padding: "20px",
    fontSize: "18px",
    flexGrow: "1",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    width: "80%",
  },
};

export default Home;
