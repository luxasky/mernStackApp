import { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function LoginForm() {
  // State to keep track of the action types: 'login', 'register'
  const [actionType, setActionType] = useState('login');
  // Destructure necessary values from auth context
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  const submitLoginForm = async (values, { setSubmitting, resetForm }) => {
    const url = `http://localhost:4000/api/users/${actionType}`;
    setSubmitting(true);
    // try to make a login request and based on response, update user's login state isLoggedIn
    try {
      const res = await axios.post(url, values, { withCredentials: true });
      setIsLoggedIn(res.data.isAuth);
      console.log(isLoggedIn, res.data.isAuth); // Log for debug purposes
    } catch (err) {
      console.log(`Error submitting data: ${err}`);
    } finally {
      // After login submission, reset the form its submission state
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitLoginForm}>
        {(
          { isSubmitting, handleSubmit } // Destructure necessary formik props from the render prop function
        ) => (
          <Form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <ErrorMessage
              className="form-error"
              name="username"
              component="span"
            />
            <Field id="username" name="username"></Field>

            <label htmlFor="password">Password:</label>
            <ErrorMessage
              className="form-error"
              name="password"
              component="span"
            />
            <Field id="password" name="password"></Field>

            <div className="form-buttons">
              <button
                className="btn btn-login"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  setActionType('login');
                }}>
                Login
              </button>
              <button
                className="btn btn-register"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  setActionType('register');
                }}>
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
