import React from "react";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  return (
    <div className="mx-auto bg-white shadow-sm w-1/4 p-14 mt-40">
      <div className="mb-6 text-center text-xl">Log In</div>

      <InputGroup className="mb-6">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={faUser} />
          </InputGroupText>
        </InputGroupAddon>

        <Input placeholder="Username" />
      </InputGroup>

      <InputGroup className="mb-6">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={faKey} />
          </InputGroupText>
        </InputGroupAddon>

        <Input placeholder="Password" />
      </InputGroup>

      <div className="text-center">
        <Button color="success" className="m-auto" block>
          Sign In
        </Button>
      </div>
    </div>
  );
};
