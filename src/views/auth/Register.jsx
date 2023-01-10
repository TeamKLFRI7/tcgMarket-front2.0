import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Connexion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  let apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    pseudo: Yup.string()
      .max(15, "Le pseudo doit être d'au moins 15 charactères")
      .required("Required"),
    phone: Yup.string()
      .max(13, "Le numéro doit commencer par 06 ou 07 ou +33")
      .required("Required"),
    email: Yup.string().email("Adresse mail invalide").required("Required"),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au mnimum 8 charactères")
      .required("Required")
  });

  const [apiError, setApiError] = useState(null);

  const handleSubmitRegister = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(apiUrl + "/users", values)
      .then((res) => {
        console.log(res);
        setApiError(null);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        setSubmitting(false);
        // handle success
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code === 401) {
          setApiError("Lidentifiant ou le mot de passe est invalide.");
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
        pseudo: "",
        phone: "",
        email: "",
        password: ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitRegister}
    >
      <div className="formContainerInsc">
        <h1 className="inscriptionTitle">INSCRIPTION</h1>
        <Form className="formContainerLog">
          {/* <label htmlFor="pseudo">Pseudo</label> */}
          <Field
            name="pseudo"
            type="text"
            className="field"
            placeholder="Pseudo"
          />
          <ErrorMessage name="pseudo" />

          {/* <label htmlFor="phone">Téléphone</label> */}
          <Field
            name="phone"
            type="text"
            className="field"
            placeholder="Téléphone"
          />
          <ErrorMessage name="phone" />

          {/* <label htmlFor="email">Email</label> */}
          <Field
            name="email"
            type="email"
            className="field"
            placeholder="Email"
          />
          <ErrorMessage name="email" />

          {/* <label htmlFor="password">Password</label> */}
          <Field
            name="password"
            type="text"
            className="field"
            placeholder="Mot de passe"
          />
          <ErrorMessage name="password" />

          <p className="link-btn" onClick={() => props.onFormSwitch("login")}>
            Vous avez un compte?{" "}
            <span className="span-btn">Connectez vous.</span>
          </p>
          <p className="error-connection">{apiError}</p>
          <button type="submit" className="formBtnInsc">
            S'INSCRIRE
          </button>
        </Form>
      </div>
    </Formik>
  );
};
