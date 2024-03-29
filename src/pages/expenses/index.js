import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SWRConfig } from "swr";
import { getExpenses } from "src/pages/api/expenses/[[...pagination]].js";
import { getCategories } from "src/pages/api/categories/[[...pagination]].js";

import CreateExpenseButton from "src/components/buttons/Add";
import CreateExpenseForm from "src/components/forms/CreateExpense";
import ExpensesList from "src/components/lists/expenses";

export default function Expenses({ session, fallback, ...props }) {
  return (
    <SWRConfig value={{ fallback }}>
      <section>
        <h1>Expenses</h1>
        <ExpensesList />
        <CreateExpenseButton text="Add Expense">
          <CreateExpenseForm />
        </CreateExpenseButton>
      </section>
    </SWRConfig>
  );
}

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

  const [{ value: expenses }, { value: categories }] = await Promise.allSettled(
    [getExpenses(session.user), getCategories(session.user)]
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      session,
      fallback: {
        "/api/expenses": expenses,
        "/api/categories": categories,
      },
    },
  };
}
