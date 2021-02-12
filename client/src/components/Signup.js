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

const SignUpMutation = gql`
  mutation SignUp(
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`;

export const Signup = () => {
  const [state, dispatch] = useState();

  console.log({ user: state.user });
  if (state.user) {
    return <Redirect to="/products" />;
  }

  const [form, setForm] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [doMutation, { loading, error }] = useMutation(SignUpMutation);

  const disabled = React.useMemo(() => {
    loading || !form.username || !form.password || !form.confirmPassword;
  }, [form, loading]);

  const onSubmit = React.useCallback(() => {
    if (!disabled) {
      doMutation({ variables: form }).then((result) => {
        if (result.data && result.data.signup.token) {
          dispatch({
            type: "SET_JWT",
            token: result.data.signup.token,
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
        <div className="mb-6 text-center text-xl">User Registration</div>

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

        <InputGroup className="mb-6">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <FontAwesomeIcon icon={faKey} />
            </InputGroupText>
          </InputGroupAddon>

          <Input
            placeholder="Confirm Password"
            value={form.confirmPassword}
            type="password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
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
              "Sign Up"
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
