import "./button.css";
import "../css/card.css";

const PurpleButton = (props) => {
  return (
    <>
      <button
        onClick={props.path}
        type={props.type}
        className={`btn purpleBtn ${props.style}`}
      >
        {props.children}
      </button>
    </>
  );
};
export default PurpleButton;
