import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineAnnotation,
  HiOutlineTicket,
  HiOutlineCurrencyDollar,
  HiOutlineCake,
} from "react-icons/hi";
import { TbCategory } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: `dashboard`,
    label: `Dashboard`,
    path: `/`,
    icon: <HiOutlineViewGrid />,
  },
  {
    key: `transaction`,
    label: `Transaction`,
    path: `/transaction`,
    icon: <HiOutlineCurrencyDollar />,
  },
  {
    key: `platformFee`,
    label: `Platform Fee`,
    path: `/platform-fee`,
    icon: <HiOutlineCube />,
  },
  {
    key: `user`,
    label: `User`,
    path: `/user`,
    icon: <HiOutlineUsers />,
  },
  {
    key: `ticket`,
    label: `Ticket`,
    path: `/ticket`,
    icon: <HiOutlineTicket />,
  },
  {
    key: `post`,
    label: `Post`,
    path: `/post`,
    icon: <HiOutlineAnnotation />,
  },
  {
    key: `order`,
    label: `Order`,
    path: `/order`,
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: `category`,
    label: `Category`,
    path: `/category`,
    icon: <TbCategory />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: `support`,
    label: `Help & Support`,
    path: `/support`,
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
