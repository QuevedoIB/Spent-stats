import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user, body } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  console.log({ user, body });

  //const newExpense = await prisma.category.create({});

  res.status(200).json(true);
});

export default handler;
