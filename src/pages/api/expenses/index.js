import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const userExpenses = await prisma.entry.findMany({
    where: {
      author: {
        email: user.email,
      },
    },
  });

  console.log({ user, userExpenses }, "QUERY EXPENSES");
  res.status(200).json({ name: "John Doe" });
});

export default handler;
