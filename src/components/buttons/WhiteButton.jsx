import "./button.css";
import { useNavigate } from "react-router-dom";

const WhiteButton = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(props.path)}
        type={props.type}
        className={`btn whiteBtn ${props.style}`}
      >
        {props.children}
      </button>
    </>
  );
};

export default WhiteButton;
