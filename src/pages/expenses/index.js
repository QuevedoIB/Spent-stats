import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR from "swr";
import { getExpenses } from "src/pages/api/expenses";

import AddExpense from "src/components/buttons/AddExpense";

import ExpensesService from "src/services/ExpensesService";

export default function Expenses({ session, ...props }) {
  const { data } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );
  console.log({ data });
  return (
    <section>
      <h1>Expenses</h1>
      <AddExpense />
    </section>
  );
}

//get server side props
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

  //parse and map expenses Date for swr to work

  console.log({ expenses }, typeof expenses[0].amount);

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
