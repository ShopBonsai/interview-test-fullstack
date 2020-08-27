import * as React from "react";

import { Form, Field } from "react-final-form";

export namespace Form {
  export interface Props {
    login: any;
  }
}

const LoginForm = (props: Form.Props) => {
  const { login } = props;

  return (
    <Form
      onSubmit={({ email, password }) =>
        login({ variables: { email, password } })
      }
      render={({ handleSubmit, submitting, pristine }: any) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="E-mail"
            // NOTE: Strictly for demonstration purposes
            defaultValue="fayadh@admin.com"
          />
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            // NOTE: Strictly for demonstration purposes
            defaultValue="password"
          />
          <button type="submit" disabled={submitting || pristine}>
            Login
          </button>
        </form>
      )}
    />
  );
};

export default LoginForm;
