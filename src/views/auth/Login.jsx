import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Connexion.css'

export const Login = (props) => {
  return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <div className='formContainer'>
          <h1 className='connexionTitle'>CONNECTION</h1>
          <Form className='formContainerLog'> 
            {/* <label htmlFor="email" className='formLabel'>Email</label> */}
            <Field name="email" type="email" placeholder="Email" className="field"/>
            <ErrorMessage name="email" />

            {/* <label htmlFor="password" className='formLabel'>Password</label> */}
            <Field name="password" type="text" placeholder="Mot de passe" className="field"/>
            <ErrorMessage name="password" />
    
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Vous n'avez pas de compte? <span className='span-btn'>En créer un.</span></button>
            <button type="submit" className='formBtn'>SE CONNECTER</button>
          </Form>
        </div>
      </Formik>
  );
};
