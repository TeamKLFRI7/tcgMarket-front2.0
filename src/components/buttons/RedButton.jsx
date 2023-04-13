import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./button.css";
import { getToken } from "../../getToken";

const RedButton = (props) => {
  let apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
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

  const [apiError, setApiError] = useState(null);
  const handleDeleteUser = (id) => {
    if (id) {
      axios
        .delete(apiUrl + "/users/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `application/json`,
          },
        })
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setApiError(null);
          navigate("/login");
        })
        .catch((err) => {
          setApiError(err);
        });
    }
  };

  return (
    <>
      <button
        onClick={() => handleDeleteUser(props.path)}
        type={props.type}
        className="btn deleteBtn"
      >
        {props.children}
      </button>
      <div>{apiError}</div>
    </>
  );
};

export default RedButton;
