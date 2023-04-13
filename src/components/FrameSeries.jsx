import { useEffect, useState } from "react";
import Set from "./Set";
import "./css/frameSeries.css";

const FrameSeries = (props) => {
  const [show, setShow] = useState(false);
  const [isViewportWide, setIsViewportWide] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const viewportWidth = window.innerWidth;
      setIsViewportWide(viewportWidth >= 600);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <div
      className={"serial serial_shadowNone"}
      onClick={!isViewportWide ? toggleShow : undefined}
    >
      <div className={"serial-info"}>
        <img
          className={"serial-infoImg"}
          src={require("../assets/img/pokeball.png")}
          alt={"pokéball"}
        />
        <span>{props.serieData.serieName}</span>
      </div>
      <div className={"serial-setList"}>
        {(isViewportWide || show) && (
          <Set setData={props.serieData.fkIdCardSet} />
        )}
      </div>
    </div>
  );
};

export default FrameSeries;
