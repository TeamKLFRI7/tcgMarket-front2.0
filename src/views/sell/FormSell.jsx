import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import {useGetSelling} from "../../axios";

const FormSell = () => {
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
    cardImage : "",
    description: "",
    price: "",
    image: "",
  });
  const {
    data,
    loading,
  } = useGetSelling();
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'game') {
      // Si le champ modifié est le champ de sélection de jeu
      // on cherche l'index du jeu sélectionné dans le tableau de jeux récupéré de l'API
      const gameIndex = data['hydra:member'].findIndex((game) => game.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: parseInt(value), gameIndex,
        // Empeche un comportement non désiré: disparition du formulaire si changement de jeu avec plusieurs champs remplis
        seriesIndex: "",
        series: "",
        setIndex: "",
        set: "",
        cardIndex: "",
        card: "",
      });
    } else if (name === 'series') {
      const seriesIndex = data["hydra:member"][formData.gameIndex].cardSeries.findIndex((series) => series.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: parseInt(value), seriesIndex
      });
    } else if (name === 'set') {
      const setIndex = data['hydra:member'][formData.gameIndex].cardSeries[formData.seriesIndex].fkIdCardSet.findIndex((set) => set.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: parseInt(value), setIndex
      });
    } else if (name === 'card') {
      const cardIndex = data['hydra:member'][formData.gameIndex].cardSeries[formData.seriesIndex].fkIdCardSet[formData.setIndex].fkIdCar.findIndex((set) => set.id === parseInt(value));
      const cardImage = data['hydra:member'][formData.gameIndex].cardSeries[formData.seriesIndex].fkIdCardSet[formData.setIndex].fkIdCar[cardIndex].img;
      setFormData({
        ...formData,
        [name]: value, cardIndex, cardImage
      });
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
  };
  switch (step) {
    case 1:
      return (
        <>
          <PageHeader title="Vendez vos cartes" img={cover} />
          <div style={styles.formContainer}>
            <p>1. Sélectionnez une carte :</p>
            <form onSubmit={nextStep} style={styles.form}>
              <div>
                <select name="game" id="game" onChange={handleChange} style={styles.formElement}>
                  <option value="">Sélectionnez un jeu</option>
                  {data['hydra:member']?.map((game, index) => (
                    <option value={game.id} key={index}>{game.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select name="series" id="series" onChange={handleChange} disabled={!formData.game} style={styles.formElement}>
                  <option value="">Sélectionnez une série</option>
                  {formData.game && !loading ? data["hydra:member"][formData.gameIndex].cardSeries.map((serie, index) => (
                    <option value={serie.id} key={index}>{serie.serieName}</option>
                  )) : null}
                </select>
              </div>
              <div>
                <select name="set" id="set" onChange={handleChange} disabled={!formData.series} style={styles.formElement}>
                  <option value="">Sélectionnez un set</option>
                  {formData.series && !loading ? data["hydra:member"][formData.gameIndex].cardSeries[formData.seriesIndex].fkIdCardSet.map((set, index) => (
                      <option value={set.id} key={index}>{set.setName}</option>
                  )) : null}
                </select>
              </div>
              <div>
                <select name="card" id="card" onChange={handleChange} disabled={!formData.set} style={styles.formElement}>
                  <option value="">Sélectionnez une carte</option>
                  {formData.set && !loading ? data["hydra:member"][formData.gameIndex].cardSeries[formData.seriesIndex].fkIdCardSet[formData.setIndex].fkIdCar.map((card, index) => (
                      <option value={card.id} key={index}>{card.name}</option>
                  )) : null}
                </select>
              </div>
              {formData.cardImage ?
                  <img src={formData.cardImage} style={styles.cardImage} alt={'carte sélectionnée'}/> :
                  null
              }
              <button type="submit" style={styles.step} disabled={!formData.cardImage}>Étape suivante</button>
            </form>
          </div>
        </>
        );
    case 2:
      return (
        <>
          <PageHeader title="Vendez vos cartes" img={cover} />
          <form>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea name="description" id="description" onChange={handleChange} value={formData.description} />
            </div>
            <div>
              <label htmlFor="quality">Qualité:</label>
              <input type="text" name="quality" id="quality" onChange={handleChange} value={formData.quality} />
            </div>
            <div>
              <label htmlFor="price">Prix:</label>
              <input type="number" name="price" id="price" onChange={handleChange} value={formData.price} />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input type="file" name="image" id="image" onChange={handleChange} />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </>
      )
    default:
      return (<h1>Une erreur est survenue</h1>)
  }
};

const styles = {
  formContainer: {
    margin : '0 1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formElement: {
    width: '100%',
    minHeight: '2rem',
    marginBottom: '1rem',
    padding: '.5rem',
    color: 'grey',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    borderRadius: '.625rem',
  },
  step: {
    border: 'none',
    background: 'none',
    color: '#636AF2',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '70%',
    margin: '0 auto 1rem',
  },
  icon: {
    color: '#636AF2',
  },
}

export default FormSell;
