import axios from "axios";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default function validateToken() {
  return async (req, res, next) => {
    const token = await getToken({ req, secret });
    console.log(token?.accessToken, token);
    const data = await axios.get(
      `${process.env.GOOGLE_VALIDATE_ENDPOINT}?id_token=${token?.accessToken}`
    );
    console.log(
      `${process.env.GOOGLE_VALIDATE_ENDPOINT}?id_token=${token?.accessToken}`
    );
    next();
  };
}
