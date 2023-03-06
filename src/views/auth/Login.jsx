import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import YellowButton from "../../components/buttons/YellowButton";
import "./Connexion.css";
import { api } from './AuthService';

export const Login = (props) => {
  const navigate = useNavigate();
  const basicUrl = process.env.REACT_APP_URL_API;

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au mnimum 8 charactères")
      .required("Required"),
  });

  const [apiError, setApiError] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    api
      .post('/authentication_token', values)
      .then((res) => {
        setApiError(null);
        localStorage.setItem("token", res.data.token);
        props.setToken(res.data.token);

        // -------------------- Récupère le profil utilisateur --------------------
        axios
          .get(basicUrl + "/me", {
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
      });
  };

  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="formContainer">
        <h1 className="connexionTitle">CONNECTION</h1>
        <Form className="formContainerLog">
          <Field
            name="userName"
            type="text"
            placeholder="Username"
            className="field"
          />
          <ErrorMessage name="username" />

          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="field"
          />
          <ErrorMessage name="password" render={msg => <div className="error-msg">{msg}</div>} />

          <p
            className="link-btn"
          >
            Vous n'avez pas de compte?{" "}
            <span className="span-btn" onClick={() => props.onFormSwitch("register")}>En créer un.</span>
          </p>
          <p className="error-connection">{apiError}</p>
          <YellowButton path={"#"} type={"submit"} children={"se connecter"} />
        </Form>
      </div>
    </Formik>
  );
};
