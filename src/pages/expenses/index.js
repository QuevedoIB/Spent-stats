import { getSession } from "next-auth/react";

export default function Expenses({ session, ...props }) {
  console.log(session, props);
  return <section>Expenses</section>;
}

//get server side props
export async function getServerSideProps(context) {
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
      session,
    },
  };
}
