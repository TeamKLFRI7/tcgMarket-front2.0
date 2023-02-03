import { useState, useEffect } from 'react'
import { useGetUserMe } from '../axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModifyButton from './buttons/ModifyButton';
import axios from 'axios';

    


const ModalForm = ({setModalOpen}) => {
    let apiUrl = process.env.REACT_APP_URL_API;

    const [token, setToken] = useState()

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
    
    const [apiError, setApiError] = useState(null);

    const id = localStorage.getItem('user');
    const handleSubmitModifications = (values, { setSubmitting }) => {
        values.userInfo['id'] = infoSup.id;
        setSubmitting(true);
        console.log(values)
        if (id) {
            console.log(apiUrl + "/users/" + id)
            axios.put(apiUrl + "/users/" + id, values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": `application/json`,
                },
              })
                .then((res) => {
                    console.log(res)
                    setApiError(null);
                    setSubmitting(false);
                })
                .catch((err) => {
                    console.log(err);
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
                <div style={styles.modalBackground}>
                    <div style={styles.modalContainer}>
                        <div style={styles.titleCloseBtn}>
                            <h3 style={styles.title} >Modal</h3>
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                }}
                                id="cancelBtn"
                                style={styles.titleCloseBtn}
                            >
                                X
                            </button>
                            
                            <div style={styles.modalBody} className='row'>
                                <Form>
                                    <div className="col">
                                        <label htmlFor="userName">Pseudo : </label>
                                        <Field
                                            name="userName"
                                            type="text"
                                            className="field"
                                            placeholder={data.userName}
                                        />
                                        <ErrorMessage name="userName" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="email">Email : </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className="field"
                                            placeholder={data.email}
                                        />
                                        <ErrorMessage name="email" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="phoneNumber">Téléphone : </label>
                                        <Field
                                            name="phoneNumber"
                                            type="numbers"
                                            className="field"
                                            placeholder={data.phoneNumber}
                                        />
                                        <ErrorMessage name="phoneNumber" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="userInfo.description">Description : </label>
                                        <Field
                                            name="userInfo.description"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.description}
                                        />
                                        <ErrorMessage name="description" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="userInfo.address">Adresse : </label>
                                        <Field
                                            name="userInfo.address"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.address}
                                        />
                                        <ErrorMessage name="address" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="userInfo.city">Ville : </label>
                                        <Field
                                            name="userInfo.city"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.city}
                                        />
                                        <ErrorMessage name="city" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="userInfo.postalCode">Code postal : </label>
                                        <Field
                                            name="userInfo.postalCode"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.postalCode}
                                        />
                                        <ErrorMessage name="postalCode" />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="userInfo.country">Pays : </label>
                                        <Field
                                            name="userInfo.country"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.country}
                                        />
                                        <ErrorMessage name="country" />
                                    </div>
                                    
                                    <div className="col">
                                        <label htmlFor="userInfo.deliveryAddress">Adresse de livraison : </label>
                                        <Field
                                            name="userInfo.deliveryAddress"
                                            type="text"
                                            className="field"
                                            placeholder={infoSup.deliveryAddress}
                                        />
                                        <ErrorMessage name="deliveryAddress" />
                                    </div>
                                    <ModifyButton path={() => console.log()} type={"submit"} children={"modifier"} />
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
    )

}

const styles = {
    modalBackground: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'red',
        
      },
      modalContainer: {
        width: '90vw',
        // height: '70vh',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
      },
      title: {
        display: 'inline-block',
        textAlign: 'center',
        marginTop: '10px',
      },
      titleCloseBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '25px',
        cursor: 'pointer'
      },
      modalBody: {
        fontSize: '1.2rem',
      },
      modalFooter: {
        flex: '20%',
        fontSize: '1.2rem'
      }
}


export default ModalForm