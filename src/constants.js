import {
  BsHouseFill,
  BsCartFill,
  BsFillGiftFill,
  BsBriefcaseFill,
  BsPeopleFill,
  BsPiggyBankFill,
  BsTools,
} from "react-icons/bs";
import { GiPartyPopper, GiCoffeeCup } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";

export const LOGIN_STATUS = {
  loading: "loading",
  authenticated: "authenticated",
};

export const CATEGORIES_PICTURES = [
  //Keep icons in external package to save up space in db for heroku free tier
  {
    id: "house",
    icon: BsHouseFill,
  },
  {
    id: "cart",
    icon: BsCartFill,
  },
  {
    id: "gift",
    icon: BsFillGiftFill,
  },
  {
    id: "case",
    icon: BsBriefcaseFill,
  },
  {
    id: "people",
    icon: BsPeopleFill,
  },
  {
    id: "pig",
    icon: BsPiggyBankFill,
  },
  {
    id: "tools",
    icon: BsTools,
  },
  {
    id: "party",
    icon: GiPartyPopper,
  },
  {
    id: "coffee",
    icon: GiCoffeeCup,
  },
  {
    id: "food",
    icon: MdFastfood,
  },
];
