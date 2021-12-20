import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { Menu } from "@headlessui/react";

import styles from "./Navbar.module.css";

const MyDropdown = () => {
  const { data: session } = useSession();
  const [t] = useTranslation();
  if (!session) return null;
  const { image, name } = session.user;
  return (
    <Menu as="div" className={styles.menuContainer}>
      <Menu.Button className={styles.menuButton}>
        <Image src={image} alt={name} height={40} width={40} />
      </Menu.Button>
      <Menu.Items className={styles.menuItemsContainer}>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            {t("logout")}
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default MyDropdown;
