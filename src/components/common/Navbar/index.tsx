import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

// import LanguageSelector from "components/LanguageSelector";
// import ToggleTheme from "components/ToggleTheme";
import BurgerMenu from "src/components/common/Navbar/BurgerMenu";
import UserMenu from "src/components/common/Navbar/UserMenu";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [t] = useTranslation();
  const [openSideNav, setOpenSideNav] = useState(false);
  const handleMenuOpen = useCallback(
    () => setOpenSideNav((currentState) => !currentState),
    []
  );

  return (
    <nav className={styles.container}>
      <Link href={"/"}>
        <a style={{ position: "relative" }}>
          <h1 className={styles.title}>{t("title")}</h1>
        </a>
      </Link>

      <div className="centered-container">
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
