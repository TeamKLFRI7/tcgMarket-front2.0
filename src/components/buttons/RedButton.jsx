import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./button.css";

const RedButton = (props) => {
  let apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const getToken = async () => {
    const localToken = await localStorage.getItem("token");

    if (localToken) setToken(localToken);
  };
  useEffect(() => {
    getToken();
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
