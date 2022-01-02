import { getSession } from "next-auth/react";
//import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default function validateToken() {
  return async (req, res, next) => {
    const session = await getSession({ req });
    //const token = await getToken({ req, secret });
    if (session) {
      req.user = session.user;
      next();
    } else {
      res.status(401);
      res.end();
    }
  };
}
