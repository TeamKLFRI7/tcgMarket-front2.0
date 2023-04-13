import React, { useEffect, useState } from "react";
import { useGetUserMe } from "../../axios";
import PurpleButton from "../../components/buttons/PurpleButton";
import RedButton from "../../components/buttons/RedButton";
import "./profil.css";
import { getToken } from "../../getToken";

const Profil = ({ setModalOpen }) => {
  const id = localStorage.getItem("user");
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken()
      .then((token) => {
        setToken(token);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  const { data, loading } = useGetUserMe();

  let infoSup = "";
  if (data.userInfo) {
    infoSup = data.userInfo;
  }
  return (
    <>
      {token && loading && <div>Chargement...</div>}
      {token && !loading && (
        <div>
          <h1 className="profilTitle">Mon profil</h1>
          <div className="formHeader_mobile">
            <div className="profilePicContainer">
              <img
                src={require("../../assets/img/pikachu2.png")}
                alt=""
                className="profilePicture"
              />
            </div>
            <h2 className="userName">{data.userName}</h2>
          </div>
          <div className="infoContent">
            {/* BOX ONE */}
            <div className="boxContainer">
              <div className="formHeader_desktop">
                <div className="profilePicContainer">
                  <img
                    src={require("../../assets/img/pikachu2.png")}
                    alt=""
                    className="profilePicture"
                  />
                </div>
                <h2 className="userName">{data.userName}</h2>
              </div>
              {/* BLOCK ONE */}
              <p className="profilLabel">Email : </p>
              <p className="profilContent"> {data.email}</p>
              <hr className="hrWithStyle" />
              {/* BLOCK TWO */}
              <p className="profilLabel">Téléphone : </p>
              <p className="profilContent">{data.phoneNumber}</p>
            </div>
            {/* BOX TWO */}
            <div className="boxContainer">
              {/* BLOCK THREE */}
              <p className="profilLabel">Addresse : </p>
              <p className="profilContent">{infoSup.address}</p>
              {/* BLOCK FOUR */}
              <p className="profilLabel">Ville : </p>
              <p className="profilContent">{infoSup.city}</p>
              {/* BLOCK FIVE */}
              <p className="profilLabel">Code Postal : </p>
              <p className="profilContent">{infoSup.postalCode}</p>
              {/* BLOCK SIX */}
              <p className="profilLabel">Pays : </p>
              <p className="profilContent">{infoSup.country}</p>
              {/* BLOCK SEVEN */}
              <hr className="hrWithStyle" />
              <p className="profilLabel">Addresse de livraison : </p>
              <p className="profilContent">{infoSup.deliveryAddress}</p>
              {/* BLOCK EIGHT */}
              <hr className="hrWithStyle" />
              <p className="profilLabel">Description : </p>
              <p className="profilContent">{infoSup.description}</p>
            </div>
          </div>
          <div className="buttonContent">
            <PurpleButton
              path={() => setModalOpen(true)}
              type={"submit"}
              children={"modifier"}
            />
            <RedButton path={id} type={"submit"} children={"supprimer"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
