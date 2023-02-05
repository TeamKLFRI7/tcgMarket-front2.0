import { useState, useEffect } from 'react'
import { useGetUserMe } from '../axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModifyButton from './buttons/ModifyButton';
import axios from 'axios';
import './css/modalForm.css';
import { IcXMark } from '../assets/icons/IcXMark';


const ModalForm = ({setModalOpen}) => {
    let apiUrl = process.env.REACT_APP_URL_API;
    const [token, setToken] = useState()
    const [apiError, setApiError] = useState(null);
    const id = localStorage.getItem('user');

    const getToken = async () => {
        const localToken = await localStorage.getItem('token');

        if(localToken) setToken(localToken);
        
    }
    useEffect(() => {
        getToken()
    }, [])

    const {
        data,
        loading
    } = useGetUserMe();

    let infoSup = ""
    if(data.userInfo) {
        infoSup = data.userInfo;
    };

    const validationSchema = Yup.object({
        pseudo: Yup.string()
          .max(15, "Le pseudo doit être d'au moins 15 charactères")
          .required("Required"),
        // phone: Yup.string()
        //   .max(13, "Le numéro doit commencer par 06 ou 07 ou +33")
        //   .required("Required"),
        // email: Yup.string().email("Adresse mail invalide").required("Required"),
    });

    
    const handleSubmitModifications = (values, { setSubmitting }) => {
        values.userInfo['id'] = infoSup.id;
        setSubmitting(true);
        if (id) {
            axios.put(apiUrl + "/users/" + id, values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": `application/json`,
                },
              })
                .then((res) => {
                    console.log(res)
                    setSubmitting(false);
                    setModalOpen(false);
                    window.location.reload(true);
                })
                .catch((err) => {
                    if (err.response.data.code === 401) {
                        setApiError("Lidentifiant ou le mot de passe est invalide.");
                    }
                    setSubmitting(false);
             });
        }
    };

    return ( 
            <Formik 
                initialValues={{
                    userName: "",
                    email: "",
                    phoneNumber: "",
                    userInfo: {
                        description: "",
                        address: "",
                        city: "",
                        postalCode: "",
                        country: "",
                        deliveryAddress: ""
                    }
                }}
                onSubmit={handleSubmitModifications}
            >
                <div className="modalBackground">
                    <div className='modalContainer'>
                        <div className='modalHeader'>
                            <h3 className='heading' >Modifier mon profil</h3>
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                }}
                                id="cancelBtn"
                                className='closeBtn'
                            >
                                <IcXMark color="black"/>
                            </button>
                        </div>
                        <div className='modal, row' >
                            <Form>
                                <div className="modalContent">
                                    <div className="col mobileFields">
                                        <label htmlFor="userName">Pseudo : </label>
                                        <Field
                                            name="userName"
                                            type="text"
                                            className="myField"
                                            placeholder={data.userName}
                                        />
                                        <ErrorMessage name="userName" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="email">Email : </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className="myField"
                                            placeholder={data.email}
                                        />
                                        <ErrorMessage name="email" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="phoneNumber">Téléphone : </label>
                                        <Field
                                            name="phoneNumber"
                                            type="numbers"
                                            className="myField"
                                            placeholder={data.phoneNumber}
                                        />
                                        <ErrorMessage name="phoneNumber" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.description">Description : </label>
                                        <Field
                                            name="userInfo.description"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.description}
                                        />
                                        <ErrorMessage name="description" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.address">Adresse : </label>
                                        <Field
                                            name="userInfo.address"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.address}
                                        />
                                        <ErrorMessage name="address" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.city">Ville : </label>
                                        <Field
                                            name="userInfo.city"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.city}
                                        />
                                        <ErrorMessage name="city" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.postalCode">Code postal : </label>
                                        <Field
                                            name="userInfo.postalCode"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.postalCode}
                                        />
                                        <ErrorMessage name="postalCode" />
                                    </div>

                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.country">Pays : </label>
                                        <Field
                                            name="userInfo.country"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.country}
                                        />
                                        <ErrorMessage name="country" />
                                    </div>
                                    
                                    <div className="col mobileFields">
                                        <label htmlFor="userInfo.deliveryAddress">Adresse de livraison : </label>
                                        <Field
                                            name="userInfo.deliveryAddress"
                                            type="text"
                                            className="myField"
                                            placeholder={infoSup.deliveryAddress}
                                        />
                                        <ErrorMessage name="deliveryAddress" />
                                    </div>
                                </div>
                                <div className="modalActions">
                                    <div className="actionsContainer">
                                        <ModifyButton path={() => console.log()} type={"submit"} children={"Modifier mon profil"} />
                                    </div>
                                </div>
                            </Form>
                        </div>
                        
                    </div>
                </div>
            </Formik>
    )

}


export default ModalForm