import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

export const getExpenses = async (user) => {
  const userExpenses = await prisma.entry.findMany({
    where: {
      author: {
        email: user.email,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return userExpenses;
};

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const userExpenses = await getExpenses(user);

  res.status(200).json(userExpenses);
});

export default handler;
