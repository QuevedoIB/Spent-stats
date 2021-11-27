import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import Navbar from "../components/common/Navbar/index.tsx";

import "../styles/globals.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  console.log({ session });
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
