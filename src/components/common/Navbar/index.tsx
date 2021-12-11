import { useState, useCallback, useEffect } from "react";

// import LanguageSelector from "components/LanguageSelector";
// import ToggleTheme from "components/ToggleTheme";
import BurgerMenu from "src/components/common/Navbar/BurgerMenu";
import UserMenu from "src/components/common/Navbar/UserMenu";

import useWindowSize from "src/hooks/useWindowSize";

import styles from "./Navbar.module.css";

const Navbar = ({session}) => {
  //   const [t] = useTranslation();
  const [openSideNav, setOpenSideNav] = useState(false);
  const handleMenuOpen = useCallback(
    () => setOpenSideNav((currentState) => !currentState),
    []
  );
  const { width } = useWindowSize();

  return (
    <nav className={styles.container}>
      {/* <NavLink to={generalRoutes.home.path}>
        <div style={{ position: "relative" }}>
          <h1 className={styles.title}>{t("title")}</h1>
          <BasketBall />
        </div>
      </NavLink> */}

      <div className="centered-container">
        <UserMenu session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
