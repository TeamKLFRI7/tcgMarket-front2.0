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
      .max(15, "Must be 15 characters or less")
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
          })
          .catch((err) => {
            // console.log(err)
          });
        // -------------------- END --------------------

        navigate("/profil");
        setSubmitting(false);
        // handle success
      })
      .catch((err) => {
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
      initialValues={{ userName: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="formContainer">
        {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

        <h1 className="connexionTitle">CONNECTION</h1>
        <Form className="formContainerLog">
          {/* <label htmlFor="email" className='formLabel'>Email</label> */}
          <Field
            name="userName"
            type="text"
            placeholder="Username"
            className="field"
          />
          <ErrorMessage name="username" />

          {/* <label htmlFor="password" className='formLabel'>Password</label> */}
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="field"
          />
          <ErrorMessage name="password" />

          <p
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Vous n'avez pas de compte?{" "}
            <span className="span-btn">En créer un.</span>
          </p>
          <p className="error-connection">{apiError}</p>
          <YellowButton path={"#"} type={"submit"} children={"se connecter"} />
        </Form>
      </div>
    </Formik>
  );
};
