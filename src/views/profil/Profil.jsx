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
            {/* BOX ONE */}
            <div style={styles.boxContainer}>
              {/* BLOCK ONE */}
              <p style={styles.profilLabel} >Email : </p>
              <p style={styles.profilContent}> {data.email}</p>
              <hr style={styles.hrWithStyle} />
              {/* BLOCK TWO */}
              <p style={styles.profilLabel}>Téléphone : </p>
              <p style={styles.profilContent}>{data.phoneNumber}</p>
            </div>
            {/* BOX TWO */}
            <div style={styles.boxContainer}>
               {/* BLOCK THREE */}
              <p style={styles.profilLabel} >Addresse : </p>
              <p style={styles.profilContent}>{infoSup.address}</p>
               {/* BLOCK FOUR */}
              <p style={styles.profilLabel} >Ville : </p>
              <p style={styles.profilContent}>{infoSup.city}</p>
               {/* BLOCK FIVE */}
              <p style={styles.profilLabel} >Code Postal : </p>
              <p style={styles.profilContent}>{infoSup.postalCode}</p>
               {/* BLOCK SIX */}
              <p style={styles.profilLabel} >Pays : </p>
              <p style={styles.profilContent}>{infoSup.country}</p>
               {/* BLOCK SEVEN */}
              <hr style={styles.hrWithStyle} />
              <p style={styles.profilLabel} >Addresse de livraison : </p>
              <p style={styles.profilContent}>{infoSup.deliveryAddress}</p>
               {/* BLOCK EIGHT */}
              <hr style={styles.hrWithStyle} />
              <p style={styles.profilLabel} >Description : </p>
              <p style={styles.profilContent}>{infoSup.description}</p>
            </div>
          </div>
          <div style={styles.buttonContent}>
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
  boxContainer: {
    borderRadius: "10px",
    margin: "15px 0",
    padding: "15px 20px",
    boxShadow: "rgb(185 184 184) 0px 3px 10px"

  },
  hrWithStyle: {
    borderTop: "1px dashed #777",
    width: "100%",
    margin: "25px 0"
  },
  profilLabel: {
    color: "#555",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "0"
  },
  profilContent: {
    color: "rgb(55 64 240)",
    fontWeight: "400",
    fontSize: "18px",
    marginTop: "7px",
    marginBottom: "20px"
  }
};

export default Profil;
