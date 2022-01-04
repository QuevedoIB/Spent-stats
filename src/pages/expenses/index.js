import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SWRConfig } from "swr";
import { getExpenses } from "src/pages/api/expenses";

import AddExpense from "src/components/buttons/AddExpense";
import ExpensesList from "src/components/lists/expenses";

export default function Expenses({ session, fallback, ...props }) {
  return (
    <SWRConfig value={{ fallback }}>
      <section>
        <h1>Expenses</h1>
        <ExpensesList />
        <AddExpense />
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

  const expenses = await getExpenses(session.user);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      session,
      fallback: {
        "/api/expenses": expenses,
      },
    },
  };
}
