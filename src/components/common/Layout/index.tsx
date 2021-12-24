import { useEffect } from "react";
import Proptypes from "prop-types";
import { useSession, signIn } from "next-auth/react";

import Spinner from "src/components/common/Spinner";

import { LOGIN_STATUS } from "src/constants";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const { status, data: session } = useSession();
  const isLoading = status === LOGIN_STATUS.loading;
  const isLogged = !!session?.user;

  useEffect(() => {
    if (!isLoading && !isLogged) signIn(); // If not authenticated, force log in for now, redirect to login to be changed
  }, [isLogged, isLoading]);

  console.log(isLoading, isLogged, status, session);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spinner size={100} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

Layout.propTypes = {
  children: Proptypes.oneOfType([
    Proptypes.node,
    Proptypes.arrayOf(Proptypes.node),
  ]),
};

export default Layout;
