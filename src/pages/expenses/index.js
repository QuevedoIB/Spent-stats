import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AddExpense from "src/components/buttons/AddExpense";

export default function Expenses({ session, ...props }) {
  console.log(session, props);
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

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      session,
    },
  };
}
