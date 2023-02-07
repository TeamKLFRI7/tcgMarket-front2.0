import "./button.css";

const PurpleButton = (props) => {
  return (
    <>
      <button onClick={props.path} type={props.type} className="btn purpleBtn">
        {props.children}
      </button>
    </>
  );
};

export default PurpleButton;
