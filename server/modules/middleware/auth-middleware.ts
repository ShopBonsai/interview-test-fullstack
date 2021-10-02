import { APP_SECRET } from './../../utils/consts';
import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';

export interface Context {
  req: any;
  res: Response;
}

// create auth checker function
export const authChecker: AuthChecker<Context> = ({ context: { req } }, roles) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return false;
    }

    var decoded = jwt.verify(token, APP_SECRET);

    req.user = decoded;

    return true;
  } catch (err) {
    // err
    throw err;
  }
};
