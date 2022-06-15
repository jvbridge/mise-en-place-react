import * as jwt from 'jsonwebtoken';
// TODO: .env variables
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

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
  try {
    const { data } = <jwt.userDataJwtPayload>(
      jwt.verify(jwtToken, secret, { maxAge: expiration })
    );

    return data;
  } catch (error) {
    console.log('Invalid web token passed through middleware');
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

export function signToken({ email, _id }: { email: string; _id: string }) {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
