import { getSession } from "next-auth/react";

export default function Profile({ session, ...props }) {
  console.log(session, props);
  return <section>Profile</section>;
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
