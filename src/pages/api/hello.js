import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

handler.use(validateToken());
handler.get((req, res) => {
  res.status(200).json({ name: "John Doe" });
});

export default handler;
