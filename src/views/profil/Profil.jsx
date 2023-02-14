import React from 'react'
import { useState, useEffect } from 'react'
import { useGetUserMe } from "../../axios";
import PurpleButton from "../../components/buttons/PurpleButton";
import RedButton from "../../components/buttons/RedButton";

const Profil = ({ setModalOpen }) => {
  const id = localStorage.getItem("user");

  const [token, setToken] = useState();

  const getToken = async () => {
    const localToken = await localStorage.getItem("token");

    if (localToken) setToken(localToken);
  };
  useEffect(() => {
    getToken();
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
          <h1>Mon profil</h1>
          <div style={styles.formHeader}>
            <div style={styles.profilePicContainer}>
              <img
                src={require("../../assets/img/pikachu2.png")}
                alt=""
                style={styles.profilePicture}
              />
            </div>
            <h2 style={styles.userName}>{data.userName}</h2>
          </div>
          <div style={styles.infoContent}>
            <hr />
            <p>Email : {data.email}</p>
            <p>Téléphone : {data.phoneNumber}</p>
            <hr />
            <p>Description : {infoSup.description}</p>
            <p>Addresse : {infoSup.address}</p>
            <p>Ville : {infoSup.city}</p>
            <p>Code Postal : {infoSup.postalCode}</p>
            <p>Pays : {infoSup.country}</p>
            <p>Addresse de livraison : {infoSup.deliveryAddress}</p>
          </div>
          <div style={styles.buttonContent}>
            <PurpleButton
              path={() => setModalOpen(true)}
              type={"submit"}
              children={"modifier"}
            />
            <RedButton path={id} type={"submit"} children={"suprprimer"} />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  profilePicContainer: {
    borderRadius: "50%",
    backgroundColor: "#636AF2",
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: "50px",
  },
  formHeader: {
    display: "flex",
  },
  userName: {
    marginLeft: "20px",
  },
  button: {
    justifyContent: "center",
  },
  infoContent: {
    marginBottom: "20px",
  },
  buttonContent: {
    display: "flex",
    flexDirection: "row",
    zIndex: "2",
  },
};

export default Profil;
