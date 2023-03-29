import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Connexion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WhiteButton from "../../components/buttons/WhiteButton";
import { api } from "./AuthService";

export const Register = (props) => {
  const apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const phoneRegex = /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/;
  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(15, "Le pseudo ne doit pas dépasser 15 caractères.")
      .required("Pseudo requis"),
    phoneNumber: Yup.string()
      .matches(phoneRegex, "Seul les numéros de téléphone en 06 et 07 acceptés")
      .required("Numéro de téléphone requis"),
    email: Yup.string()
      .email("Adresse mail invalide.")
      .required("Email requis"),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au mnimum 8 charactères.")
      .required("Mot de passe requis"),
  });

  const [apiError, setApiError] = useState(null);
  const [apiFieldsErr, setApiFieldsErr] = useState(null);
  console.log(apiFieldsErr);

  const handleSubmitRegister = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(apiUrl + "/register", values)
      .then(() => {
        let newUser = {
          userName: values.userName,
          password: values.password,
        };
        setApiError(null);
        api.post("/authentication_token", newUser).then((res) => {
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
            });
          // -------------------- END --------------------
          setSubmitting(false);
          // handle success
        });
        setSubmitting(false);
        // handle success
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 401) {
          setApiFieldsErr(err.response.data);
        } else if (err.response.status === 403) {
          setApiError("Vous n'avez pas accès à ces informations.");
        } else if (err.response.status === 404) {
          setApiError("Page innaccessible.");
        } else if (err.response.status >= 500) {
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
          <ErrorMessage
            name="userName"
            render={(msg) => <div className="error-msg">{msg}</div>}
          />
          {apiFieldsErr?.userName && (
            <div className="error-msg">{apiFieldsErr.userName}</div>
          )}

          <Field
            name="phoneNumber"
            type="text"
            className="field"
            placeholder="Téléphone"
          />
          <ErrorMessage
            name="phoneNumber"
            render={(msg) => <div className="error-msg">{msg}</div>}
          />

          <Field
            name="email"
            type="email"
            className="field"
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
            render={(msg) => <div className="error-msg">{msg}</div>}
          />
          {apiFieldsErr?.email && (
            <div className="error-msg">{apiFieldsErr.email}</div>
          )}

          <Field
            name="password"
            type="password"
            className="field"
            placeholder="Mot de passe"
          />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="error-msg">{msg}</div>}
          />
          {apiFieldsErr?.plainPassword && (
            <div className="error-msg">{apiFieldsErr.plainPassword}</div>
          )}

          <p className="link-btn">
            Vous avez un compte?{" "}
            <span
              className="span-btn"
              onClick={() => props.onFormSwitch("login")}
            >
              Connectez vous.
            </span>
          </p>
          <p className="error-connection">{apiError}</p>
          <WhiteButton path={"#"} type={"submit"} children={"s'inscrire"} />
        </Form>
      </div>
    </Formik>
  );
};
