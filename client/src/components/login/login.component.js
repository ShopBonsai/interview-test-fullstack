import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN } from '../../utils/consts';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../qgl/auth';

import './login.component.css';
import { showErrorMessage, showSuccessMessage } from '../../utils/helper';
import Loader from '../loader/loader.component';

const Login = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const [login, { login: loginFailed }] = useMutation(LOGIN_MUTATION, {
    variables: {
      data: {
        email: formState.email,
        password: formState.password,
      },
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      showSuccessMessage('Login Succesful', 'Welcome! Now you can buy products!');
      history.push('/');
    },
    onError: ({}) => {
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
      localStorage.setItem(AUTH_TOKEN, register.token);
      showSuccessMessage('Register Succesfull', 'Now you can buy products!');
      history.push('/');
    },
    onError: ({}) => {
      showErrorMessage('Register failed', 'Your registration failed');
    },
  });

  if (loginFailed || registerLoading) return <Loader />;

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
        <button className="login-button " onClick={formState.login ? login : register}>
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
