import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Connexion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WhiteButton from "../../components/buttons/WhiteButton";
import { api } from './AuthService';


export const Register = (props) => {
  const apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(15, "Le pseudo ne doit pas dépasser 15 charactères")
      .required("Required"),
    phoneNumber: Yup.string()
      .max(13, "Le numéro doit commencer par 06 ou 07 ou +33")
      .required("Required"),
    email: Yup.string().email("Adresse mail invalide").required("Required"),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au mnimum 8 charactères")
      .required("Required"),
  });

  const [apiError, setApiError] = useState(null);

  const handleSubmitRegister = (values, { setSubmitting }) => {
    console.log(values)
    setSubmitting(true);
    axios.post(apiUrl + "/register", values)
      .then((res) => {
        console.log(res)
        let newUser = {
          "userName": values.userName,
          "password": values.password
          
        }
        console.log(newUser);
        setApiError(null);
        api
          .post('/authentication_token', newUser)
          .then((res) => {
            setApiError(null);
            localStorage.setItem("token", res.data.token);
            props.setToken(res.data.token);
            // -------------------- Récupère le profil utilisateur --------------------
            api
              .get("/api/me", {
                headers: {
                  Authorization: `Bearer ${res.data.token}`,
                  "Content-Type": `application/json`,
                },
              })
              .then((res) => {
                localStorage.setItem("user", res.data.id);
                navigate("/profil");
              })
              .catch((err) => {
              });
            // -------------------- END --------------------
            setSubmitting(false);
            // handle success
        })
        setSubmitting(false);
        // handle success
      })
      .catch((err) => {
        if (err.response.data.code === 401) {
          setApiError("L'identifiant et/ou le mot de passe sont invalides.");
        } else if (err.response.data.code === 403) {
          setApiError("Vous n'avez pas accès à ces informations.");
        } else if (err.response.data.code === 404) {
          setApiError("Page innaccessible.");
        } else if (err.response.data.code >= 500) {
          setApiError("Erreur serveur. Veuillez réassyer ultérieurement.");
        }
        setSubmitting(false);
        // handle error
      });
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        phoneNumber: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitRegister}
    >
      <div className="formContainerInsc">
        <h1 className="inscriptionTitle">INSCRIPTION</h1>
        <Form className="formContainerLog">
          <Field
            name="userName"
            type="text"
            className="field"
            placeholder="Pseudo"
          />
          <ErrorMessage name="userName" />

          <Field
            name="phoneNumber"
            type="text"
            className="field"
            placeholder="Téléphone"
          />
          <ErrorMessage name="phoneNumber" />

          <Field
            name="email"
            type="email"
            className="field"
            placeholder="Email"
          />
          <ErrorMessage name="email" />

          <Field
            name="password"
            type="password"
            className="field"
            placeholder="Mot de passe"
          />
          <ErrorMessage name="password" />

          <p className="link-btn" onClick={() => props.onFormSwitch("login")}>
            Vous avez un compte?{" "}
            <span className="span-btn">Connectez vous.</span>
          </p>
          <p className="error-connection">{apiError}</p>
          <WhiteButton path={"#"} type={"submit"} children={"s'inscrire"} />
        </Form>
      </div>
    </Formik>
  );
};
