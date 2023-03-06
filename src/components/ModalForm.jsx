import { useState, useEffect } from "react";
import { useGetUserMe } from "../axios";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import PurpleButton from "./buttons/PurpleButton";
import axios from "axios";
import "./css/modalForm.css";
import { IcXMark } from "../assets/icons/IcXMark";

const ModalForm = ({ setModalOpen }) => {
  let apiUrl = process.env.REACT_APP_URL_API;
  const [token, setToken] = useState();
  const [apiError, setApiError] = useState(null);
  const id = localStorage.getItem("user");

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

  const phoneRegex = /^(?:\+\d[0-9]|0)\d{9}$/;
  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(15, "Le pseudo ne doit pas dépasser 15 charactères.")
      .required("Pseudo requis"),
    phoneNumber: Yup.string()
      .matches(phoneRegex, 'Le numéro doit commencer par 06 ou 07 et être composé de 10 chiffre exactement.')
      .required("Numéro de téléphone requis"),
    email: Yup.string().email("Adresse mail invalide.").required("Email requis"),
    description: Yup.string()
      .max(154, 'Vous ne pouvez pas dépasser 154 charactères.'),
    address: Yup.string()
      .max(255, 'Vous ne pouvez pas dépasser 255 charactères.'),
    city: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Le nom de la ville ne doit être composé que de lettres.'),
    postalCode: Yup.string()
      .max(10, 'Le code postal ne doit pas excéder 10 chiffres.')
      .matches(/^[0-9]+$/, 'Le nom code postal ne doit être composé que de chiffres.'),
    country: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Le pays ne doit être composé que de lettres.'),
    deliveryAddress: Yup.string()
      .max(255, 'Vous ne pouvez pas dépasser 255 charactères.')
  }); 

  const handleSubmitModifications = (values, { setSubmitting }) => {
    values.userInfo["id"] = infoSup.id;
    setSubmitting(true);
    if (id) {
      axios
        .put(apiUrl + "/users/" + id, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        })
        .then(() => {
          setSubmitting(false);
          setModalOpen(false);
          window.location.reload(true);
        })
        .catch((err) => {
          if (err.response.data.code === 401) {
            setApiError("Lidentifiant ou le mot de passe est invalide.");
          }
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      {loading && <div>Chargement...</div>}
      {!loading && (
        <Formik
          initialValues={{
            userName: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            description: infoSup.description,
            address: infoSup.address,
            city: infoSup.city,
            postalCode: infoSup.postalCode,
            country: infoSup.country,
            deliveryAddress: infoSup.deliveryAddress,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitModifications}
        >
          <div className="modalBackground">
            <div className="modalContainer">
              <div className="modalHeader">
                <h3 className="heading">Modifier mon profil</h3>
                <button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  id="cancelBtn"
                  className="closeBtn"
                >
                  <IcXMark color="black" />
                </button>
              </div>
              <div className="modal, row">
                <Form>
                  <div className="modalContent">
                    <div className="col mobileFields">
                      <label htmlFor="userName" className="modalProfilLabel">Pseudo : </label>
                      <Field
                        name="userName"
                        type="text"
                        className="myField"
                        placeholder={data.userName}
                      />
                      <ErrorMessage name="userName" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="email" className="modalProfilLabel">Email : </label>
                      <Field
                        name="email"
                        type="email"
                        className="myField"
                        placeholder={data.email}
                      />
                      <ErrorMessage name="email" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="phoneNumber" className="modalProfilLabel">Téléphone : </label>
                      <Field
                        name="phoneNumber"
                        type="numbers"
                        className="myField"
                        placeholder={data.phoneNumber}
                      />
                      <ErrorMessage name="phoneNumber" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>


                    <div className="col mobileFields">
                      <label htmlFor="address" className="modalProfilLabel">Adresse : </label>
                      <Field
                        name="address"
                        type="text"
                        className="myField"
                        placeholder={infoSup.address}
                      />
                      <ErrorMessage name="address" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="city" className="modalProfilLabel">Ville : </label>
                      <Field
                        name="city"
                        type="text"
                        className="myField"
                        placeholder={infoSup.city}
                      />
                      <ErrorMessage name="city" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="postalCode" className="modalProfilLabel">
                        Code postal :{" "}
                      </label>
                      <Field
                        name="postalCode"
                        type="text"
                        className="myField"
                        placeholder={infoSup.postalCode}
                      />
                      <ErrorMessage name="postalCode" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="country" className="modalProfilLabel">Pays : </label>
                      <Field
                        name="country"
                        type="text"
                        className="myField"
                        placeholder={infoSup.country}
                      />
                      <ErrorMessage name="country" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="deliveryAddress" className="modalProfilLabel">
                        Adresse de livraison :{" "}
                      </label>
                      <Field
                        name="deliveryAddress"
                        type="text"
                        className="myField"
                        placeholder={infoSup.deliveryAddress}
                      />
                      <ErrorMessage name="deliveryAddress" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                    <div className="col mobileFields">
                      <label htmlFor="description" className="modalProfilLabel">
                        Description :{" "}
                      </label>
                      <Field
                        name="description"
                        component="textarea"
                        className="myField descField"
                        rows="7"
                        placeholder={infoSup.description}
                      />
                      <ErrorMessage name="description" render={msg => <div className="error-msg-modal">{msg}</div>}/>
                    </div>

                  </div>
                  <div className="modalActions">
                    <div className="actionsContainer">
                      <PurpleButton
                        path={() => console.log()}
                        type={"submit"}
                        children={"Modifier mon profil"}
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Formik>
      )}
    </>
  );
};

export default ModalForm;
