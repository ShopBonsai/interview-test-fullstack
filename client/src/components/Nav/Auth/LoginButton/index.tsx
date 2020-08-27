import * as React from "react";
import { Button } from "reactstrap";

export const LoginButton: React.FC = () => {
  return (
    <Button
      color="primary"
      onClick={() =>
        (window.location.href = `http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
          "http://localhost:8080"
        )}`)
      }
    >
      Login Google
    </Button>
  );
};

export default LoginButton;
