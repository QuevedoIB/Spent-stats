import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import UserCard from "src/components/cards/User";

export default function Profile({ session, ...props }) {
  console.log(session, props);
  return <section>Profile</section>;
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
