import PurpleButton from "./buttons/PurpleButton";
import "./css/card.css";

const Card = (props) => {
  return (
    <div className={`card ${props.style?.sellContainer}`}>
      <div className={props.style?.sellCard}>
        <img
          className={`card-img ${props.style?.noSell}`}
          src={props.imgUrl ? props.imgUrl : props.img}
          alt={"Carte " + props.name}
        />
        <span className={"card-name"}>{props.name}</span>
      </div>
      <div className={`card-sellInfo_dNone ${props.style?.sellInfo}`}>
        <div>
          <div className={props.style?.sellInfoElement}>
            Vendeur : {props.infoUser?.userName}
          </div>
          <div className={props.style?.sellInfoElement}>
            État : {props.infoCard?.quality}
          </div>
          <div>Prix : {props.infoCard?.price}€</div>
        </div>
        <PurpleButton
          style={"card-addButton"}
          type={"button"}
          children={"Ajouter au panier"}
        />
      </div>
    </div>
  );
};

export default Card;
