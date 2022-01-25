import nextConnect from "next-connect";
const handler = nextConnect();

import validateToken from "src/pages/_middlewares/validateToken";

import { DEFAULT_LIMIT } from "src/constants";

export const getExpenses = async (user, amount = DEFAULT_LIMIT, dateCursor) => {
  const [total, expenses] = await prisma.$transaction([
    prisma.entry.count({
      where: {
        author: {
          email: user.email,
        },
      },
    }),
    prisma.entry.findMany({
      take: amount,
      ...(dateCursor
        ? {
            cursor: {
              id: dateCursor,
            },
          }
        : {}),
      where: {
        author: {
          email: user.email,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return { total, expenses };
};

handler.use(validateToken());
handler.get(async (req, res) => {
  const { user, query } = req;

  const [amount, dateCursor] = query.pagination ?? [];

  console.log({ dateCursor, amount });

  if (!user?.email) return res.status(400).json({ error: "Missing user data" });

  const userExpenses = await getExpenses(user);

  res.status(200).json(userExpenses);
});

export default handler;
