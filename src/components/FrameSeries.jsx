import { useState } from "react";
import Set from "./Set";
import "./css/frameSeries.css";

const FrameSeries = (props) => {
  const [show, setShow] = useState();

  function toggleShow() {
    setShow(!show);
  }

  return (
    <div className={"serial"} onClick={toggleShow}>
      <div className={"serial-info"}>
        <img
          className={"serial-infoImg"}
          src={require("../assets/img/pokeball.png")}
          alt={"pokéball"}
        />
        <span>{props.serieData.serieName}</span>
      </div>
      <div>{show && <Set setData={props.serieData.fkIdCardSet} />}</div>
    </div>
  );
};

export default FrameSeries;
