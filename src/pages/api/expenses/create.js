import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

handler.use(validateToken());
handler.post(async (req, res) => {
  const { user, body } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  console.log({ user, body });
  const { categoryId, date, ...data } = body;

  const newExpense = await prisma.entry.create({
    data: {
      ...data,
      date: new Date(date),
      author: { connect: { email: user.email } },
      category: { connect: { id: categoryId } },
    },
  });

  res.status(200).json(newExpense);
});

export default handler;
