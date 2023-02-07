import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Formik, Field, Form, ErrorMessage } from "formik";
import cover from "../../assets/img/sellCover.png";

const FormSell = () => {
  const cover = require("../../assets/img/sellCover.png");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    game: "",
    series: "",
    set: "",
    card: "",
    description: "",
    price: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const nextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
      <Formik initialValues={} onSubmit={}
  );
};

export default FormSell;
