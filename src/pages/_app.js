import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

import Navbar from "src/components/common/Navbar";
import Layout from "src/components/common/Layout";

import "../styles/globals.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
