import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { useGetSelling } from "../../axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import game from "../card/Game";

const FormSell = () => {
  let apiUrl = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const id = localStorage.getItem("user");
  const cover = require("../../assets/img/sellCover.png");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gameIndex: "",
    game: "",
    seriesIndex: "",
    series: "",
    setIndex: "",
    set: "",
    cardIndex: "",
    card: "",
    cardImage: "",
    name: "",
    quality: "",
    price: "",
    imageFiles: [],
    images: [],
  });

  const { data, loading } = useGetSelling();

  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "game") {
      // Si le champ modifié est le champ de sélection de jeu
      // on cherche l'index du jeu sélectionné dans le tableau de jeux récupéré de l'API
      const gameIndex = data["hydra:member"].findIndex(
        (game) => game.id === parseInt(value)
      );
      setFormData({
        ...formData,
        [name]: parseInt(value),
        gameIndex,
        // Empeche un comportement non désiré: disparition du formulaire si changement de jeu avec plusieurs champs remplis
        seriesIndex: "",
        series: "",
        setIndex: "",
        set: "",
        cardIndex: "",
        card: "",
      });
    } else if (name === "series") {
      const seriesIndex = data["hydra:member"][
        formData.gameIndex
      ].cardSeries.findIndex((series) => series.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: parseInt(value),
        seriesIndex,
      });
    } else if (name === "set") {
      const setIndex = data["hydra:member"][formData.gameIndex].cardSeries[
        formData.seriesIndex
      ].fkIdCardSet.findIndex((set) => set.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: parseInt(value),
        setIndex,
      });
    } else if (name === "card") {
      const cardIndex = data["hydra:member"][formData.gameIndex].cardSeries[
        formData.seriesIndex
      ].fkIdCardSet[formData.setIndex].fkIdCar.findIndex(
        (set) => set.id === parseInt(value)
      );
      const cardImage =
        data["hydra:member"][formData.gameIndex].cardSeries[
          formData.seriesIndex
        ].fkIdCardSet[formData.setIndex].fkIdCar[cardIndex].img;
      setFormData({
        ...formData,
        [name]: value,
        cardIndex,
        cardImage,
      });
    } else if (name === "imageFiles") {
      const { files } = event.target;
      const ValidImageFiles = [...formData.imageFiles];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
          ValidImageFiles.push(file);
        }
      }
      if (ValidImageFiles.length) {
        setFormData({
          ...formData,
          imageFiles: ValidImageFiles,
        });
        return;
      }
      alert("Le format de l'image sélectionné n'est pas valide!");
    } else {
      // Si le champ modifié est autre chose que le champ de sélection de jeu
      // on met à jour le state formData avec la nouvelle valeur
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const nextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const sellData = new FormData();
    // sellData.append("fkIdUser", 1);
    // sellData.append("name", formData.name);
    // sellData.append("quality", formData.quality);
    // sellData.append("price", formData.price);
    // sellData.append("card", formData.card);
    // sellData.append("cardSet", formData.set);
    // for (let i = 0; i < formData.imageFiles.length; i++) {
    //   sellData.append("file", formData.imageFiles[i]);
    // }
    // sellData.append("fkIdGame", formData.game);

    axios
      .postForm(apiUrl + "/sellCard", {
        fkIdUser: id,
        name: formData.name,
        quality: formData.quality,
        price: formData.price,
        card: formData.card,
        cardSet: formData.set,
        file: formData.imageFiles[0],
        fkIdGame: formData.game,
      })
      .then(() => {
        navigate("/profil");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    const fileReaders = [];
    let isCancel = false;
    if (formData.imageFiles.length) {
      const promise = formData.imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReaders.push(fileReader);
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
              resolve(result);
            }
          };
          fileReader.onabort = () => {
            reject(new Error("Lecture du fichier annulé"));
          };
          fileReader.onerror = () => {
            reject(new Error("Echec de la lecture du fichier"));
          };
          fileReader.readAsDataURL(file);
        });
      });
      Promise.all(promise)
        .then((images) => {
          if (!isCancel) {
            setFormData({
              ...formData,
              images: images,
            });
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [formData.imageFiles]);

  switch (step) {
    case 1:
      return (
        <>
          <PageHeader
            title="Vendez vos cartes"
            img={cover}
            style={styles.style}
          />
          <div style={styles.formContainer}>
            <p>1. Sélectionnez une carte :</p>
            <form onSubmit={nextStep} style={styles.form}>
              <div>
                <select
                  name="game"
                  id="game"
                  onChange={handleChange}
                  style={styles.formElement}
                >
                  <option value="">Sélectionnez un jeu</option>
                  {data["hydra:member"]?.map((game, index) => (
                    <option value={game.id} key={index}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="series"
                  id="series"
                  onChange={handleChange}
                  disabled={!formData.game}
                  style={styles.formElement}
                >
                  <option value="">Sélectionnez une série</option>
                  {formData.game && !loading
                    ? data["hydra:member"][formData.gameIndex].cardSeries.map(
                        (serie, index) => (
                          <option value={serie.id} key={index}>
                            {serie.serieName}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>
              <div>
                <select
                  name="set"
                  id="set"
                  onChange={handleChange}
                  disabled={!formData.series}
                  style={styles.formElement}
                >
                  <option value="">Sélectionnez un set</option>
                  {formData.series && !loading
                    ? data["hydra:member"][formData.gameIndex].cardSeries[
                        formData.seriesIndex
                      ].fkIdCardSet.map((set, index) => (
                        <option value={set.id} key={index}>
                          {set.setName}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div>
                <select
                  name="card"
                  id="card"
                  onChange={handleChange}
                  disabled={!formData.set}
                  style={styles.formElement}
                >
                  <option value="">Sélectionnez une carte</option>
                  {formData.set && !loading
                    ? data["hydra:member"][formData.gameIndex].cardSeries[
                        formData.seriesIndex
                      ].fkIdCardSet[formData.setIndex].fkIdCar.map(
                        (card, index) => (
                          <option value={card.id} key={index}>
                            {card.name}
                          </option>
                        )
                      )
                    : null}
                </select>
              </div>
              {formData.cardImage ? (
                <img
                  src={formData.cardImage}
                  style={styles.cardImage}
                  alt={"carte sélectionnée"}
                />
              ) : null}
              <button
                type="submit"
                style={styles.step}
                disabled={!formData.cardImage}
              >
                Étape suivante
              </button>
            </form>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <PageHeader
            title="Vendez vos cartes"
            img={cover}
            style={styles.style}
          />
          <div style={styles.formContainer}>
            <p>2. Informations de ventes :</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder={"nom de votre carte"}
                  style={styles.formElement}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="quality"
                  id="quality"
                  onChange={handleChange}
                  value={formData.quality}
                  placeholder={"Qualitée"}
                  style={styles.formElement}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={formData.price}
                  placeholder={"Prix"}
                  style={styles.formElement}
                />
              </div>
              <div style={styles.fileContainer}>
                {formData.imageFiles
                  ? formData.images?.map((image, index) => (
                      <img
                        src={image}
                        key={index}
                        alt={"..."}
                        style={styles.file}
                      />
                    ))
                  : null}
              </div>
              <div>
                <input
                  type="file"
                  name="imageFiles"
                  id="image"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                  onChange={handleChange}
                  disabled={formData.imageFiles.length === 3}
                  style={styles.inputFile}
                />
                <label htmlFor="image" style={styles.inputLabel}>
                  Ajouter une image
                </label>
              </div>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </>
      );
    default:
      return <h1>Une erreur est survenue</h1>;
  }
};

const styles = {
  style: {
    headImg: {
      objectFit: "fill",
    },
  },
  formContainer: {
    margin: "0 1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formElement: {
    width: "100%",
    minHeight: "2rem",
    marginBottom: "1rem",
    padding: ".5rem",
    color: "grey",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: ".625rem",
  },
  step: {
    border: "none",
    background: "none",
    color: "#636AF2",
    fontWeight: "bold",
  },
  cardImage: {
    width: "70%",
    margin: "0 auto 1rem",
  },
  icon: {
    color: "#636AF2",
  },
  inputFile: {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",
  },
  inputLabel: {
    display: "block",
    padding: ".5rem",
    width: "100%",
    borderRadius: ".625rem",
    textAlign: "center",
    color: "white",
    backgroundColor: "#636AF2",
  },
  fileContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  file: {
    width: "calc(100% / 3 - .5rem)",
  },
};

export default FormSell;
