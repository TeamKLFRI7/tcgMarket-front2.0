import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Connexion.css'
import axios from 'axios';
import { navigate } from 'react'

export const Login = (props) => {

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values)
    axios.post('http://localhost:8008/authentication_token', values)
      .then(res => {
        console.log(res)
        navigate('/profil');
        setSubmitting(false);
        // handle success
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false);
        // handle error
      });
  };

  return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        // onSubmit={(tryToLogin )}
        onSubmit={handleSubmit}
      >
        <div className='formContainer'>

        {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

          <h1 className='connexionTitle'>CONNECTION</h1>
          <Form className='formContainerLog'> 
            {/* <label htmlFor="email" className='formLabel'>Email</label> */}
            <Field name="email" type="email" placeholder="Email" className="field"/>
            <ErrorMessage name="email" />

            {/* <label htmlFor="password" className='formLabel'>Password</label> */}
            <Field name="password" type="text" placeholder="Mot de passe" className="field"/>
            <ErrorMessage name="password" />
    
            <p className="link-btn" onClick={() => props.onFormSwitch('register')}>Vous n'avez pas de compte? <span className='span-btn'>En créer un.</span></p>
            <button type="submit" className='formBtn'>SE CONNECTER</button>
          </Form>
        </div>
      </Formik>
  );
};
