import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import YellowButton from "../../components/buttons/YellowButton";
import "./Connexion.css";
import { api } from "./AuthService";

const Login = (props) => {
  const navigate = useNavigate();
  const basicUrl = process.env.REACT_APP_URL_API;
  const url = process.env.REACT_APP_URL;

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Votre nom d'utilisateur doit faire au mnimum 3 charactères.")
      .required("Le nom d'utilisateur est obligatoire."),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au mnimum 8 charactères.")
      .required("Le mot de passe est obligatoire."),
  });

  const [apiError, setApiError] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    api
      .post(`${url}/authentication_token`, values)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setApiError(null);
          localStorage.setItem("token", res.data.token);
          props.setToken(res.data.token);
  
          // -------------------- Récupère le profil utilisateur --------------------
          if (res.data.token) {
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
          }
          // -------------------- END --------------------
        } else if (res.response.status === 400 || res.response.status === 401) {
          setApiError("Les champs renseignés sont inexactes et/ou ne correspondent pas aux normes exigées. Veulliez vérifier vos informations.");
        }
        else if (res.response.status=== 403) {
          setApiError("Vous n'avez pas accès à ces informations.");
        } 
        else if (res.response.status === 404) {
          setApiError("Page innaccessible.");
        } 
        else if (res.response.status >= 500) {
          setApiError("Erreur serveur. Veuillez réassyer ultérieurement.");
        }
        setApiError(null)
        setSubmitting(false);
      })
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
            placeholder="Nom d'utilisateur"
            className="field"
          />
          <ErrorMessage name="userName" render={msg => <div className="error-msg">{msg}</div>}/>

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

export default Login;
