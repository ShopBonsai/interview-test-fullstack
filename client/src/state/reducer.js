import { gql } from "@apollo/client";
import * as BrowserStorage from "../helpers/BrowserStorage";

// State reducer that updates state used in context wrapper
// also stores data in browser storage so we can rehydrate on page refreshes
export async function reducer(state, action) {
  switch (action.type) {
    case "SET_JWT":
      BrowserStorage.save("local", "jwt", action.token);
      return { ...state, auth: { jwt: action.token } };

    case "CLEAR_JWT":
      BrowserStorage.remove("local", "jwt");
      return { ...state, auth: { jwt: null } };
  }
}
