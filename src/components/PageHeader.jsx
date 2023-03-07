import "./css/pageHeader.css";

const PageHeader = (props) => {
  return (
    <div className={"pageHead"}>
      <h3>{props.title}</h3>
      <div className={"pageHead-ImgContainer"}>
        <img
          className={"pageHead-Img"}
          src={props.img}
          alt={"Couverture de page"}
        />
      </div>
    </div>
  );
};

export default PageHeader;
