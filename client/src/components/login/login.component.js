import { useMutation } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../qgl/auth';
import { AppContext } from '../../contexts/AppContext';
import { showErrorMessage, showSuccessMessage } from '../../utils/helper';
import Loader from '../loader/loader.component';

import './login.component.css';

const Login = () => {
  const history = useHistory();

  const { login } = useContext(AppContext);

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const [auth, { login: loginLoading }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ auth }) => {
      login(auth.token);
      showSuccessMessage('Login Succesful', 'Welcome! Now you can buy products!');
      history.push('/');
    },
    onError: (err) => {
      showErrorMessage('Login Failed', 'Something is wrong with your credentials');
    },
  });

  const [register, { loading: registerLoading }] = useMutation(REGISTER_MUTATION, {
    variables: {
      data: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
    },
    onCompleted: ({ register }) => {
      login(register.token);
      showSuccessMessage('Register Succesfull', 'Now you can buy products!');
      history.push('/');
    },
    onError: ({}) => {
      showErrorMessage('Register failed', 'Your registration failed');
    },
  });

  if (loginLoading || registerLoading) return <Loader />;

  return (
    <div className="login">
      <div>
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
            className="login-input"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
          className="login-input"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
          className="login-input"
        />
      </div>
      <div>
        <button className="login-button " onClick={formState.login ? auth : register}>
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="login-button "
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
