import { Link } from "react-router-dom";
import "./css/set.css";

const Set = (props) => {
  return (
    <>
      {props.setData.map((set, index) => (
        <Link to={"/set/" + set.id + "/cartes"} key={index}>
          <div className={"set"}>
            <img src={set.img} alt={"set icone"} className={"set-img"} />
            <img src={set.logo} alt={"set logo"} className={"set-img"} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default Set;
