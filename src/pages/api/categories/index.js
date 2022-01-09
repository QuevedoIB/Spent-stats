import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

const getCategories = async (user) => {
  const userCategories = await prisma.categories.findMany({
    where: {
      author: {
        email: user.email,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const userCategories = await getCategories(user);

  res.status(200).json(userCategories);
});

export default handler;
