import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Menu } from "@headlessui/react";

const MyDropdown = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  if (!session) return null;
  const { image, name } = session.user;
  return (
    <Menu>
      <Menu.Button>
        <Image src={image} alt={name} width={40} height={40} />
        IMG
      </Menu.Button>
      <Menu.Items>
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
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
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
