import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import Navbar from "src/components/common/Navbar/index.tsx";

import "../styles/globals.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
