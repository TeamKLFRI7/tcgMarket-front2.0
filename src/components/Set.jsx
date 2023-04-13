import { Link } from "react-router-dom";
import "./css/set.css";

const Set = (props) => {
  return (
    <>
      {props.setData.map((set) => (
        <div className={"setContainer"} key={set.id}>
          <Link to={"set/" + set.id + "/cartes"} className={"set-link"}>
            <div className={"set"}>
              <div className={"set-iconContainer"}>
                <img
                  src={set.img}
                  alt={"set icon"}
                  className={"set-img icon"}
                />
              </div>
              <div className={"set-logoContainer"}>
                <img
                  src={set.logo}
                  alt={"set logo"}
                  className={"set-img logo"}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Set;
