import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

export const getCategories = async (user) => {
  const userCategories = await prisma.category.findMany({
    where: {
      author: {
        email: user.email,
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      name: true,
      picture: true,
    },
  });
  return userCategories;
};

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user } = req;

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const userCategories = await getCategories(user);

  res.status(200).json(userCategories);
});

export default handler;
