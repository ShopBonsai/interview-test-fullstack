import React from "react";
import {
  Alert,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Spinner,
} from "reactstrap";
import { useKeyPress } from "react-use";
import { Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

import { useState } from "../state";

const LoginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const Login = () => {
  const [state, dispatch] = useState();

  if (state.user) {
    return <Redirect to="/products" />;
  }

  const [form, setForm] = React.useState({ username: "", password: "" });
  const [doMutation, { loading, error }] = useMutation(LoginMutation);

  const disabled = React.useMemo(() => {
    loading || !form.username || !form.password;
  }, [form, loading]);

  const onSubmit = React.useCallback(() => {
    if (!disabled) {
      doMutation({ variables: form }).then((result) => {
        if (result.data && result.data.login.token) {
          dispatch({
            type: "SET_JWT",
            token: result.data.login.token,
          });
        }
      });
    }
  }, [disabled, form]);

  /**
   * submit form on enter
   */
  const [submitted] = useKeyPress("Enter");

  React.useEffect(() => {
    if (submitted) {
      onSubmit();
    }
  }, [submitted]);

  return (
    <div>
      <div className="mx-auto bg-white shadow-sm w-1/4 p-14 mt-40">
        <div className="mb-6 text-center text-xl">Log In</div>

        <InputGroup className="mb-6">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faUser} />
            </InputGroupText>
          </InputGroupAddon>

          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </InputGroup>

        <InputGroup className="mb-6">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faKey} />
            </InputGroupText>
          </InputGroupAddon>

          <Input
            placeholder="Password"
            value={form.password}
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </InputGroup>

        <div className="text-center">
          <Button
            disabled={loading || !form.username || !form.password}
            color="success"
            className="m-auto"
            block
            onClick={onSubmit}
          >
            {loading ? (
              <Spinner style={{ width: "1rem", height: "1rem" }} />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>

      {error && error.message && (
        <div className="mx-auto w-1/4 mt-6">
          <Alert color="danger">{error.message}</Alert>
        </div>
      )}
    </div>
  );
};
