import { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Message from './Message';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  // State to keep track of the action types: 'login', 'register'
  const [actionType, setActionType] = useState('login');
  // Destructure necessary values from auth context
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showMsg, setShowMsg] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  useEffect(() => {
    if (message) setShowMsg(true);
    const errorTimeout = setTimeout(() => {
      setShowMsg(false);
    }, 1000);

    // Clear the timeout
    return () => clearTimeout(errorTimeout);
  }, [message, navigate, setIsLoggedIn]);

  const submitLoginForm = async (values, { setSubmitting, resetForm }) => {
    const url = `http://localhost:4000/api/users/${actionType}`;
    setSubmitting(true);
    // setMessage('');

    // try to make a login request and based on response, update user's login state isLoggedIn
    try {
      const res = await axios.post(url, values, { withCredentials: true });
      console.log(isLoggedIn, res.data.isAuth); // Log for debug purposes
      setIsLoggedIn(res.data.isAuth);

      if (actionType === 'register') {
        setMessage('User registered!');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      // After login submission, reset the form its submission state
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div>
      {showMsg && <Message message={message} />}
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
