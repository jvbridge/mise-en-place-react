import * as jwt from 'jsonwebtoken';

// configuration for JWT
const secret = process.env.SECRET || 'mysecretssshhhhhhh';
const expiration = process.env.EXPERATION || '2h';

// user datatype for what we can expext a user to be
type User = {
  email: string;
  _id: string;
};

// extending json web tokens to have our types on them
declare module 'jsonwebtoken' {
  export interface userDataJwtPayload extends jwt.JwtPayload {
    data: User;
  }
}

// helper function to verify data
export const userDataJwtPayload = (jwtToken: string): User | undefined => {
  // try to decode the data
  try {
    const { data } = <jwt.userDataJwtPayload>(
      jwt.verify(jwtToken, secret, { maxAge: expiration })
    );

    return data;
  } catch (error: any) {
    // data not decoded

    // we always hit this block if the web token doesn't exist
    if (error.message == 'jwt must be provided')
    return undefined;

    // if there is a reason why, that's not a null token, lets get it
    console.error(error);
    return undefined;
  }
};

// clarifying types
export interface authRequest extends Express.Request {
  body: { token: string };
  query: { token: string };
  headers: { authorization: string };
  user: User;
}

/**
 * Authentication middleware that verifies every JWT transaction
 * @param param0 the request, response, and next functions
 * @returns
 */
export function authMiddleware({ req }: { req: authRequest }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    const tokenArr = token.split(' ');
    const tokenStr = tokenArr.pop()?.trim();
    if (!tokenStr) {
      return req;
    }
    token = tokenStr;
  }
  const data = userDataJwtPayload(token);
  if (data) req.user = data;
  return req;
}

/**
 * Signs a web token with the user's information
 * @param param0
 * @returns the web token
 */
export function signToken({ email, _id }: { email: string; _id: string }) {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
