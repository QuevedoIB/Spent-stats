import axios from "axios";
import getCookie from "src/utils/getCookie";

export default function validateToken() {
  return async (req, res, next) => {
    const token = getCookie("next-auth.session-token", req.headers.cookie);
    console.log(`${process.env.GOOGLE_VALIDATE_ENDPOINT}?id_token=${token}`);
    const data = await axios.get(
      `${process.env.GOOGLE_VALIDATE_ENDPOINT}?id_token=${token}`
    );
    console.log({ data });
    next();
  };
}
