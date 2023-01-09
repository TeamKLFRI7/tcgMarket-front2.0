import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Connexion.css'

export const Register = (props) => {
  return (
      <Formik
        initialValues={{ pseudo: '', phone: '', email: '', password: '' }}
        validationSchema={Yup.object({
          pseudo: Yup.string()
            .max(15, 'Le pseudo doit être d\'au moins 15 charactères')
            .required('Required'),
          phone: Yup.string()
            .max(13, 'Le numéro doit commencer par 06 ou 07 ou +33')
            .required('Required'),
          email: Yup.string().email('Adresse mail invalide').required('Required'),
          password: Yup.string()
            .min(8, 'Votre mot de passe doit faire au mnimum 8 charactères')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <div className='formContainerInsc'>
          <h1 className='inscriptionTitle'>INSCRIPTION</h1>
            <Form className='formContainerLog'>
                {/* <label htmlFor="pseudo">Pseudo</label> */}
                <Field name="pseudo" type="text" className="field" placeholder="Pseudo"/>
                <ErrorMessage name="pseudo" />
        
                {/* <label htmlFor="phone">Téléphone</label> */}
                <Field name="phone" type="text" className="field" placeholder="Téléphone"/>
                <ErrorMessage name="phone" />
        
                {/* <label htmlFor="email">Email</label> */}
                <Field name="email" type="email"className="field" placeholder="Email"/>
                <ErrorMessage name="email" />

                {/* <label htmlFor="password">Password</label> */}
                <Field name="password" type="text" className="field" placeholder="Mot de passe"/>
                <ErrorMessage name="password" />
        
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Vous avez un compte? <span className='span-btn'>Connectez vous.</span></button>
                <button type="submit" className='formBtnInsc'>S'INSCRIRE</button>
            </Form>
        </div>
      </Formik>
  );
};