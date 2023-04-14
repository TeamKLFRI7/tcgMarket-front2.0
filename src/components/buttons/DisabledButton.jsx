import "./button.css";

const DisabledButton = (props) => {
  return (
    <>
      <button
        disabled={true}
        type={props.type}
        className={`btn whiteBtn ${props.style}`}
      >
        <span className={"disabledOverlay"}></span>
        {props.children}
      </button>
    </>
  );
};

export default DisabledButton;
