import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

handler.use(validateToken());
handler.post(async (req, res) => {
  const { user, body } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const newCategory = await prisma.category.create({
    data: {
      ...body,
      author: { connect: { email: user.email } },
    },
  });

  res.status(200).json(newCategory);
});

export default handler;
