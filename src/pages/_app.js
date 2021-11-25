import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  console.log({ session });
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
