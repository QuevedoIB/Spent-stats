import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { getSession, SessionProviderProps } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SWRConfig } from "swr";
import { getCategories } from "src/pages/api/categories/[[...pagination]].js";

import AddCategory from "src/components/buttons/Add";
import CreateCategoryForm from "src/components/forms/CreateCategory";
import ExpensesList from "src/components/lists/expenses";

// interface ICategories {
//     session: SessionProviderProps,
//     fallback: object,
// }

const Categories = ({ fallback, ...rest }) => {
  const { t } = useTranslation();
  return (
    <SWRConfig value={{ fallback }}>
      <section>
        <h1>{t("categories")}</h1>
        {/* <ExpensesList /> */}
        <AddCategory
          text={t("add", { element: t("categories").toLowerCase() })}
        >
          <CreateCategoryForm />
        </AddCategory>
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
