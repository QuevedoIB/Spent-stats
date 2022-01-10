import { NextPage } from "next";
import { getSession, SessionProviderProps } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SWRConfig } from "swr";
import { getCategories } from "src/pages/api/categories";

import AddCategory from "src/components/buttons/Add";
import ExpensesList from "src/components/lists/expenses";

// interface ICategories {
//     session: SessionProviderProps,
//     fallback: object,
// }

const Categories = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <section>
        <h1>Expenses</h1>
        {/* <ExpensesList /> */}
        <AddCategory />
      </section>
    </SWRConfig>
  );
};

export async function getServerSideProps({ locale, ...context }) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const categories = await getCategories(session.user);

  console.log({ categories });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      session,
      fallback: {
        "/api/categories": categories,
      },
    },
  };
}

export default Categories;
